import Datasheet from "../Datasheet";
import DatasheetControls from "../DatasheetControls";
import Fieldset from "../Fieldset";

export default function DatasheetFieldset()
{
    const datasheetControls = DatasheetControls();

    let datasheet = null;

    const fieldset = Fieldset({
        legend: "Datasheet",
        children: [
            datasheetControls.element,
        ]
    });

    function generateDatasheet(props = {
        title: "",
        sets: []
    })
    {
        if (datasheet !== null)
        {
            datasheet.element.remove();
        }

        datasheet = Datasheet({
            title: props.title,
            sets: props.sets
        });

        fieldset.element.append(datasheet.element);
    }

    return { element: fieldset.element, generateDatasheet: generateDatasheet }
}