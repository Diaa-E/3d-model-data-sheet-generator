import { createElement } from "./utils/createElement";
import DatasheetForm from "./components/DatasheetForm";
import ModelInfoFieldset from "./components/fieldsets/ModelInfoFieldset";
import PolyCountFieldset from "./components/fieldsets/PolyCountFieldset";
import CheckboxFieldset from "./components/fieldsets/CheckboxFieldset";
import RadioFieldset from "./components/fieldsets/RadioFieldSet";
import DatasheetFieldset from "./components/fieldsets/DatasheetFieldset";
import ItemCheckBoxFieldset from "./components/fieldsets/ItemCheckBoxFieldset";
import icons from "./barrels/icons.barrel";
import { InvalidFieldsetException } from "./utils/customExceptions";
import formatNumberComma from "./utils/numberFormatter";
import { formattingTokens } from "./utils/formattingTokens";
import Dialog from "./components/Dialog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Popup from "./components/Popup";

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
        hint: "List all of the unique items included in your 3D model.",
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
        hint: `some 3D model formats don't keep sharp edge data, which requires sharp edges to be split.
        If your model's edges are welded, select "None"`,
        required: true,
        options: [
            "None",
            "Smoothing Split",
            "UV Split",
            "Smoothing Split + UV Split",
            "All Edges"
        ],
        storageKey: storageKeys.edgeSplit,
        enableUserOptions: false,
    });

    const rigging = CheckboxFieldset({
        legend: "Rigging and Animation",
        hint: "Check if model is rigged, animated or both.",
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
        hint: `Overlapping UVs means some islads are sharing the same space on the texture map,
         if all UVs are unique, select "Non-overlapping"`,
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
        hint: `List all the texture sets included in your 3D model. It is a good practice to write each set's resolution 
        in addition to its name.`,
        storageKey: storageKeys.textureSets,
        addItemLegend: "Add a new texture set",
        addItemPlaceholder: "i.e lowpoly monkey (4096 x 4096)",
        itemIcon: icons.textureSetIcon,
        required: false,
    });

    const textureWorkflow = CheckboxFieldset({
        legend: "Texture Workflow",
        hint: `List texturing methods included in your 3D model.`,
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
            "Ambient Occlusion (R) + Roughness (G) + Metallic (B)",
            "Roughness",
            "Specular",
            "Specular (RGB) + Smoothness (Alpha)",
            "Metallic (Greyscale) + Smoothness (Alpha)"
        ],
        storageKey: storageKeys.textureMaps,
        enableUserOptions: true,
        userOptionLegend: "Add a new texture map",
        userOptionPlaceholder: "New Texture Map",
        required: false,
    });

    const targetSite = RadioFieldset({
        legend: "Target Website",
        hint: `Each site has its own unique tokens for formatting text, select "None" to generate plain formatted text.`,
        options: [
            ...Object.keys(formattingTokens)
        ],
        storageKey: storageKeys.targetSite,
        enableUserOptions: false,
        required: true,
    });

    const datasheet = DatasheetFieldset({
        onReset: onReset
    });

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

    function onReset(e)
    {
        Dialog({
            prompt: "Are you sure you want to reset the form?",
            onConfirm: () => {
                modelInfo.reset();
                modelContents.reset();
                modelTier.reset();
                polyCount.reset();
                meshType.reset();
                edgeSplit.reset();
                rigging.reset();
                uv.reset();
                textureSets.reset();
                textureWorkflow.reset();
                textureFormat.reset();
                textureMaps.reset();
                targetSite.reset();
        
                Popup({
                    error: false,
                    lastFocusedElement: e.target,
                    msg: "Form has been reset.",
                    showScrollToField: false,
                }).open();
            }
        }).open();
    }

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
                Popup({
                    error: true,
                    lastFocusedElement: error.details.invalidElement,
                    msg: error.message,
                    showScrollToField: true
                }).open();
            }
            else
            {
                throw error;
            }
        }
    }

    const contentDiv = createElement(
        "div",
        {
            id: "content"
        },
        [
            form.element
        ]
    );
        
    return [ contentDiv ];
}

document.getElementById("root").append(
    Header().element,
    ...ModelForm(),
    Footer().element
)