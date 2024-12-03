import { createElement } from "../utils/createElement";
import styles from "./Fieldset.module.css";

export default function Fieldset(
    props = {
        legend: "",
        children: [],
    }
)
{
    props = {
        legend: "fieldset",
        children: [],
        ...props
    };

    const legend = createElement(
        "legend",
        {
            class: styles["legend"]
        },
        [
            props.legend,
        ]
    );

    const fieldset = createElement(
        "fieldset",
        {
            class: styles["fieldset"]
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