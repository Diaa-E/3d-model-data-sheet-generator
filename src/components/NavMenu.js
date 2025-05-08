import styles from "./NavMenu.module.css";

import { createElement } from "../utils/createElement";
import icons from "../barrels/icons.barrel";
import DarkModeButton from "./DarkModeButton";
import getCurrentPage from "../utils/getCurrentPage";

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
                                ${getCurrentPage(window.location.pathname) === page.path ? styles["active"] : ""}`,
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

    closeNavMenuButton.style.setProperty("--icon", `url("${icons.closeIcon}")`);

    const navMenu = createElement(
        "div",
        {
            class: styles["nav-menu"]
        },
        [
            nav
        ]
    );

    const navMenuBackdrop = createElement(
        "div",
        {
            class: styles["nav-menu-backdrop"]
        },
        [
            closeNavMenuButton,
            navMenu
        ]
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
            onClick: openNavMenu
        },
        navMenuButtonIcon,
    );

    function closeNavMenu()
    {
        navMenuBackdrop.classList.remove(styles["open-backdrop"]);
        navMenu.classList.remove(styles["open-menu"]);
        closeNavMenuButton.classList.remove(styles["show-button"]);
        
        navMenuBackdrop.classList.add(styles["close-backdrop"]);
        navMenu.classList.add(styles["close-menu"]);
        closeNavMenuButton.classList.add(styles["hide-button"]);

        setTimeout(() => {

            navMenuBackdrop.remove();
        }, 500);
    }

    function openNavMenu()
    {
        document.body.append(navMenuBackdrop);

        navMenuBackdrop.classList.remove(styles["close-backdrop"]);
        navMenu.classList.remove(styles["close-menu"]);
        closeNavMenuButton.classList.remove(styles["hide-button"]);

        navMenuBackdrop.classList.add(styles["open-backdrop"]);
        navMenu.classList.add(styles["open-menu"]);
        closeNavMenuButton.classList.add(styles["show-button"]);
    }

    navMenuButton.style.setProperty("--icon", `url("${icons.menuIcon}")`);

    return { element: navMenuButton }
}