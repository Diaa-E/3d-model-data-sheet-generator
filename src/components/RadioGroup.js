import { createElement } from "../utils/createElement";
import styles from "./RadioGroup.module.css";

export default function RadioGroup( props = {
    legend: "",
    buttons: [],
})
{
    props = {
        legend: "radio group",
        buttons: [],
        ...props
    };

    const legend = createElement(
        "legend",
        {
            class: styles["legend"]
        },
        [
            props.legend
        ]
    );

    const fieldSet = createElement(
        "fieldset",
        {
            class: styles["radio-group"]
        },
        [
            legend,
            ...props.buttons,
        ]
    );

    function addButton(button)
    {
        fieldSet.append(
            button
        );
    }

    return { element: fieldSet, addButton: addButton }
}