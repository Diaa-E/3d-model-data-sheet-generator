import { createElement } from "../../utils/createElement";
import CheckboxFieldset from "./CheckboxFieldset";
import styles from "./MainForm.module.css";
import ModelContentsFieldset from "./ModelContentsFieldset";

import ModelInfoFieldset from "./ModelInfoFieldset";
import PolyCountFieldset from "./PolyCountFieldset";
import RadioFieldset from "./RadioFieldSet";
import TextureSets from "./TextureSets.fieldset";

export default function MainForm()
{
    const modelInfo = ModelInfoFieldset({
        storageKey: "modelInfo"
    });

    const modelContents = ModelContentsFieldset({
        storageKey: "modelContents",
    });

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

    const polyCount = PolyCountFieldset({
        storageKey: "polycount"
    });

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

    const uv = CheckboxFieldset({
        legend: "UV Mapping",
        options: [
            "Non-overlapping",
            "Overlapping by duplication",
            "Overlapping by Mirroring",
            "Overlapping by Extrusion"
        ],
        storageKey: "uv",
        enableUserOptions: false,
    });

    const textureSets = TextureSets();

    const textureWorkflow = CheckboxFieldset({
        legend: "Texture Workflow",
        options: [
            "PBR Metallic Roughness",
            "PBR Specular Gloss",
            "Non-PBR",
        ],
        storageKey: "textureWorkflow",
        enableUserOptions: true,
        userOptionLegend: "Add a new texture workflow",
        userOptionPlaceholder: "New Texture Workflow"
    });

    const textureFormat = CheckboxFieldset({
        legend: "Texture Format",
        options: [
            ".PNG",
            ".JPEG",
            ".EXR",
        ],
        storageKey: "textureFormat",
        enableUserOptions: true,
        userOptionLegend: "Add a new texture format",
        userOptionPlaceholder: "New Texture Format"
    });

    const textureMaps = CheckboxFieldset({
        legend: "Texture Maps",
        options: [
            "Ambient Occlusion",
            "Base Color",
            "Base Color (RGB) + Opacity (Alpha)",
            "Albedo",
            "Albedo (RGB) + Opacity (Alpha)",
            "Emissive",
            "Glossiness",
            "Height/Bump",
            "ID Map",
            "Metallic",
            "Normal DX",
            "Normal GL",
            "Opacity",
            "Normal DX (RGB) + Height (Alpha)",
            "Normal GL (RGB) + Height (Alpha)",
            "Ambient Occlusion (R) + Roughness (G) + Metallic (B)",
            "Roughness",
            "Specular"
        ],
        storageKey: "textureMaps",
        enableUserOptions: true,
        userOptionLegend: "Add a new texture map",
        userOptionPlaceholder: "New Texture Map"
    });

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