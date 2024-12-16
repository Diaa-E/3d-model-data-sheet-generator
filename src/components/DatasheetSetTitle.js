import { createElement } from "../utils/createElement";
import styles from "./DatasheetSetTitle.module.css";

export default function DatasheetSetTitle(props = {
    title: "",
    emptySet: false,
})
{
    props = {
        title: "Set Title",
        emptySet: false,
        ...props
    };

    const titleSpan = createElement(
        "span",
        {
            
        },
        props.title
    )

    const title = createElement(
        "h2",
        {
            class: `${styles["set-title"]} ${props.emptySet ? styles["empty-set-title"] : ""}`
        },
        titleSpan
    );

    return { element: title };
}