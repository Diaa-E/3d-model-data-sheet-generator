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

    const form = createElement(
        "form",
        {
            action: "/",
            class: styles["datasheet-form"],
            onSubmit: (e) => {
                e.preventDefault()
                props.onSubmit(e)
            }
        },
        props.fieldsets
    );

    return { element: form };
}