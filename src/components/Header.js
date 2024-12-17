import { createElement } from "../utils/createElement";
import styles from "./Header.module.css";
import logo from "../assets/logo/logo.svg";

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

    const headerItemsWrapper = createElement(
        "div",
        {
            class: styles["header-items-wrapper"]
        },
        [
            logoImg,
        ]
    )

    const header = createElement(
        "header",
        {
            class: styles["header"]
        },
        [
            headerItemsWrapper
        ]
    );

    return { element: header }
}