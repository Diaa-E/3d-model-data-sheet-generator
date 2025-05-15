import styles from "./About.module.css";
import IconLink from "./components/IconLink";
import icons from "./barrels/icons.barrel";
import { createElement } from "./utils/createElement";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function About()
{
    const appTitle = createElement(
        "h1",
        {
            class: styles["app-title"]
        },
        [
            "3D Model Datasheet Generator"
        ]
    );

    const appVersion = createElement(
        "h2",
        {
            class: styles["app-version"]
        },
        [
            "Version 2.0.2"
        ]
    );

    const sourceLink = IconLink({

        href: "https://github.com/Diaa-E/3d-model-data-sheet-generator",
        iconPath: icons.githubIcon,
        text: "Source Code"
    });

    const changeLogLink = IconLink({

        href: "https://github.com/Diaa-E/3d-model-data-sheet-generator/blob/main/CHANGELOG.md",
        iconPath: icons.changelogIcon,
        text: "Full Change Log",
    })

    const linksWrapper = createElement(
        "div",
        {
            class: styles["links-wrapper"]
        },
        [
            sourceLink.element,
            changeLogLink.element
        ]
    );

    const changesTitle = createElement(
        "h2",
        {
            class: styles["changes-title"]
        },
        [
            "What's new in this version?"
        ]
    );

    const changesList = [
        `Fixed page titles not working properly.`,
        `Fixed checkbox taking space on screen while hidden, this bug was caused by changing checkbox returnto a div instead of a fragment.`,
        `Fixed broken footer home link.`,
    ];

    const changeListItems = changesList.map(item => {

        return createElement(
            "li",
            {
                class: styles["change-list-item"]
            },
            [
                item
            ]
        );
    });

    const changeUnorderedList = createElement(
        "ul",
        {
            class: styles["change-list"]
        },
        changeListItems,
    )

    const contentDiv = createElement(
        "div",
        {
            id: "content"
        },
        [
            appTitle,
            appVersion,
            linksWrapper,
            changesTitle,
            changeUnorderedList
        ]
    );

    return [ contentDiv ];
}

document.getElementById("root").append(
    Header().element,
    ...About(),
    Footer().element
);