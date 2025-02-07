import styles from "./DatasheetForm.module.css";
import { createElement } from "../utils/createElement";

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

    const tip = createElement(
        "p",
        {
            class: styles["tip"],
        },
        [
            "Fieldsets marked with an (*) are required."
        ]
    )

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
            tip,
            props.fieldsets
        ]
    );

    return { element: form };
}