import styles from "./DatasheetForm.module.css";
import { createElement } from "../utils/createElement";
import { getIllegalCharacters } from "../utils/formattingTokens";

export default function DatasheetForm(props = {
    onSubmit: () => {},
    fieldsets: [],
    formTitle: "",
})
{
    props = {
        onSubmit: () => {},
        fieldsets: [],
        formTitle: "Datasheet Form",
        ...props
    };

    const title = createElement(
        "h1",
        {
            class: styles["form-title"],
        },
        props.formTitle
    );

    const requiredFieldsTip = createElement(
        "p",
        {
            class: styles["tip"],
        },
        [
            "Fieldsets marked with an (*) are required."
        ]
    );

    const illegalCharactersTip = createElement(
        "p",
        {
            class: styles["tip"]
        },
        [
            `The following strings are not allowed: ${getIllegalCharacters().join(", ")}`
        ]
    );

    const form = createElement(
        "form",
        {
            action: "/",
            class: styles["datasheet-form"],
            onSubmit: (e) => {
                e.preventDefault();
                props.onSubmit(e);
            }
        },
        [
            title,
            requiredFieldsTip,
            illegalCharactersTip,
            props.fieldsets
        ]
    );

    return { element: form };
}