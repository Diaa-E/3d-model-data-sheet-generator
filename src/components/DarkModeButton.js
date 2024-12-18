import { createElement } from "../utils/createElement";
import styles from "./DarkModeButton.module.css";
import theme from "../theme.module.css";

export default function DarkModeButton()
{
    const STORAGE_KEY = "darkTheme";
    let darkTheme;

    if (window.localStorage.getItem(STORAGE_KEY))
    {
        darkTheme = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    }
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
    {
        darkTheme = true;
    }
    else
    {
        darkTheme = false;
    }

    const icon = createElement(
        "div",
        {
            class: `${styles["icon"]}`
        }
    )

    const knob = createElement(
        "div",
        {
            class: `${styles["knob"]} ${darkTheme ? styles["dark"] : styles["light"]}`
        },
        icon
    );

    const button = createElement(
        "button",
        {
            class: styles["dark-mode-button"],
            onClick: () => {
                darkTheme = !darkTheme;
                toggleTheme();
            }
        },
        [
            knob
        ]
    );

    toggleTheme();

    function toggleTheme()
    {
        if (darkTheme)
        {
            document.body.classList.remove(theme["light"]);
            document.body.classList.add(theme["dark"]);
            knob.classList.remove(styles["light"]);
            knob.classList.add(styles["dark"]);
            button.ariaLabel = "Disable dark mode";
        }
        else
        {
            document.body.classList.remove(theme["dark"]);
            document.body.classList.add(theme["light"]);
            knob.classList.remove(styles["dark"]);
            knob.classList.add(styles["light"]);
            button.ariaLabel = "Enable dark mode";
        }

        window.localStorage.setItem(STORAGE_KEY, JSON.parse(darkTheme));
    }

    return { element: button };
}