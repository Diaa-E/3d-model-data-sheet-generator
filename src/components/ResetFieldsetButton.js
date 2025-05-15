import icons from "../barrels/icons.barrel";
import { createElement } from "../utils/createElement";
import Dialog from "./Dialog";
import Popup from "./Popup";
import styles from "./ResetFieldsetButton.module.css";

export default function ResetFieldsetButton( props = {
    fieldsetName: "",
    onReset: () => {},
})
{
    props = {
        fieldsetName: "reset fieldset",
        onReset: () => {},
        ...props
    };

    const icon = createElement(
        "div",
        {
            class: styles["reset-icon"]
        }
    );

    const button = createElement(
        "button",
        {
            ariaLabel: `Reset ${props.fieldsetName}`,
            type: "button",
            class: styles["reset-button"],
            "--icon": `url("${icons.resetIcon}")`,
            onclick: confirmReset,
        },
        [
            icon
        ]
    );

    function confirmReset()
    {
        Dialog({

            prompt:`Are you sure you want to reset ${props.fieldsetName}?`,
            onConfirm: () => {
              
                props.onReset();
                Popup({

                    error: false,
                    lastFocusedElement: null,
                    msg: `${props.fieldsetName} has been reset.`,
                    showScrollToField: false,
                }).open();
            },
        }).open();
    }

    return { element: button };
}