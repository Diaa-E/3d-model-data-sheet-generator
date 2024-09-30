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

    const div = createElement(
        "div",
        {
            class: styles["radio-group"]
        },
        [
            ...props.buttons,
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
    }

    return { element: div, addButton: addButton }
}