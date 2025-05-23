import { createElement } from "../utils/createElement";
import { v4 as generateId } from "uuid";
import styles from "./TextInput.module.css";

export default function TextInput(props = {
    text: "", 
    placeholder: "", 
    name: "",
    onInput: () => {},
    autocomplete: "",
    value: "",
})
{
    const id = generateId();

    props = {
        text: "text",
        placeholder: "text",
        name: "text",
        autocomplete: "off",
        onInput: () => {},
        value: "",
        ...props
    }

    const textInput = createElement(
        "input",
        {
            id: id,
            type: "text",
            placeholder: props.placeholder,
            name: props.name,
            onInput: props.onInput,
            autocomplete: props.autocomplete,
            class: styles["text-input"],
            value: props.value,
        }
    );

    const label = createElement(
        "label",
        {
            for: id,
            class: styles["text-input-label"],
        },
        [
            props.text
        ]
    );

    const divContainer = createElement(
        "div",
        {
            class: styles["text-input-field"],
        },
        [
            label,
            textInput
        ]
    );

    function getValue()
    {
        return textInput.value;
    }

    function clear()
    {
        textInput.value = "";
    }

    return { element: divContainer, getValue: getValue, clear: clear };
}