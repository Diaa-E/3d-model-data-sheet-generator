import { v4 as generateId } from "uuid"
import { createElement } from "../utils/createElement";

import styles from "./CheckBox.module.css";

export default function Checkbox(props = {
    name: "",
    text: "",
    value: "",
    onChange: () => {},
    checked: false,
    userOption: false,
})
{
    props = {
        name: "checkbox",
        text: "checkbox",
        value: "checkbox",
        onChange: () => {},
        checked: false,
        userOption: false,
        ...props
    }

    const id = generateId();

    const checkboxInput = createElement(
        "input",
        {
            id: id,
            type: "checkbox",
            name: props.name,
            value: props.value,
            class: styles["checkbox"],
            onChange: props.onChange,
            ...(props.checked && { checked: true })
        }
    );

    
    const checkMark = createElement(
        "div",
        {
            class: styles["check-mark"]
        }
    );

    const userMark = createElement(
        "div",
        {
            class: `${styles["user-mark"]} ${props.userOption ? styles["user-mark-visible"] : ""}`
        }
    );

    const labelText = createElement(
        "span",
        {
            class: styles["checkbox-label-text"]
        },
        [
            props.text
        ]
    );

    const label = createElement(
        "label",
        {
            for: id,
            class: styles["checkbox-label"]
        },
        [
            userMark,
            labelText,
            checkMark
        ]
    );

    const wrapper = createElement(
        "div",
        {

        },
        [
            checkboxInput,
            label
        ]
    )

    return { element: wrapper };
}