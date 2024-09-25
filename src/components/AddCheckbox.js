import { createElement } from "../utils/createElement";
import styles from "./AddCheckbox.module.css";
import IconButton from "./IconButton";
import { v4 as generateId } from "uuid";

export default function AddCheckbox( props = {
    legend: "",
    placeholder: "",
    onAdd: () => {},
    id: ""
})
{
    props = {
        id: generateId(),
        legend: "Add a new checkbox",
        placeholder: "new checkbox",
        onAdd: () => {},
        ...props
    };

    const addButton = IconButton({
        color: "primary",
        onClick: props.onAdd,
        text: "Add",
        type: "button",
    });

    const legend = createElement(
        "legend",
        {
            class: styles["add-checkbox-legend"]
        },
        [
            props.legend
        ]
    );

    const textBox = createElement(
        "input",
        {
            type: "text",
            class: styles["add-option-textbox"],
            placeholder: props.placeholder,
            id: props.id
        }
    );

    const label = createElement(
        "label",
        {
            class: styles["add-checkbox-textbox-label"],
            for: props.id
        }
    )

    const fieldset = createElement(
        "fieldset",
        {
            class: styles["add-option-fieldset"]
        },
        [
            legend,
            label,
            textBox,
            addButton
        ]
    );

    return { element: fieldset, }
}