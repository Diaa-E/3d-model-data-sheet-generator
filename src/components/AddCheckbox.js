import { createElement } from "../utils/createElement";
import styles from "./AddCheckbox.module.css";
import IconButton from "./Button";
import { v4 as generateId } from "uuid";
import icons from "../barrels/icons.barrel";

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
            class: styles["add-checkbox-textbox"],
            placeholder: props.placeholder,
            id: props.id
        }
    );

    const addButton = IconButton({
        color: "primary",
        onClick: () => props.onAdd(textBox),
        text: "Add",
        type: "button",
        iconPath: icons.addIcon
    });

    const label = createElement(
        "label",
        {
            class: styles["add-checkbox-textbox-label"],
            for: props.id
        },
        [
            props.placeholder
        ]
    )

    const fieldset = createElement(
        "fieldset",
        {
            class: styles["add-checkbox-fieldset"]
        },
        [
            legend,
            label,
            textBox,
            addButton
        ]
    );

    function clear()
    {
        textBox.value = "";
    }

    function getValue()
    {
        return textBox.value;
    }

    return { element: fieldset, clear: clear, getValue: getValue }
}