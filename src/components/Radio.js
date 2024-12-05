import { v4 as generateId } from "uuid";
import {createElement, createFragment} from "../utils/createElement";

import styles from "./Radio.module.css";

export default function Radio( props = {
    name: "",
    onChange: () => {},
    text: "",
    value: "",
    checked: false,
    userOption: false
})
{
    props = {
        name: "radioGroup",
        onChange: () => {},
        text: "Radio",
        value: "radio",
        checked: false,
        userOption: false,
        ...props
    }

    const id = generateId();

    const radioButton = createElement(
        "input",
        {
            type: "radio",
            id: id,
            name: props.name,
            value: props.value,
            onChange: props.onChange,
            class: `${styles["radio"]}`,
            ...(props.checked && { checked: true }),
        },
        [],
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
            class: styles["radio-label-text"]
        },
        [
            props.text
        ]
    );

    const label = createElement(
        "label",
        {
            for: id,
            class: `${styles["radio-label"]}`
        },
        [
            userMark,
            props.text,
            checkMark,
        ]
    );

    const fragment = createFragment(
        {},
        radioButton,
        label
    )

    return fragment;
}