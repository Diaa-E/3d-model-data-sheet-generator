import { createElement } from "../utils/createElement";
import styles from "./FieldsContainer.module.css";

export default function FieldsContainer( props = {
    children: []
})
{
    props = {

         children: [],
         ...props,
    };

    const divContainer = createElement(
        "div",
        {
            class: styles["fields-container"]
        },
        [
            props.children,
        ]
    );

    return divContainer;
}