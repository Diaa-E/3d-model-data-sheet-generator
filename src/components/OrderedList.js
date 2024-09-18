import { createElement } from "../utils/createElement";
import ListItem from "./ListItem";
import styles from "./OrderedList.module.css";

export default function OrderedList(props = {
    listItems: [],
    addItemCallback: () => {},
    deleteItemCallback: () => {}
})
{
    props = {

        listItems: [],
        addItemCallback: () => {},
        deleteItemCallback: () => {},
        ...props
    };

    const orderedList = createElement(
        "ol",
        {
            class: styles["ordered-list"]
        },
        [

        ]
    );

    function addItem(firstField, secondField)
    {
        const listItem = ListItem({
            firstField: firstField,
            secondField: secondField,
            onDeleteCallback: () => {

                props.deleteItemCallback(listItem.getKey());
                listItem.element.parentElement.removeChild(listItem.element);
                console.log("deleted");
            }
        });

        orderedList.appendChild(
            listItem.element
        );

        props.addItemCallback(listItem.getKey(), firstField, secondField);
    }

    return {element: orderedList, addItem: addItem};
}