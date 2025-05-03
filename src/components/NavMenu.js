import styles from "./NavMenu.module.css";

import { createElement } from "../utils/createElement";
import icons from "../barrels/icons.barrel";
import DarkModeButton from "./DarkModeButton";

export default function NavMenu( props = {
    pages: {},
})
{
    props = {
            pages: {
            title: "Home",
            path: "/"
        },
        ...props
    };

    const links = props.pages.map(page => {

        return createElement(
            "li",
            {
                class: styles["nav-list-item"]
            },
            [
                createElement(
                    "a",
                    {
                        href: `./${page.path}.html`,
                        class: `${styles["nav-link"]} 
                                ${window.location.pathname === "/" + page.path + ".html" ? styles["active"] : ""}`,
                    },
                    page.title
                )
            ]
        );
    });

    const darkModeButton = createElement(
        "li",
        {

        },
        DarkModeButton().element,
    );

    const navList = createElement(
        "ul",
        {
            class: styles["nav-list"]
        },
        links,
        darkModeButton,
    );

    const nav = createElement(
        "nav",
        {
            class: styles["nav-bar"]
        },
        [
            navList
        ]
    );

    const closeNavMenuButtonIcon = createElement(
        "div",
        {
            class: styles["close-nav-menu-button-icon"]
        }
    );

    const closeNavMenuButton = createElement(
        "button",
        {
            class: styles["close-nav-menu-button"],
            ariaLabel: "Close Nav Menu",
            onClick: closeNavMenu
        },
        closeNavMenuButtonIcon
    );

    closeNavMenuButton.style.setProperty("--icon", `url(${icons.closeIcon})`);

    const navMenu = createElement(
        "div",
        {
            class: styles["nav-menu"]
        },
        [
            closeNavMenuButton,
            nav
        ]
    );

    const navMenuBackdrop = createElement(
        "div",
        {
            class: styles["nav-menu-backdrop"]
        },
        navMenu
    )

    const navMenuButtonIcon = createElement(
        "div",
        {
            class: styles["nav-menu-button-icon"]
        }
    );

    const navMenuButton = createElement(
        "button",
        {
            type: "button",
            class: styles["nav-menu-button"],
            ariaLabel: "Navigation Menu",
            onClick: () => {

                document.body.append(navMenuBackdrop);
            }
        },
        navMenuButtonIcon,
    );

    function closeNavMenu()
    {
        navMenuBackdrop.remove();
    }

    navMenuButton.style.setProperty("--icon", `url(${icons.menuIcon})`);

    return { element: navMenuButton }
}