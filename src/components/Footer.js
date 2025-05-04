import icons from "../barrels/icons.barrel";
import { createElement } from "../utils/createElement";
import styles from "./Footer.module.css";
import IconLink from "./IconLink";

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

    const sourceLink = IconLink({
        href: "https://github.com/Diaa-E/3d-model-data-sheet-generator",
        iconPath: icons.githubIcon,
        text: "Source"
    })

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
            sourceLink.element,
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