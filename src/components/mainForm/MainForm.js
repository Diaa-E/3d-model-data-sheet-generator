import { createElement } from "../../utils/createElement";
import styles from "./MainForm.module.css";
import MeshType from "./MeshType";
import ModelContents from "./ModelContents";

import ModelInfo from "./ModelInfo";
import ModelTier from "./ModelTier";
import PolyCount from "./PolyCount";

export default function MainForm()
{
    const modelInfo = ModelInfo();
    const modelContents = ModelContents();
    const modelTier = ModelTier();
    const polyCount = PolyCount();
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
            modelContents.element,
            modelTier.element,
            polyCount.element,
            meshType.element,
        ]
    );

    return { element: form }
}