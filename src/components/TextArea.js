import { createElement } from "../utils/createElement";
import { v4 as generateId } from "uuid";
import styles from "./TextArea.module.css";

export default function TextArea(props = {

    text: "",
    placeholder: "",
    rows: 10,
    cols: 30,
    onInput: () => {},
    value: "",
})
{
    const id = generateId();

    props = {
        text: "text area",
        placeholder: "text area",
        rows: 10,
        cols: 30,
        onInput: () => {},
        value: "",
        ...props
    };

    const label = createElement(
        "label",
        {
            for: id,
            class: styles["text-area-label"]
        },
        [
            props.text
        ]
    );
    
    const textArea = createElement(
        "textarea",
        {
            id: id,
            placeholder: props.placeholder,
            class: styles["text-area"],
            rows: props.rows,
            cols: props.cols,
            onInput: props.onInput,
        },
        [
            props.value
        ]
    );

    const divContainer = createElement(
        "div",
        {
            class: styles["text-area-field"]
        },
        [
            label,
            textArea
        ]
    );

    function clear()
    {
        textArea.value = "";
    }

    return {element: divContainer, clear: clear};
}