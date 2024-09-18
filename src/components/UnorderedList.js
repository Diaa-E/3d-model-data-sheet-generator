import { createElement } from "../utils/createElement";
import ListItem from "./ListItem";
import styles from "./UnorderedList.module..css";

export default function UnorderedList(props = {
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

    const listItems = props.listItems.map(item => {

        const keys = Object.keys(item);

        const listItem = ListItem({
            key: item[keys[0]],
            firstField: item[keys[1]],
            secondField: item[keys[2]],
            onDelete: () => deleteItem(listItem),
        });

        return (
            listItem.element
        );
    });

    const unorderedList = createElement(
        "ul",
        {
            class: styles["ordered-list"]
        },
        listItems
    );

    function addItem(firstField, secondField)
    {
        const listItem = ListItem({
            firstField: firstField,
            secondField: secondField,
            onDelete: () => deleteItem(listItem),
        });

        unorderedList.appendChild(
            listItem.element
        );

        props.addToData(listItem.getKey(), firstField, secondField);
    }

    function deleteItem(listItem)
    {
        props.removeFromData(listItem.getKey());
        listItem.element.parentElement.removeChild(listItem.element);
    }

    return {element: unorderedList, addItem: addItem};
}