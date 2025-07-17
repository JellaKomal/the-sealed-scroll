


import { Alert } from "../../design-system/alert";
import { ComponentPlayground } from "../../utils/playground";



export default function AlertPlaygroundPage() {
    return (
        <ComponentPlayground
            config={{
                name: "Alert",
                component: Alert,
                props: {
                    alertType: {
                        type: "enum",
                        options: ["info", "success", "warning", "error"],
                        default: "info",
                    },
                    variant: {
                        type: "enum",
                        options: ["outline", "soft", "solid", "bordered"],
                        default: "outline",
                    },
                    title: { type: "string", default: "Test Alert" },
                    description: {
                        type: "string",
                        default: "This is a generic component preview.",
                    },
                    closeButton: { type: "boolean", default: true },
                    confirmationButtonText: { type: "string", default: "Confirm" },
                    // Add missing AlertProps keys with default/hidden configs
                    iconType: { type: "string", default: "" },
                    actionVariant: { type: "string", default: "" },
                    icon: { type: "string", default: "" },
                    closeButtonTextType: { type: "string", default: "" },
                    // Add all other required AlertProps keys here with reasonable defaults or hidden configs
                    // Example:
                    // someOtherProp: { type: "string", default: "" },
                },
            }}
        />
    );
}
