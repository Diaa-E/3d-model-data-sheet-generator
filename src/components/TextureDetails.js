"use strict";
import Div from "./Div";
import Label from "./Label";
import Select from "./Select";

export default function TextureDetails() {
    const lblTitle = Label({
        text: "Texture Details",
        classes: ["label"]
    });

    const textureExt = Select({
        lblText: "Texture format",
        id: "textureExt",
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        choices: [".PNG", ".EXR", ".JPEG"],
        minChoices: 1,
        optionClasses: ["button-choice"]
    });

    const workflow = Select({
        id: "workflow",
        lblText: "Texture Workflow",
        choices: [
            "PBR Metallic Roughness",
            "PBR Specular Gloss",
            "Non-PBR"
        ],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        minChoices: 1,
        optionClasses: ["button-choice"]
    });

    const uvMapping = Select({
        id: "uvs",
        lblText: "UV Mapping",
        choices: [
            "Overlapping (Mirrored)",
            "Overlapping (Duplicate/Array/Thickness)",
            "Non-Overlapping (unique)"
        ],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const maps = Select({
        id: "maps",
        lblText: "Texture Maps",
        choices: [
            "Base Color",
            "Base Color + Alpha Opacity",
            "Normal GL",
            "Normal DX",
            "Height/Bump",
            "Opacity",
            "Metallic",
            "Glossiness",
            "Roughness",
            "Specular",
            "Ambient Occlusion",
            "Packed RGB (AO + Roughness + Metallic)",
            "ID Map",
            "Emissive",
            "Packed Normal GL + Height",
            "Packed Normal DX + Height"
        ].sort(),
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        minChoices: 1,
        optionClasses: ["button-choice"]
    });

    const divWrapper = Div({
        id: "textureDetails",
        classes: ["card"],
        children: [
            lblTitle,
            textureExt.element,
            workflow.element,
            uvMapping.element,
            maps.element,
        ]
    });

    function getData() {
        return {
            format: textureExt.getSelected(),
            workflow: workflow.getSelected(),
            uv: uvMapping.getSelected(),
            maps: maps.getSelected(),
        };
    }

    return { component: divWrapper, getData };
}
