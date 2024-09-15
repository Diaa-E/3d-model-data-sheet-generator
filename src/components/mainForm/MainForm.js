import { createElement } from "../../utils/createElement";
import styles from "./MainForm.module.css";
import MeshType from "./MeshType";

import ModelInfo from "./ModelInfo";
import ModelTier from "./ModelTier";

export default function MainForm()
{
    const modelInfo = ModelInfo();
    const meshType = MeshType();
    const modelTier = ModelTier();

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
            modelTier.element,
            meshType.element,
        ]
    );

    return { element: form }
}