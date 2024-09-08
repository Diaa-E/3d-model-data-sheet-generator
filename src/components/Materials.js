"use strict";
import Div from "./Div";
import ErrorPanel from "./ErrorPanel";
import IconButton from "./IconButton";
import addIcon from "../icons/add.svg";
import InputNumber from "./InputNumber";
import InputText from "./InputText";
import Label from "./Label";
import ListItem from "./ListItem";

export default function Materials() {
    const lblTitle = Label({
        text: "Materials",
        classes: ["label"]
    });

    const lblmaterialName = Label({
        text: "Texture set",
        classes: ["label-input"],
        for: "materialName",
    });
    const txtMaterialName = InputText({
        name: "materialName",
        id: "materialName",
        classes: ["text-input"],
        placeholder: "Texture set's name",
        required: true,
        errorMsg: "Any texture set must have a name",
    });

    const divMaterialName = Div({
        classes: ["input-container"],
        children: [lblmaterialName, txtMaterialName.element]
    });

    const lblResolution = Label({
        text: "Texture Resolution",
        classes: ["label-input"],
        for: "resolution",
    });

    const txtResolution = InputNumber({
        name: "resolution",
        id: "resolution",
        classes: ["text-input"],
        min: "1",
        placeholder: "What are the texture's dimensions?",
        required: true,
        errorMsg: "The texture must be at least 1 x 1 pixels",
    });

    const divMaterialResolution = Div({
        classes: ["input-container"],
        children: [lblResolution, txtResolution.element]
    });

    const btnAdd = IconButton({
        icon: addIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        clickFunction: addTextureSet
    });

    const divError = ErrorPanel("addMaterialError");

    const divMaterial = Div({
        children: [divMaterialName, divMaterialResolution, btnAdd],
        classes: ["option", "add"],
    });

    const divWrapper = Div({
        id: "materials",
        classes: ["card"],
        children: [
            lblTitle,
            divError.element,
            divMaterial
        ]
    });

    function addTextureSet() {
        if (!txtMaterialName.isValid()) {
            showError(txtMaterialName.getError());
        }
        else if (!txtResolution.isValid()) {
            showError(txtResolution.getError());
        }

        else {
            divWrapper.append(ListItem(
                txtMaterialName.getContent(),
                `${txtResolution.getContent()} x ${txtResolution.getContent()} Pixels`, "textureSet"));
            txtResolution.clearContent();
            txtMaterialName.clearContent();
            clearError();
        }
    }

    function getData() {
        const divList = document.querySelectorAll("#materials>#textureSet");

        const modelMaterials = [];

        divList.forEach(item => {
            const pList = item.querySelectorAll("p");
            modelMaterials.push(`${pList[0].textContent} (${pList[1].textContent})`);
        });

        return { materials: modelMaterials };
    }

    function showError(errorMsg) {
        divError.showError(errorMsg);
    }

    function clearError() {
        divError.clearError();
    }

    return { component: divWrapper, getData, showError, clearError };
}
