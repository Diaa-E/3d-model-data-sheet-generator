import styles from "./IconLink.module.css";
import icons from "../barrels/icons.barrel";
import { createElement } from "../utils/createElement";

export default function IconLink( props = {

    href: "",
    iconPath: "",
    text: ""
})
{
    props = {

        href: "",
        iconPath: icons.defaultIcon,
        text: "default text",
        ...props
    };

    const linkIcon = createElement(
        "div",
        {
            class: styles["icon"]
        },
    );

    const link = createElement(
        "a",
        {
            href: props.href,
            class: styles["icon-link"],
            target: "_blank"
        },
        [
            props.text,
            linkIcon,
        ]
    );

    link.style.setProperty("--icon", `url("${props.iconPath}")`);

    return { element: link }
}