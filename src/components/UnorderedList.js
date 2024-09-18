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

    const emptyListText = createElement(
        "span",
        {
            class: styles["empty-list-text"]
        },
        [
            "This list has no items."
        ]
    );

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
        listItems.length > 0 ? listItems : emptyListText
    );

    function addItem(firstField, secondField)
    {
        const listItem = ListItem({
            firstField: firstField,
            secondField: secondField,
            onDelete: () => deleteItem(listItem),
        });

        if (unorderedList.children[0] === emptyListText)
        {
            unorderedList.removeChild(emptyListText);
        }

        unorderedList.appendChild(
            listItem.element
        );

        props.addToData(listItem.getKey(), firstField, secondField);
    }

    function deleteItem(listItem)
    {
        props.removeFromData(listItem.getKey());
        listItem.element.parentElement.removeChild(listItem.element);
        
        if (unorderedList.children.length === 0)
        {
            unorderedList.appendChild(emptyListText)
        }
    }

    return {element: unorderedList, addItem: addItem};
}