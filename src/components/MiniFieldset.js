import { createElement } from "../utils/createElement";
import styles from "./MiniFieldset.module.css";

export default function MiniFieldset(props = {
    legend: "",
    children: [],
})
{
    props = {
        legend: "mini fieldset 1",
        children: [],
        ...props
    };

    const legend = createElement(
        "legend",
        {
            class: styles["mini-fieldset-legend"]
        },
        [
            props.legend
        ]
    );

    const fieldset = createElement(
        "fieldset",
        {
            class: styles["mini-fieldset"]
        },
        [
            legend,
            ...props.children
        ]
    );

    return fieldset;
}