import { createElement } from "../utils/createElement";
import styles from "./IconButton.module.css";
import defaultIcon from "../assets/icons/add.svg";

export default function IconButton(props = {
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
        iconPath: defaultIcon,
        text: "click here",
        color: "primary",
        ...props
    };

    const colors = {
        primary: styles["icon-button-primary"],
        secondary: styles["icon-button-secondary"],
        danger: styles["icon-button-danger"],
    }

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
            class: `${styles["icon-button"]} ${colors[props.color]}`,
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