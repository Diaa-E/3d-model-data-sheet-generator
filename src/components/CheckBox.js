import { v4 as generateId } from "uuid"
import { createElement, createFragment } from "../utils/createElement";

import styles from "./CheckBox.module.css";

export default function CheckBox(options)
{
    options = {
        name: "checkbox",
        text: "checkbox",
        value: "checkbox",
        onChange: () => {},
        ...options
    }

    const id = generateId();

    const checkBox = createElement(
        "input",
        {
            id: id,
            type: "checkbox",
            name: options.name,
            value: options.value,
            class: styles["checkbox"],
            onChange: options.onChange
        }
    )

    const label = createElement(
        "label",
        {
            for: id,
            class: styles["checkbox-label"]
        },
        [
            options.text
        ]
    )

    return createFragment(
        {},
        checkBox,
        label
    )
}