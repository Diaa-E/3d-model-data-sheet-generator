import { createElement } from "../utils/createElement";
import styles from "./IconButton.module.css";
import icons from "../barrels/icons.barrel";

export default function IconButton(props = {
    type: "",
    onClick: () => {},
    iconPath: "",
    text: "",
})
{
    props = {
        type: "button",
        onClick: () => {},
        iconPath: icons.defaultIcon,
        text: "click here",
        hoverColor: "",
        ...props
    };

    const textSpan = createElement(
        "span",
        {
            class: styles["icon-button-text"],
        },
        [
            props.text
        ]
    );

    const divIcon = createElement(
        "div",
        {
            class: styles["icon"],
        }
    )

    const button = createElement(
        "button",
        {
            type: props.type,
            class: `${styles["icon-button"]}`,
            onClick: props.onClick,
        },
        [
            textSpan,
            divIcon
        ]
    );

    button.style.setProperty("--icon", `url("${props.iconPath}")`);
    
    return button;
}