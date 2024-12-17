import { createElement } from "../utils/createElement";
import styles from "./Header.module.css";
import logo from "../assets/logo/logo.svg";
import NavBar from "./NavBar";

export default function Header()
{
    const logoImg = createElement(
        "img",
        {
            class: styles["logo"],
            alt: "3D moel datasheet generator logo",
            src: logo
        },
    );

    const navBar = NavBar();

    const headerItemsWrapper = createElement(
        "div",
        {
            class: styles["header-items-wrapper"]
        },
        [
            logoImg,
            navBar.element
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