import { Alert } from "./alert";
import { ComponentCombinationBrowser } from "../../utils/preview";

export function AlertPreview() {
    return (
        <ComponentCombinationBrowser
            name="Alert"
            component={Alert}
            staticProps={{
                title: "Sample Alert",
                description: "Testing combo rendering.",
                confirmationButtonText: "Confirm",
                onConfirm: () => { },
                onClose: () => { },
            }}
            propOptions={{
                alertType: ["info", "success", "warning", "error"],
                variant: ["outline", "soft", "solid", "bordered"],
                actionVariant: ["right", "right-bottom", "right-justify"],
                closeButtonType: ["icon", "ghost-text", "text", "outline"],
                confirmButtonType: ["ghost-text", "primary-text", "outline"],
            }}
            itemsPerPage={9}
        />

    );
}
