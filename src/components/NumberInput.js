import { v4 as generateId } from "uuid";
import { createElement } from "../utils/createElement";

import styles from "./NumberInput.module.css";

export default function NumberInput(props = {
    text: "",
    placeholder: "",
    onChange: () => {},
    name: "",
    max: "",
    min: "",
    required: false
})
{
    const id = generateId();

    props = {
        text: "number",
        placeholder: "number",
        onChange: () => {},
        name: "number",
        max: "",
        min: "",
        ...props
    }

    const numberInput = createElement(
        "input",
        {
            type: "number",
            id: id,
            placeholder: props.placeholder,
            onChange: props.onChange,
            name: props.name,
            max: props.max,
            min: props.min,
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
    )

    return divContainer;
}