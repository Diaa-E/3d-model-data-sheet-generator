import styles from "./DatasheetControls.module.css";

import Button from "./Button";
import icons from "../barrels/icons.barrel";
import { createElement } from "../utils/createElement";

export default function DatasheetControls(props = {
    onCopy: () => {},
    onReset: () => {}
})
{
    props = {
        onCopy: () => {},
        onReset: () => {},
        ...props
    };

    const generateButton = Button({

        color: "primary",
        iconPath: icons.generateIcon,
        text: "Generate Datasheet",
        type: "submit"
    });

    const copyButton = Button({

        color: "secondary",
        iconPath: icons.copyIcon,
        onClick: props.onCopy,
        text: "Copy to Clipboard",
        type: "button"
    });

    const resetButton = Button({

        color: "danger",
        iconPath: icons.resetIcon,
        onClick: props.onReset,
        text: "Reset Form",
        type: "button",
    });

    const controlsWrapper = createElement(
        "div",
        {
            class: styles["controls-wrapper"],
        },
        [
            copyButton.element,
            resetButton.element,
            generateButton.element,
        ]
    );

    return { element: controlsWrapper }
}