import styles from "./IconLink.module.css";
import icons from "../barrels/icons.barrel";
import { createElement } from "../utils/createElement";

export default function IconLink( props = {

    href: "",
    iconPath: "",
    text: "",
    newTab: true,
    showIcon: true,
})
{
    props = {

        href: "",
        iconPath: icons.defaultIcon,
        text: "default text",
        newTab: true,
        showIcon: true,
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
            target: `${props.newTab ? "_blank" : ""}`
        },
        [
            props.text,
            props.showIcon ? linkIcon : "",
        ]
    );

    link.style.setProperty("--icon", `url("${props.iconPath}")`);

    return { element: link }
}