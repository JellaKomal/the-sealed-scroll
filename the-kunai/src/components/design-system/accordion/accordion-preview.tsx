import { LucideChevronDown } from "lucide-react";
import { ComponentCombinationBrowser } from "../../utils/preview";
import { Accordion } from "./accordion";

export default function AccordionCombinationViewer() {
    return (
        <ComponentCombinationBrowser
            name="Accordion"
            component={Accordion}
            staticProps={{
                title: "Accordion Title",
                content: "This is the accordion content.",
                titleIcon: <LucideChevronDown className="w-4 h-4" />,
                onOpenChange: (open) => console.log("Accordion open:", open),
            }}
            propOptions={{
                variant: ["default", "bordered", "bottom-border"],
                triggerPosition: ["left", "right"],
                disabled: [true, false],
                defaultOpen: [true, false],
            }}
            itemsPerPage={9}
        />
    );
}
