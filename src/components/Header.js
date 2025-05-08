import { createElement } from "../utils/createElement";
import styles from "./Header.module.css";
import NavBar from "./NavBar";
import NavMenu from "./NavMenu";

export default function Header()
{
    const pages = [
        {
            title: "3D Model",
            path: "model_form"
        },
        {
            title: "About",
            path: "about"
        },
    ];

    const homeLink = createElement(
        "a",
        {
            class: styles["home-link"],
            href: `index.html`,
            ariaLabel: "Home"
        },
    );

    const navBar = NavBar({
        pages: pages
    });

    const navMenu = NavMenu({
        pages: pages
    });

    const headerItemsWrapper = createElement(
        "div",
        {
            class: styles["header-items-wrapper"]
        },
        [
            homeLink,
            navBar.element,
            navMenu.element,
        ]
    );

    const header = createElement(
        "header",
        {
            class: styles["header"]
        },
        [
            headerItemsWrapper,
        ]
    );

    return { element: header }
}