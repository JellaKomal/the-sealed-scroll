import React, { useMemo, useState } from "react";

type ComponentCombinationGridProps<Props extends object = {}> = {
    component: React.ComponentType<Props>;
    name?: string;
    staticProps?: Partial<Props>;
    propOptions: {
        [K in keyof Props]?: Props[K][];
    };
    itemsPerPage?: number;
};

function getAllCombinations<Props extends object>(options: ComponentCombinationGridProps<Props>["propOptions"]): Partial<Props>[] {
    const keys = Object.keys(options) as (keyof Props)[];
    if (keys.length === 0) return [];

    const combine = (index = 0, current: Partial<Props> = {}): Partial<Props>[] => {
        if (index === keys.length) return [current];
        const key = keys[index];
        const values = options[key] ?? [];

        return values.flatMap((value) =>
            combine(index + 1, { ...current, [key]: value })
        );
    };

    return combine();
}

function formatJSX(name: string, props: Record<string, any>) {
    const entries = Object.entries(props)
        .filter(([_, value]) => value !== "" && value !== undefined)
        .map(([key, value]) => {
            if (typeof value === "boolean") return value ? `  ${key}` : null;
            if (typeof value === "string") return `  ${key}="${value}"`;
            // Replace React elements with a placeholder
            if (typeof value === "object" && value?.$$typeof) return `  ${key}={<ReactElement />}`;
            return `  ${key}={${JSON.stringify(value)}}`;
        })
        .filter(Boolean)
        .join("\n");

    return `<${name}\n${entries}\n/>`;
}

export function ComponentCombinationBrowser<Props extends object = {}>({
    component: Component,
    name = "Component",
    staticProps = {},
    propOptions,
    itemsPerPage = 10,
}: ComponentCombinationGridProps<Props>) {
    const combinations = useMemo(() => getAllCombinations<Props>(propOptions), [propOptions]);
    const [page, setPage] = useState(0);
    const [selectedCode, setSelectedCode] = useState<string | null>(null);

    const start = page * itemsPerPage;
    const visibleCombinations = combinations.slice(start, start + itemsPerPage);
    const totalPages = Math.ceil(combinations.length / itemsPerPage);

    return (
        <div className="space-y-6 p-6">
            <h2 className="text-xl font-bold">{name} Combinations ({combinations.length})</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleCombinations.map((combo, i) => {
                    const combinedProps = { ...staticProps, ...combo } as Props;
                    const label = Object.entries(combo)
                        .map(([k, v]) => `${k}=${v}`)
                        .join(" | ");
                    const jsxCode = formatJSX(name, combinedProps as Record<string, any>);

                    return (
                        <div key={i} className="border p-4 rounded-md shadow-sm bg-white space-y-3">
                            <p className="text-xs text-muted-foreground font-mono">{label}</p>
                            <Component {...combinedProps} />
                            <button
                                onClick={() => setSelectedCode(jsxCode)}
                                className="text-xs underline text-blue-600"
                            >
                                View JSX
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="flex gap-4 justify-center items-center">
                <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm">Page {page + 1} of {totalPages}</span>
                <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page + 1 >= totalPages}
                    className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* JSX Code Preview */}
            {selectedCode && (
                <div className="mt-6 border-t pt-4">
                    <h4 className="font-semibold mb-2">💡 JSX Preview</h4>
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                        {selectedCode}
                    </pre>
                    <button
                        onClick={() => navigator.clipboard.writeText(selectedCode)}
                        className="mt-2 px-4 py-2 bg-black text-white rounded"
                    >
                        Copy JSX
                    </button>
                    <button
                        onClick={() => setSelectedCode(null)}
                        className="ml-2 text-sm text-red-500 underline"
                    >
                        Close Preview
                    </button>
                </div>
            )}
        </div>
    );
}
