import { createElement } from "../utils/createElement";
import styles from "./RadioGroup.module.css";

export default function RadioGroup( props = {
    buttons: [],
})
{
    props = {
        buttons: [],
        ...props
    };
    
    const emptyGroupText = createElement(
        "p",
        {
            class: styles["empty-group-text"],
        },
        [
            "This section has no items."
        ]
    );

    const div = createElement(
        "div",
        {
            class: styles["radio-group"]
        },
        [
            ...(props.buttons.length > 0 ? props.buttons : [ emptyGroupText ]),
        ]
    );

    function addButton(button)
    {
        if(Array.isArray(button))
        {
            div.append(
                ...button
            );
        }
        else
        {
            div.append(
                button
            );
        }

        emptyGroupText.remove();
    }

    return { element: div, addButton: addButton }
}