import { createElement } from "../../utils/createElement";
import styles from "./MainForm.module.css";

import ModelInfoFieldset from "./ModelInfoFieldset";
import PolyCountFieldset from "./PolyCountFieldset";
import CheckboxFieldset from "./CheckboxFieldset";
import RadioFieldset from "./RadioFieldSet";
import DatasheetFieldset from "./DatasheetFieldset";
import { dispatchErrorPopupEvent } from "../../utils/errorPopupEvents";
import ItemCheckBoxFieldset from "./ItemCheckBoxFieldset";
import icons from "../../barrels/icons.barrel";

export default function MainForm()
{
    // keeps all keys in sight to easily spot repeating keys if they exist
    const storageKeys = {
        modelInfo: "modelInfo",
        modelContents: "modelContents",
        modelTier: "modelTier",
        polyCount: "polyCount",
        meshType: "meshType",
        edgeSplit: "edgeSplit",
        rigging: "rigging",
        uv: "uv",
        textureSets: "textureSets",
        textureFormat: "textureFormat",
        textureMaps: "textureMaps",
        targetSite: "targetSite",
        textureWorkflow: "textureWorkflow",
    };

    const modelInfo = ModelInfoFieldset({
        storageKey: storageKeys.modelInfo
    });

    const modelContents = ItemCheckBoxFieldset({
        legend: "Model Contents",
        storageKey: storageKeys.modelContents,
        items: [],
        enableUserOptions: true,
        addItemLegend: "Add a new item",
        addItemPlaceholder: "i.e 5 lowpoly monkeys",
        itemIcon: icons.modelItemIcon,
    });

    const modelTier = RadioFieldset({
        legend: "Model Tier",
        options: [
            "Low-poly",
            "Mid-poly",
            "High-poly"
        ],
        storageKey: storageKeys.modelTier,
        enableUserOptions: false,
    });

    const polyCount = PolyCountFieldset({
        storageKey: storageKeys.polyCount
    });

    const meshType = RadioFieldset({
        legend: "Mesh Type",
        options: [
            "Non-unifrom Polygons",
            "Triangulated Mesh",
            "Quad Mesh",
            "Quad Mesh (Subdivision Ready)",
        ],
        storageKey: storageKeys.meshType,
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
        storageKey: storageKeys.edgeSplit,
        enableUserOptions: false,
    });

    const rigging = CheckboxFieldset({
        legend: "Rigging and Animation",
        options: [
            "Rigged",
            "Animated",
        ],
        storageKey: storageKeys.rigging,
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
        storageKey: storageKeys.uv,
        enableUserOptions: false,
    });

    const textureSets = ItemCheckBoxFieldset({
        legend: "Texture Sets",
        items: [],
        storageKey: storageKeys.textureSets,
        addItemLegend: "Add a new texture set",
        addItemPlaceholder: "i.e lowpoly monkey (4096 x 4096)",
        itemIcon: icons.textureSetIcon
    });

    const textureWorkflow = CheckboxFieldset({
        legend: "Texture Workflow",
        options: [
            "PBR Metallic Roughness",
            "PBR Specular Gloss",
            "Non-PBR",
        ],
        storageKey: storageKeys.textureWorkflow,
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
        storageKey: storageKeys.textureFormat,
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
        storageKey: storageKeys.textureMaps,
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
        storageKey: storageKeys.targetSite,
        enableUserOptions: false
    });

    const datasheet = DatasheetFieldset();

    const form = createElement(
        "form",
        {
            action: "/",
            onSubmit: (e) => {

                e.preventDefault();
                onSubmit();
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
            datasheet.element
        ]
    );

    function onSubmit()
    {
        try
        {
            modelInfo.validate();
        }
        catch (error)
        {
            dispatchErrorPopupEvent({
                dispatchingElement: form,
                errorMsg: error
            });
        }
    }

    return { element: form }
}