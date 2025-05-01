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
        div.innerHTML = "";
        div.append(emptyGroupText);
    }

    return { element: div, addButton: addButton, removeButton: removeButton, removeAllButtons: removeAllButtons}
}