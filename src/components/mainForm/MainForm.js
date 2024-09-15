import { createElement } from "../../utils/createElement";
import styles from "./MainForm.module.css";
import MeshType from "./MeshType";

import ModelInfo from "./ModelInfo";

export default function MainForm()
{
    const modelInfo = ModelInfo();
    const meshType = MeshType();

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
            meshType.element,
        ]
    );

    return { element: form }
}