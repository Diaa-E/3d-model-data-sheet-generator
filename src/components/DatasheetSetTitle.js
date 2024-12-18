import { createElement } from "../utils/createElement";
import { formattingTokens } from "../utils/formattingTokens";
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
        `${formattingTokens[props.targetSite].bold}
        ${props.title}
        ${formattingTokens[props.targetSite].bold}`
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