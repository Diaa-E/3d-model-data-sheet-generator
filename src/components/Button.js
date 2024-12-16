import { createElement } from "../utils/createElement";
import styles from "./Button.module.css";
import icons from "../barrels/icons.barrel";

export default function Button(props = {
    type: "",
    onClick: () => {},
    iconPath: "",
    text: "",
    color: ""
})
{
    props = {
        type: "button",
        onClick: () => {},
        iconPath: icons.defaultIcon,
        text: "click here",
        color: "primary",
        ...props
    };

    const colors = {
        primary: styles["button-primary"],
        secondary: styles["button-secondary"],
        danger: styles["button-danger"],
    }

    const textSpan = createElement(
        "span",
        {
            class: styles["button-text"],
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
            class: `${styles["button"]} ${colors[props.color]}`,
            onClick: props.onClick,
            ariaLabel: props.text
        },
        [
            textSpan,
            divIcon
        ]
    );

    button.style.setProperty("--icon", `url("${props.iconPath}")`);
    
    return button;
}