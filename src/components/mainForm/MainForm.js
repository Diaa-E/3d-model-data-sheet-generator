import { createElement } from "../../utils/createElement";
import styles from "./MainForm.module.css";

import ModelInfo from "./ModelInfo";

export default function MainForm()
{
    const modelInfo = ModelInfo();

    const form = createElement(
        "form",
        {
            actio: "/",
            onSubmit: (e) => {

                e.preventDefault();
            },
            class: styles["main-form"]
        },
        [
            modelInfo.element,
        ]
    );

    return { element: form }
}