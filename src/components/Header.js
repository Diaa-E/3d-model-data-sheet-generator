import { createElement } from "../utils/createElement";
import DarkModeButton from "./DarkModeButton";
import styles from "./Header.module.css";
import NavBar from "./NavBar";

export default function Header()
{
    const homeLink = createElement(
        "a",
        {
            class: styles["home-link"],
            href: "/",
            ariaLabel: "Home"
        },
    );

    const navBar = NavBar();
    const darkModeButton = DarkModeButton();

    const headerItemsWrapper = createElement(
        "div",
        {
            class: styles["header-items-wrapper"]
        },
        [
            homeLink,
            navBar.element,
            darkModeButton.element
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