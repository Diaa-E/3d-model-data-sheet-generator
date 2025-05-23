import { createElement } from "../utils/createElement";
import getCurrentPage from "../utils/getCurrentPage";
import DarkModeButton from "./DarkModeButton";
import styles from "./NavBar.module.css";

export default function NavBar( props = {
    pages: []
})
{
    props = {
        pages: [
            {
                title: "3D Model",
                path: "model_form"
            },
            {
                title: "About",
                path: "about"
            },
        ],
        ...props
    };

    const darkModeButton = createElement(
        "li",
        {

        },
        DarkModeButton().element,
    );

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
                                ${getCurrentPage(window.location.pathname) === page.path ? styles["active"] : ""}`
                    },
                    page.title
                )
            ]
        );
    });

    const navList = createElement(
        "ul",
        {
            class: styles["nav-list"]
        },
        links,
        darkModeButton
    )

    const nav = createElement(
        "nav",
        {
            class: styles["nav-bar"]
        },
        navList
    );

    return { element: nav }
}