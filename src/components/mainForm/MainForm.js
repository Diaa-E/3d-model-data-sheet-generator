import { createElement } from "../../utils/createElement";
import CheckboxFieldset from "./CheckboxFieldset";
import styles from "./MainForm.module.css";
import ModelContents from "./ModelContents.fieldset";

import ModelInfo from "./ModelInfo.fieldset";
import PolyCount from "./PolyCount.fieldset";
import RadioFieldset from "./RadioFieldSet";
import TextureFormat from "./TextureFormat";
import TextureMaps from "./TextureMaps.fieldset";
import TextureSets from "./TextureSets.fieldset";
import TextureWorkflow from "./TextureWorkflow.fieldset";
import Uv from "./Uv.fieldset";

export default function MainForm()
{
    const modelInfo = ModelInfo();
    const modelContents = ModelContents();

    const modelTier = RadioFieldset({
        legend: "Model Tier",
        options: [
            "Low-poly",
            "Mid-poly",
            "High-poly"
        ],
        storageKey: "modelTier",
        enableUserOptions: false,
    });

    const polyCount = PolyCount();

    const meshType = RadioFieldset({
        legend: "Mesh Type",
        options: [
            "Non-unifrom Polygons",
            "Triangulated Mesh",
            "Quad Mesh",
            "Quad Mesh (Subdivision Ready)",
        ],
        storageKey: "meshType",
        enableUserOptions: false,
    });

    const edgeSplit = RadioFieldset({
        legend: "Edge Split",
        options: [
            "None",
            "Sharp Edges",
            "Angle-based",
            "All Edges"
        ],
        storageKey: "edgeSplit",
        enableUserOptions: false,
    });

    const rigging = CheckboxFieldset({
        legend: "Rigging and Animation",
        options: [
            "Rigged",
            "Animated",
        ],
        storageKey: "rigging",
        enableUserOptions: false,
    });

    const uv = Uv();
    const textureSets = TextureSets();
    const textureWorkflow = TextureWorkflow();
    const textureFormat = TextureFormat();
    const textureMaps = TextureMaps();

    const targetSite = RadioFieldset({
        legend: "Target Website",
        options: [
            "None",
            "CGTrader",
            "Fab",
            "Sketchfab",
        ],
        storageKey: "targetSite",
        enableUserOptions: false
    });

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