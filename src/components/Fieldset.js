import { createElement } from "../utils/createElement";
import styles from "./Fieldset.module.css";

export default function Fieldset(
    props = {
        legend: "",
        children: [],
        required: false,
    }
)
{
    props = {
        legend: "fieldset",
        children: [],
        required: false,
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

    const fieldset = createElement(
        "fieldset",
        {
            class: styles["fieldset"],
            tabIndex: "0"
        },
        [
            legend,
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