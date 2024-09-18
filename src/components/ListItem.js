import { createElement } from "../utils/createElement";
import IconButton from "./IconButton";
import styles from "./ListItem.module.css";
import deleteIcon from "../assets/icons/delete.svg";
import { v4 as generateId } from "uuid";

export default function ListItem(props = {
    firstField: "",
    secondField: "",
    onDeleteCallback: () => {},
})
{
    const KEY = generateId();

    props = {
        firstField: "field_1",
        secondField: "field_2",
        onDeleteCallbaxk: () => {},
        ...props
    }

    const field_1 = createElement(
        "span",
        {
            class: styles["field-1"]
        },
        [
            props.firstField
        ]
    );

    const field_2 = createElement(
        "span",
        {
            class: styles["field-2"]
        },
        [
            props.secondField
        ]
    );

    const deleteButton = IconButton({
        type: "button",
        color: "danger",
        iconPath: deleteIcon,
        onClick: props.onDeleteCallback,
        text: "Delete"
    })

    const listItem = createElement(
        "li",
        {
            class: styles["list-item"],
        },
        [
            field_2,
            field_1,
            deleteButton
        ]
    );

    function getKey()
    {
        return KEY;
    }

    return {element: listItem, getKey: getKey};
}