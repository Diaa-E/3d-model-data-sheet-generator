import { dispatchErrorPopupEvent } from "../../utils/errorPopupEvents";
import Datasheet from "../Datasheet";
import DatasheetControls from "../DatasheetControls";
import Fieldset from "../Fieldset";

export default function DatasheetFieldset()
{

    const datasheetControls = DatasheetControls({
        onCopy: copyToClipboard
    });

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

    async function copyToClipboard()
    {
        if (datasheet === null)
        {
            dispatchErrorPopupEvent({
                dispatchingElement: datasheetControls.element,
                errorMsg: "Datasheet is empty, nothing was copied to the clipboard."
            });
        }
        else if (window.getSelection)
        {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(datasheet.element);
            selection.removeAllRanges();
            selection.addRange(range);
            await navigator.clipboard.writeText(selection.toString());
            selection.removeRange(range);
        }
        else
        {
            dispatchErrorPopupEvent({
                dispatchingElement: datasheet.element,
                errorMsg: "This browser does not support copy to clipboard."
            });
        }
    }

    return { element: fieldset.element, generateDatasheet: generateDatasheet }
}