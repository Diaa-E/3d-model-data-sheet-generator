import { v4 as generateId } from "uuid";
import {createElement, createFragment} from "../utils/createElement";

import styles from "./Radio.module.css";

export default function Radio(    props = { name: "", onChange: () => {}, text: "", value: "" })
{
    props = {
        name: "radioGroup",
        onChange: () => {},
        text: "Radio",
        value: "radio",
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
            class: `${styles["radio"]}`
        },
        [],
    );

    const label = createElement(
        "label",
        {
            for: id,
            class: `${styles["radio-label"]}`
        },
        [
            props.text,
        ]
    );

    const fragment = createFragment(
        {},
        radioButton,
        label
    )

    return fragment;
}