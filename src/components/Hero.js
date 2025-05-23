import { createElement } from "../utils/createElement";
import styles from "./Hero.module.css";

export default function Hero()
{
    const heroImage = createElement(
        "div",
        {
            class: styles["hero-image"]
        },
    );

    const heroTitle = createElement(
        "h1",
        {
            class: styles["hero-title"]
        },
        [
            "3D Model Datasheet Generator"
        ]
    );

    const heroSlogan = createElement(
        "h2",
        {
            class: styles["hero-slogan"]
        },
        [
            "Write 3D Asset Descriptions Faster! ",
        ]
    );

    const heroTextWrapper = createElement(
        "div",
        {
            class: styles["hero-text-wrapper"]
        },
        [
            heroTitle,
            heroSlogan,
        ]
    );

    const heroWrapper = createElement(
        "div",
        {
            class: styles["hero-wrapper"]
        },
        [
            heroTextWrapper,
            heroImage,
        ]
    )

    const contentDiv = createElement(
        "div",
        {
            id: "content"
        },
        [
            heroWrapper
        ]
    );

    return { element: contentDiv };
}