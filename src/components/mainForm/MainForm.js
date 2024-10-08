import { createElement } from "../../utils/createElement";
import EdgeSplit from "./EdgeSplit.fieldset";
import styles from "./MainForm.module.css";
import MeshType from "./MeshType.fieldset";
import ModelContents from "./ModelContents.fieldset";

import ModelInfo from "./ModelInfo.fieldset";
import ModelTier from "./ModelTier.fieldset";
import PolyCount from "./PolyCount.fieldset";
import Rigging from "./Rigging.fieldset";
import TargetSite from "./TargetSite.fieldset";
import TextureFormat from "./TextureFormat";
import TextureMaps from "./TextureMaps.fieldset";
import TextureSets from "./TextureSets.fieldset";
import TextureWorkflow from "./TextureWorkflow.fieldset";
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
    const textureSets = TextureSets();
    const textureWorkflow = TextureWorkflow();
    const textureFormat = TextureFormat();
    const textureMaps = TextureMaps();
    const targetSite = TargetSite();

    const form = createElement(
        "form",
        {
            action: "/",
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
            textureSets.element,
            textureWorkflow.element,
            textureFormat.element,
            textureMaps.element,
            targetSite.element,
        ]
    );

    return { element: form }
}