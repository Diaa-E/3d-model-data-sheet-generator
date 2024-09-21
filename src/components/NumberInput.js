import { v4 as generateId } from "uuid";
import { createElement } from "../utils/createElement";

import styles from "./NumberInput.module.css";

export default function NumberInput(props = {
    text: "",
    placeholder: "",
    onInput: () => {},
    name: "",
    max: "",
    min: "",
    required: false,
    value: "",
})
{
    const id = generateId();

    props = {
        text: "number",
        placeholder: "number",
        onInput: () => {},
        name: "number",
        max: "",
        min: "",
        value: "",
        ...props
    }

    const numberInput = createElement(
        "input",
        {
            type: "number",
            id: id,
            placeholder: props.placeholder,
            onInput: props.onInput,
            name: props.name,
            max: props.max,
            min: props.min,
            value: props.value,
            class: styles["number-input"],
            ...(props.required && { required: true }),
        },
        []
    );

    const label = createElement(
        "label",
        {
            for: id,
            class: styles["number-input-label"]
        },
        [
            props.text
        ]
    );

    const divContainer = createElement(
        "div",
        {
            class: styles["number-input-field"]
        },
        [
            label,
            numberInput
        ]
    );

    function getValue()
    {
        return numberInput.value;
    }

    function clear()
    {
        numberInput.value = "";
    }

    return {element: divContainer, getValue: getValue, clear: clear};
}