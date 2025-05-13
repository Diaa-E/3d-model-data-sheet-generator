import { v4 as generateId } from "uuid"
import { createElement } from "../utils/createElement";
import icons from "../barrels/icons.barrel";

import styles from "./ItemCheckbox.module.css";

export default function ItemCheckBox(props = {
    name: "",
    text: "",
    value: "",
    onChange: () => {},
    checked: false,
    itemIcon: ""
})
{
    props = {
        name: "item",
        text: "item",
        value: "item",
        onChange: () => {},
        checked: false,
        itemIcon: icons.defaultIcon,
        ...props
    };

    const id = generateId();

    const itemCheckBox = createElement(
        "input",
        {
            id: id,
            type: "checkbox",
            name: props.name,
            value: props.value,
            class: styles["item-checkbox"],
            onChange: props.onChange,
            ...(props.checked && { checked: true })
        }
    );

    const visibilityMark = createElement(
        "div",
        {
            class: styles["visibility-mark"]
        }
    );

    const itemMark = createElement(
        "div",
        {
            class: styles["item-mark"]
        }
    );

    const labelText = createElement(
        "span",
        {
            class: styles["item-checkbox-label-text"]
        },
        [
            props.text
        ]
    );

    const label = createElement(
        "label",
        {
            for: id,
            class: styles["item-checkbox-label"],
            "--item-icon": `url("${props.itemIcon}")`
        },
        [
            itemMark,
            labelText,
            visibilityMark
        ]
    );

    const divWrapper = createElement(
        "div",
        {

        },
        [
            itemCheckBox,
            label
        ]
    )

    return {element: divWrapper};
}