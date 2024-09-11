import { v4 as generateId } from "uuid"
import { createElement, createFragment } from "../utils/createElement";

import styles from "./CheckBox.module.css";

export default function CheckBox(props = { name: "", text: "", value: "", onChange: () => {} })
{
    props = {
        name: "checkbox",
        text: "checkbox",
        value: "checkbox",
        onChange: () => {},
        ...props
    }

    const id = generateId();

    const checkBox = createElement(
        "input",
        {
            id: id,
            type: "checkbox",
            name: props.name,
            value: props.value,
            class: styles["checkbox"],
            onChange: props.onChange
        }
    )

    const label = createElement(
        "label",
        {
            for: id,
            class: styles["checkbox-label"]
        },
        [
            props.text
        ]
    )

    return createFragment(
        {},
        checkBox,
        label
    )
}