import { createElement } from "../utils/createElement";
import ListItem from "./ListItem";
import styles from "./UnorderedList.module..css";

export default function OrderedList(props = {
    listItems: [],
    addToData: () => {},
    removeFromData: () => {}
})
{
    props = {

        listItems: [],
        addToData: () => {},
        removeFromData: () => {},
        ...props
    };

    const orderedList = createElement(
        "ul",
        {
            class: styles["ordered-list"]
        },
    );

    function addItem(firstField, secondField)
    {
        const listItem = ListItem({
            firstField: firstField,
            secondField: secondField,
            onDelete: () => {
                props.removeFromData(listItem.getKey());
                listItem.element.parentElement.removeChild(listItem.element)
            },
        });

        orderedList.appendChild(
            listItem.element
        );

        props.addToData(listItem.getKey(), firstField, secondField);
    }

    return {element: orderedList, addItem: addItem};
}