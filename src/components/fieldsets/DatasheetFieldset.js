import copyToClipboard from "../../utils/copyToClipboard";
import { FeatureNotSupportedException } from "../../utils/customExceptions";
import Datasheet from "../Datasheet";
import DatasheetControls from "../DatasheetControls";
import Fieldset from "../Fieldset";
import Popup from "../Popup";

export default function DatasheetFieldset(props = {
    onReset: () => {}
})
{
    props = {
        onReset: () => {},
        ...props
    };

    const datasheetControls = DatasheetControls({
        onCopy: onCopy,
        onReset: props.onReset
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
        Popup({
            error: false,
            lastFocusedElement: fieldset.element,
            msg: "Datasheet generated.",
            showScrollToField: false,

        }).open();
    }

    async function onCopy()
    {
        if (datasheet === null)
        {
            Popup({
                error: true,
                lastFocusedElement: fieldset.element,
                msg: "Datasheet is empty, nothing was copied to the clipboard.",
                showScrollToField: true,
            }).open();
        }
        else
        {
            try
            {
                await copyToClipboard(datasheet.element);
                Popup({
                    error: false,
                    lastFocusedElement: fieldset.element,
                    msg: "Datasheet copied to clipboard.",
                    showScrollToField: false,
                }).open();
            }
            catch (error)
            {
                if (error instanceof FeatureNotSupportedException)
                {
                    Popup({
                        error: true,
                        lastFocusedElement: datasheet.element,
                        msg: error.message,
                        showScrollToField: false,
                    })
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