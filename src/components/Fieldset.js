import { createElement } from "../utils/createElement";
import styles from "./Fieldset.module.css";

export default function Fieldset(
    props = {
        legend: "",
        children: [],
        required: false,
        hint: "",
    }
)
{
    props = {
        legend: "Fieldset Title",
        children: [],
        required: false,
        hint: "",
        ...props
    };

    const legend = createElement(
        "legend",
        {
            class: `${styles["legend"]} ${props.required ? styles["required"] : ""}`,
            ariaLabel: props.required ? `${props.legend} (required)` : props.legend,
        },
        [
            props.legend,
        ]
    );

    const hint = createElement(
        "p",
        {
            class: styles["hint"],
        },
        [
            `Tip: ${props.hint}`
        ]
    );

    const fieldset = createElement(
        "fieldset",
        {
            class: styles["fieldset"],
            tabIndex: "0"
        },
        [
            legend,
            props.hint === "" ? "" : hint,
            ...props.children
        ]
    );

    function setInvalid(invalid)
    {
        if (invalid)
        {
            fieldset.classList.add(styles["invalid"]);
        }
        else
        {
            fieldset.classList.remove(styles["invalid"]);
        }
    }

    return { element: fieldset, setInvalid: setInvalid };
}