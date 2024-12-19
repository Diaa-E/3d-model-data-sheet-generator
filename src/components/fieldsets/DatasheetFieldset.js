import copyToClipboard from "../../utils/copyToClipboard";
import { FeatureNotSupportedException } from "../../utils/customExceptions";
import { showErrorPopup } from "../../utils/errorPopupEvents";
import Datasheet from "../Datasheet";
import DatasheetControls from "../DatasheetControls";
import Fieldset from "../Fieldset";

export default function DatasheetFieldset()
{

    const datasheetControls = DatasheetControls({
        onCopy: onCopy
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
        targetSite: "",
        sets: []
    })
    {
        if (datasheet !== null)
        {
            datasheet.element.remove();
        }

        datasheet = Datasheet({
            title: props.title,
            targetSite: props.targetSite,
            sets: props.sets
        });

        fieldset.element.append(datasheet.element);
    }

    async function onCopy()
    {
        if (datasheet === null)
        {
            showErrorPopup({
                dispatchingElement: datasheetControls.element,
                errorMsg: "Datasheet is empty, nothing was copied to the clipboard."
            });
        }
        else
        {
            try
            {
                await copyToClipboard(datasheet.element);
            }
            catch (error)
            {
                if (error instanceof FeatureNotSupportedException)
                {
                    showErrorPopup({
                        dispatchingElement: datasheet.element,
                        errorMsg: error.message,
                    });
                }
                else
                {
                    throw error;
                }
            }
        }
    }

    return { element: fieldset.element, generateDatasheet: generateDatasheet }
}