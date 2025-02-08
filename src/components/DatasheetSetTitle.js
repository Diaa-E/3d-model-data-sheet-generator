import { createElement } from "../utils/createElement";
import { formattingTokens as f } from "../utils/formattingTokens";
import styles from "./DatasheetSetTitle.module.css";

export default function DatasheetSetTitle(props = {
    title: "",
    emptySet: false,
    targetSite: "",
})
{
    props = {
        title: "Set Title",
        emptySet: false,
        targetSite: "",
        ...props
    };

    const titleSpan = createElement(
        "span",
        {
            
        },
        `${f[props.targetSite].break}${f[props.targetSite].bold}${props.title}${f[props.targetSite].bold}${f[props.targetSite].break}`
    )

    const title = createElement(
        "h5",
        {
            class: `${styles["set-title"]} ${props.emptySet ? styles["empty-set-title"] : ""}`
        },
        titleSpan
    );

    return { element: title };
}