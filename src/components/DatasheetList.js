import { createElement } from "../utils/createElement";
import styles from "./DatasheetList.module.css";

export default function DatasheetList(props = {
    ordered: false,
    list: [],
})
{
    props = {
        ordered: false,
        list: [],
        ...props
    };

    if (!(props.list instanceof Array))
    {
        throw new TypeError(`Invalid list "${props.list}"`);
    }

    let listElement = null;
    let finalList = null;

    if (props.ordered)
    {
        finalList = props.list.sort((a,b) => a < b ? -1 : 1)
        listElement = createElement(
            "ol",
            {
                class: styles["ordered-list-wrapper"]
            }
        );
    }
    else
    {
        finalList = props.list
        listElement = createElement(
            "ul",
            {
                class: styles["unordered-list-wrapper"]
            }
        );
    }

    (finalList.length > 0 ? [...finalList] : ["N/A"]).forEach(item => {

        const listItem = createElement(
            "li",
            {
                class: styles["list-item"]
            },
            item
        );

        listElement.append(listItem);
    });

    return { element: listElement };
}