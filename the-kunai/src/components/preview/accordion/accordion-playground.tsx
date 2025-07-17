import { Accordion } from "../../design-system/accordion";
import { ComponentPlayground } from "../../utils/playground";

export default function AccordionPlaygroundPage() {
    return (
        <ComponentPlayground
            config={{
                name: "Accordion",
                component: Accordion,
                props: {
                    variant: {
                        type: "enum",
                        options: ["default", "bordered", "bottom-border"],
                        default: "default",
                    },
                    triggerPosition: {
                        type: "enum",
                        options: ["left", "right"],
                        default: "right",
                    },
                    title: { type: "string", default: "Accordion Title" },
                    content: { type: "string", default: "Accordion Content" },
                    defaultOpen: { type: "boolean", default: false },
                    disabled: { type: "boolean", default: false },
                    itemValue: { type: "string", default: "item-1" },
                    // Add any other AccordionProps you want to control here...
                },
            }}
        />
    );
}