import { createElement } from "../utils/createElement";
import styles from "./NavBar.module.css";

export default function NavBar()
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
    ]

    const links = pages.map(page => {

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
                                ${window.location.pathname === "/" + page.path + ".html" ? styles["active"] : ""}`
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
        links
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