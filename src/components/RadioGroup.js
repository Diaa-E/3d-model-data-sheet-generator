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
        "em",
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

    function addButton(...buttons)
    {
        div.append(...buttons);

        emptyGroupText.remove();
    }

    function removeButton(label)
    {
        const targetButton = Array.from(div.querySelectorAll("label")).find(element => element.textContent === label);

        if (targetButton)
        {
            targetButton.remove();
        }

        if (div.querySelectorAll("label").length === 0)
        {
            div.append(emptyGroupText);
        }
    }

    function removeAllButtons()
    {
        while (div.childNodes[0])
        {
            div.childNodes[0].remove();
        }
        
        div.append(emptyGroupText);
    }

    return { element: div, addButton: addButton, removeButton: removeButton, removeAllButtons: removeAllButtons}
}