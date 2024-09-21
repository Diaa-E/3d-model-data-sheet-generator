import { createElement } from "../../utils/createElement";
import EdgeSplit from "./EdgeSplit.fieldset";
import styles from "./MainForm.module.css";
import MeshType from "./MeshType.fieldset";
import ModelContents from "./ModelContents.fieldset";

import ModelInfo from "./ModelInfo.fieldset";
import ModelTier from "./ModelTier.fieldset";
import PolyCount from "./PolyCount.fieldset";
import Rigging from "./Rigging.fieldset";
import Uv from "./Uv.fieldset";

export default function MainForm()
{
    const modelInfo = ModelInfo();
    const modelContents = ModelContents();
    const modelTier = ModelTier();
    const polyCount = PolyCount();
    const meshType = MeshType();
    const edgeSplit = EdgeSplit();
    const rigging = Rigging();
    const uv = Uv();

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
            edgeSplit.element,
            rigging.element,
            uv.element,
        ]
    );

    return { element: form }
}