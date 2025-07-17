import { useState, type JSX } from "react";

type PropType = "string" | "enum" | "boolean" | "number";

type ComponentPropConfig = {
    type: PropType;
    default?: any;
    options?: any[]; // for enums
};

type ComponentConfig<Props> = {
    name: string;
    component: React.ComponentType<Props>;
    props: Partial<Record<keyof Props, ComponentPropConfig>>
};

type PlaygroundProps<Props> = {
    config: ComponentConfig<Props>;
};

export function ComponentPlayground<Props>({ config }: PlaygroundProps<Props>) {
    const { name, component: Component, props: propConfig } = config;

    // Init state with defaults
    const initialState = Object.entries(propConfig).reduce((acc, [key, meta]) => {
        const m = meta as ComponentPropConfig;
        acc[key as keyof Props] = m.default ?? (m.type === "boolean" ? false : "");
        return acc;
    }, {} as Record<keyof Props, any>);

    const [currentProps, setCurrentProps] = useState<Record<keyof Props, any>>(initialState);

    const handleChange = (key: keyof Props, value: any) => {
        setCurrentProps((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const generateJSXCode = () => {
        const propsEntries = Object.entries(currentProps)
            .filter(([_, value]) => value !== "" && value !== undefined)
            .map(([key, value]) => {
                if (typeof value === "boolean") {
                    return value ? `  ${key}` : null;
                } else if (typeof value === "string") {
                    return `  ${key}="${value}"`;
                } else {
                    return `  ${key}={${JSON.stringify(value)}}`;
                }
            })
            .filter(Boolean)
            .join("\n");

        return `<${name}\n${propsEntries}\n/>`;
    };


    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">🔧 {name} Playground</h2>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {Object.entries(propConfig).map(([key, meta]) => {
                    const m = meta as ComponentPropConfig;
                    return (
                        <div key={key}>
                            <label className="block font-medium capitalize mb-1">{key}</label>

                            {m.type === "enum" && m.options ? (
                                <select
                                    value={currentProps[key as keyof Props]}
                                    onChange={(e) => handleChange(key as keyof Props, e.target.value)}
                                    className="w-full border rounded p-2"
                                >
                                    {m.options.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : m.type === "boolean" ? (
                                <input
                                    type="checkbox"
                                    checked={currentProps[key as keyof Props]}
                                    onChange={(e) => handleChange(key as keyof Props, e.target.checked)}
                                />
                            ) : m.type === "number" ? (
                                <input
                                    type="number"
                                    value={currentProps[key as keyof Props]}
                                    onChange={(e) =>
                                        handleChange(key as keyof Props, Number(e.target.value))
                                    }
                                    className="w-full border rounded p-2"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={currentProps[key as keyof Props]}
                                    onChange={(e) => handleChange(key as keyof Props, e.target.value)}
                                    className="w-full border rounded p-2"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Live Preview */}
            <div className="border p-4 rounded bg-white shadow">
                <Component {...(currentProps as Props & JSX.IntrinsicAttributes)} />
            </div>

            {/* JSX Generator */}
            <div>
                <h4 className="font-semibold mb-2">💡 JSX Code</h4>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                    {generateJSXCode()}
                </pre>
                <button
                    className="mt-2 px-4 py-2 bg-black text-white rounded"
                    onClick={() => navigator.clipboard.writeText(generateJSXCode())}
                >
                    Copy JSX
                </button>
            </div>
        </div>
    );
}
