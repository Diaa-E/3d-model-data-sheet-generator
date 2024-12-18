import ErrorPopup from "./components/ErrorPopup";
import Header from "./components/Header";
import { createElement } from "./utils/createElement";
import DatasheetForm from "./components/DatasheetForm";
import ModelInfoFieldset from "./components/fieldsets/ModelInfoFieldset";
import PolyCountFieldset from "./components/fieldsets/PolyCountFieldset";
import CheckboxFieldset from "./components/fieldsets/CheckboxFieldset";
import RadioFieldset from "./components/fieldsets/RadioFieldSet";
import DatasheetFieldset from "./components/fieldsets/DatasheetFieldset";
import { dispatchErrorPopupEvent } from "./utils/errorPopupEvents";
import ItemCheckBoxFieldset from "./components/fieldsets/ItemCheckBoxFieldset";
import icons from "./barrels/icons.barrel";
import { InvalidFieldsetException } from "./utils/customExceptions";
import formatNumberComma from "./utils/numberFormatter";
import { formattingTokens } from "./utils/formattingTokens";

export default function ModelForm()
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
        enableUserOptions: true,
        addItemLegend: "Add a new item",
        addItemPlaceholder: "i.e 5 lowpoly monkeys",
        itemIcon: icons.modelItemIcon,
        required: true,
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
        required: true
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
        required: true,
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
        required: false,
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
        required: false,
    });

    const textureSets = ItemCheckBoxFieldset({
        legend: "Texture Sets",
        storageKey: storageKeys.textureSets,
        addItemLegend: "Add a new texture set",
        addItemPlaceholder: "i.e lowpoly monkey (4096 x 4096)",
        itemIcon: icons.textureSetIcon,
        required: false,
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
        userOptionPlaceholder: "New Texture Workflow",
        required: false,
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
        userOptionPlaceholder: "New Texture Format",
        required: false,
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
        userOptionPlaceholder: "New Texture Map",
        required: false,
    });

    const targetSite = RadioFieldset({
        legend: "Target Website",
        options: [
            ...Object.keys(formattingTokens)
        ],
        storageKey: storageKeys.targetSite,
        enableUserOptions: false,
        required: true,
    });

    const datasheet = DatasheetFieldset();

    const form = DatasheetForm({
        formTitle: "3D Model Form",
        fieldsets: [
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
        ],
        onSubmit: onSubmit,
    });

    function onSubmit()
    {
        try
        {
            modelInfo.validate();
            modelContents.validate();
            modelTier.validate();
            polyCount.validate();
            meshType.validate();
            edgeSplit.validate();
            rigging.validate();
            uv.validate();
            textureSets.validate();
            textureWorkflow.validate();
            textureFormat.validate();
            textureMaps.validate();
            targetSite.validate();

            datasheet.generateDatasheet({

                title: modelInfo.getState().title,
                targetSite: targetSite.getState(),
                sets: [
                    {
                        title: "Description",
                        type: "text",
                        data: Array.from([modelInfo.getState().description])
                    },
                    {
                        title: "Model Contents",
                        type: "unorderedList",
                        data: Array.from(modelContents.getState())
                    },
                    {
                        title: "Model Tier",
                        type: "text",
                        data: Array.from([modelTier.getState()])
                    },
                    {
                        title: "Trianlges",
                        type: "text",
                        data: Array.from([formatNumberComma(polyCount.getState().triangles)])
                    },
                    {
                        title: "Vertices",
                        type: "text",
                        data: Array.from([formatNumberComma(polyCount.getState().vertices)])
                    },
                    {
                        title: "Mesh Type",
                        type: "text",
                        data: Array.from([meshType.getState()])
                    },
                    {
                        title: "Edge Split",
                        type: "text",
                        data: Array.from([edgeSplit.getState()])
                    },
                    {
                        title: "Rigging and Animation",
                        type: "unorderedList",
                        data: Array.from(rigging.getState())
                    },
                    {
                        title: "UV Mapping",
                        type: "unorderedList",
                        data: Array.from(uv.getState())
                    },
                    {
                        title: "Texture Sets",
                        type: "unorderedList",
                        data: Array.from(textureSets.getState())
                    },
                    {
                        title: "Texture Workflow",
                        type: "unorderedList",
                        data: Array.from(textureWorkflow.getState())
                    },
                    {
                        title: "Texture Format",
                        type: "unorderedList",
                        data: Array.from(textureFormat.getState())
                    },
                    {
                        title: "Texture Maps",
                        type: "orderedList",
                        data: Array.from(textureMaps.getState())
                    }
                ]
            });
        }
        catch (error)
        {
            if (error instanceof InvalidFieldsetException)
            {
                dispatchErrorPopupEvent({
                    dispatchingElement: form.element,
                    errorMsg: error.message
                });
            }
            else
            {
                throw error;
            }
        }
    }

    const header = Header();
    const errorPopup = ErrorPopup();

    const contentDiv = createElement(
        "div",
        {
            id: "content"
        },
        [
            form.element
        ]
    )
        
    return [ header.element, contentDiv, errorPopup.element ];
}