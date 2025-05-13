import { createElement } from "../utils/createElement";
import Button from "./Button";
import styles from "./Dialog.module.css";
import icons from "../barrels/icons.barrel";

export default function Dialog( props = {
    onConfirm: () => {},
    prompt: "",
})
{
    props = {
        onConfirm: () => {},
        prompt: "Default prompt",
        ...props
    };

    const promptText = createElement(
        "p",
        {
            class: styles["prompt-text"]
        },
        [
            props.prompt
        ]
    );

    const confirmButton = Button({
        type: "button",
        color: "danger",
        iconPath: icons.checkedIcon,
        text: "Yes",
        onClick: () => {

            props.onConfirm();
            closeDialog();
        }
    });

    const cancelButton = Button({
        type: "button",
        color: "secondary",
        iconPath: icons.closeIcon,
        text: "Cancel",
        onClick: closeDialog
    });

    const dialogControlsWrapper = createElement(
        "div",
        {
            class: styles["dialog-controls-wrapper"],
        },
        [
            confirmButton.element,
            cancelButton.element
        ]
    )

    const dialogBox = createElement(
        "div",
        {
            role: "dialog",
            class: styles["dialog-box"]
        },
        [
            promptText,
            dialogControlsWrapper
        ]
    );

    const dialogBackdrop = createElement(
        "div",
        {
            class: styles["dialog-backdrop"]
        },
        [
            dialogBox
        ]
    );

    function openDialog()
    {
        document.body.append(dialogBackdrop);

        dialogBox.classList.remove(styles["close"]);
        dialogBackdrop.classList.remove(styles["close"]);

        dialogBox.classList.add(styles["open"]);
        dialogBackdrop.classList.add(styles["open"]);

        confirmButton.element.focus();
    }

    function closeDialog()
    {
        dialogBox.classList.remove(styles["open"]);
        dialogBackdrop.classList.remove(styles["open"]);

        dialogBox.classList.add(styles["close"]);
        dialogBackdrop.classList.add(styles["close"]);

        setTimeout(() => {

            dialogBackdrop.remove();
        }, 500);
    }

    return { element: dialogBackdrop, open: openDialog };
}