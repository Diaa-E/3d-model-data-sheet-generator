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
        else if (window.Clipboard)
        {
            // HTML might not work if the pasting target does not support the html mime
            const html = new Blob([datasheet.element.innerHTML], {type: "text/html"});
            // plain text fallback
            const text = new Blob([datasheet.element.textContent], {type: "text/plain"});
            console.log(datasheet.element.innerHTML);
            console.log(text);
            const data = new ClipboardItem({ [text.type]: text, [html.type]: html });
            await navigator.clipboard.write([data]);
        }
        //Clipboard fallback
        // stolen from https://stackoverflow.com/questions/23934656/how-can-i-copy-rich-text-contents-to-the-clipboard-with-javascript/77305170#77305170
        else if (document.execCommand) 
        {
            function onCopy(e)
            {
                e.clipboardData.setData("text/html", datasheet.element.innerHTML);
                e.clipboardData.setData("text/plain", datasheet.element.textContent);
                e.preventDefault();
            }
            document.addEventListener("copy", onCopy);
            document.execCommand("copy");
            document.removeEventListener("copy", oncopy);
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