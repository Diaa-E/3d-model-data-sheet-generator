import DatasheetControls from "../DatasheetControls";
import Fieldset from "../Fieldset";

export default function DatasheetFieldset()
{
    const datasheetControls = DatasheetControls({

    });

    const fieldset = Fieldset({
        legend: "Datasheet",
        children: [
            datasheetControls.element
        ]
    });

    return { element: fieldset.element }
}