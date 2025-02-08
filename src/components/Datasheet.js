import { createElement } from "../utils/createElement";
import styles from "./Datasheet.module.css";
import DatasheetList from "./DatasheetList";
import DatasheetSetTitle from "./DatasheetSetTitle";
import { formattingTokens as f } from "../utils/formattingTokens";

export default function Datasheet(props = {

    title: "",
    targetSite: "",
    sets: [],
})
{
    props = {
        title: "",
        targetSite: "",
        sets: [
            {
                title: "title1",
                type: "orderedList",
                data: ["value1", "value2"],
            },
        ],
        ...props
    };

    const FIELDSETS_TYPES = [
        "text",
        "orderedList",
        "unorderedList",
    ];

    if (!props.title || typeof props.title !== "string")
    {
        throw new TypeError(`Invalid title "${props.title}": title must be a non-empty string.`);
    }
    else if (!(props.sets instanceof Array))
    {
        throw new TypeError(`Invalid sets "${props.sets}".`);
    }
    else if (props.sets.length === 0)
    {
        throw new Error("Invalid sets: Sets cannot be empty.");
    }

    const datasheetTitle = createElement(
        "h4",
        {
            class: styles["datasheet-title"]
        },
        `${f[props.targetSite].heading}${f[props.targetSite].bold}${props.title}${f[props.targetSite].bold}${f[props.targetSite].break}`,
    )
    const datasheetSets = [];

    for (const set of props.sets)
    {
        if (!set.title || typeof set.title !== "string")
        {
            throw new TypeError(`Invalid set title "${set.title}": title must be a non-empty string`);
        }
        else if (!FIELDSETS_TYPES.includes(set.type))
        {
            throw new SyntaxError(`Invalid fieldset type "${set.type}"`);
        }
        else if (!(set.data instanceof Array))
        {
            throw new SyntaxError(`Invalid set "${set}"`);
        }

        datasheetSets.push(

            DatasheetSetTitle({
                title: set.title,
                emptySet: set.data.length === 0,
                targetSite: props.targetSite,
            }).element
        );

        if (set.type === "text")
        {
            datasheetSets.push(
                createElement(
                    "p",
                    {
                        class: styles["datasheet-text"]
                    },
                    `${f[props.targetSite].break}${set.data.join(", ")}${f[props.targetSite].break}`
                )
            );
        }
        else if (set.type === "orderedList")
        {
            datasheetSets.push(

                DatasheetList({
                    ordered: true,
                    list: set.data,
                    targetSite: props.targetSite
                }).element
            );
        }
        else if (set.type === "unorderedList")
        {
            datasheetSets.push(

                DatasheetList({
                    ordered: false,
                    list: set.data,
                    targetSite: props.targetSite
                }).element
            );
        }
    }

    const datasheetWrapper = createElement(
        "div",
        {
            class: styles["datasheet-wrapper"]
        },
        [
            datasheetTitle,
            ...datasheetSets
        ]
    );

    return { element: datasheetWrapper }
}