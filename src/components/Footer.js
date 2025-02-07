import { createElement } from "../utils/createElement";
import styles from "./Footer.module.css";

export default function Footer( props = {

})
{
    props = {
        ...props
    };

    const sourceLogo = createElement(
        "div",
        {
            class: styles["source-logo"]
        },
    );

    const sourceLink = createElement(
        "a",
        {
            href: "https://github.com/Diaa-E/3d-model-data-sheet-generator",
            class: styles["source-link"],
            target: "_blank"
        },
        [
            "Source",
            sourceLogo,
        ]
    );

    const homeLogo = createElement(
        "div",
        {
            class: styles["home-logo"],
        }
    );

    const homeLink = createElement(
        "a",
        {
            class: styles["home-link"],
            href: "/",
        },
        [
            homeLogo,
            "3D Model Datasheet Generator"
        ]
    )

    const copyright = createElement(
        "p",
        {
            class: styles["copyright"]
        },
        [
            `© Diaa E. 2023-${(new Date()).getFullYear()}`
        ]
    )

    const footerItemsWrapper = createElement(
        "div",
        {
            class: styles["footer-items-wrapper"]
        },
        [
            homeLink,
            copyright,
            sourceLink,
        ]
    );

    const footer = createElement(
        "footer",
        {
            class: styles["footer"]
        },
        [
            footerItemsWrapper
        ]
    );

    return { element: footer }
}