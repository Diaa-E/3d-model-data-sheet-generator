"use strict";

import addIcon from "./icons/add.svg";
import deleteIcon from "./icons/delete.svg";
import {label, textArea, iconButton, inputNumber, inputText, div, p, select, radio} from "./elements";

export function startApp()
{
    const form = document.querySelector("#content");
    form.append(
        modelDetails().component,
        modelContents().component,
        meshDetails().component,
        polyCount().component,
        materials().component,
        textureDetails().component);
}

function modelDetails()
{
    const lblModelDetails = label({
        for: "details",
        text: "Model Details",
        classes: ["label"]});

    const txtModelDetails = textArea({
        id: "details",
        placeholder:"Describe your model...", 
        classes: ["text-area"]});

    //parent card
    const divWrapper = div({
        id: "modelDetails",
        classes: ["card"],
        children: [lblModelDetails, txtModelDetails.element]
    })

    function getData()
    {
        return {details: txtModelDetails.getContent()};
    }

    return {component: divWrapper, getData};
}

function modelContents()
{
    const lblModelItems = label({
        text: "Model Contents",
        classes: ["label"]});
    //item name input field
    const lblItemName = label({
        text: "Item",
        classes: ["label-input"],
        for: "itemName",
    });
    const txtItemName = inputText({
        name: "itemName",
        id: "itemName",
        classes: ["text-input"],
        placeholder: "Item's name",
        required: true,
        errorMsg: "Any item must have a name",
    });

    const divItemName = div({
        classes: ["input-container"],
        children: [lblItemName, txtItemName.element]
    })

    //item count input field
    const lblItemCount = label({
        text: "Item Count",
        classes: ["label-input"],
        for: "itemCount",
    });

    const txtItemCount = inputNumber({
        name: "itemCount",
        id: "itemCount",
        classes: ["text-input"],
        min: "1",
        placeholder: "How many of it included",
        required: true,
        errorMsg: "There has to be at least 1 of the item"
    });

    const divItemCount = div({
        classes: ["input-container"],
        children: [lblItemCount, txtItemCount.element]
    });

    //add button
    const btnAdd = iconButton({
        icon: addIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        clickFunction: addItem});

    const divError = errorPanel("addItemError");

    const divAddItem = div({
        children: [divItemName, divItemCount, btnAdd],
        classes: ["option", "add"],
    });

    const divWrapper = div({
        id: "modelContents",
        classes: ["card"],
        children: [lblModelItems, divError, divAddItem]
    });

    function addItem()
    {
        if (!txtItemName.isValid())
        {
            divError.textContent = txtItemName.getError();
        }
        else if (!txtItemCount.isValid())
        {
            divError.textContent = txtItemCount.getError();
        }
        else
        {
            divWrapper.append(listItem(txtItemName.getContent(),
                `x ${txtItemCount.getContent()}`, "modelItem"));
            txtItemCount.clearContent();
            txtItemName.clearContent();
            divError.textContent = "";
            getData();
        }
    }

    function getData()
    {
        const divList = document.querySelectorAll("#modelContents>#modelItem");

        const modelItems = [];

        divList.forEach(item => {
            const pList = item.querySelectorAll("p");
            modelItems.push(`${pList[1].textContent} ${pList[0].textContent}`);
        });

        return {items: modelItems};
    }

    return {component: divWrapper, getData};
}

//instead of writing a unique delete function for every type of list
//since all list items use the .option class it can be used to identify the target
//instead of the id
function removeListItem(e)
{
    let target = e.target.parentNode;
    let counter = 0;

    //keep going up in the tree until the target is found or counter expires
    //counter stops infinite loops, the number 10 is arbitrary
    while (!target.classList.contains("option") && counter < 10)
    {
        target = target.parentNode;
        counter++;
    }

    //the list's parent is always one level higher
    target.parentNode.removeChild(target);
}

function listItem(firstField, secondField, id)
{
    const divItem = div({
        id: id,
        classes: ["option"],
        children: [
            p({
                text: firstField,
                classes: ["item-name"]
            }),
            p({
                text:secondField,
                classes: ["item-name", "item-count"]
            }),
            iconButton({
                icon: deleteIcon,
                btnClasses: ["button"],
                iconClasses: ["button-icon"],
                clickFunction: removeListItem,
            })
        ]
    });

    return divItem;
}

function errorPanel(id)
{
    const divError = div({
        classes: ["error"],
        id: id,
    });

    return divError;
}

function meshDetails()
{
    const lblTitle = label({
        text: "Mesh Details",
        classes: ["label"]
    });
    const meshType = radio({
        id: "meshType",
        lblText: "Mesh Type",
        choices: [
            "Polygon Mesh",
            "Triangulated Polygon Mesh",
            "Quad Mesh"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const polyTier = radio({
        id: "polyTier",
        lblText: "Polycount Tier",
        choices: [
            "Lowpoly",
            "Highpoly"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const gameReady = radio({
        id: "gameready",
        lblText: "Model is game-ready",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const subdivision = radio({
        id: "subdivision",
        lblText: "Model is subdivision-ready",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const edgeSplit = radio({
        id: "edgeSplit",
        lblText: "Edge splits",
        choices: [
            "Sharp edges only",
            "All edges",
            "Based on angle"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const realWorldScale = radio({
        id: "realWorldScale",
        lblText: "Model is scaled to real world dimensions",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const rigged = radio({
        id: "rigged",
        lblText: "Model is rigged",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const divWrapper = div({
        id: "meshDetails",
        classes: ["card"],
        children: [
            lblTitle,
            meshType.element,
            polyTier.element,
            gameReady.element,
            subdivision.element,
            edgeSplit.element,
            realWorldScale.element,
            rigged.element]
    });

    function getData()
    {
        return {
            meshType: meshType.getSelected(),
            polyTier: polyTier.getSelected(),
            gameReady: gameReady.getSelected(),
            subdivision: subdivision.getSelected(),
            edgeSplit: edgeSplit.getSelected(),
            realWorldScale: realWorldScale.getSelected(),
            rigged: rigged.getSelected(),
        }
    }

    return {component: divWrapper, getData};
}

function polyCount()
{
    const lblTitle = label({
        text: "Poly Count",
        classes: ["label"]
    });

    const lblTris = label({
        text: "Number of polygons",
        classes: ["label-input"],
        for: "tris",
    });

    const txtTris = inputNumber({
        name: "tris",
        id: "tris",
        classes: ["text-input"],
        min: "1",
        placeholder: "How many triangles is your model?",
        required: true,
        errorMsg: "Any model must consist of at least 1 polygon",
    });

    txtTris.element.addEventListener("input", () => {

        if (!txtTris.isValid())
        {
            divError.textContent = txtTris.getError();
        }
        else
        {
            divError.textContent = "";
        }
    });

    const divTris = div({
        classes: ["input-container"],
        children: [lblTris, txtTris.element]
    });

    const lblVerts = label({
        text: "Number of vertices",
        classes: ["label-input"],
        for: "verts",
    });

    const txtVerts = inputNumber({
        name: "verts",
        id: "verts",
        classes: ["text-input"],
        min: "1",
        placeholder: "How many vertices is your model?",
        required: true,
        errorMsg: "Any model must consist of at least 1 vertex",
    });

    txtVerts.element.addEventListener("input", () => {

        if (!txtVerts.isValid())
        {
            divError.textContent = txtVerts.getError();
        }
        else
        {
            divError.textContent = "";
        }
    });

    const divVerts = div({
        classes: ["input-container"],
        children: [lblVerts, txtVerts.element]
    });

    const divPolyCount = div({
        children: [divTris, divVerts],
        classes: ["option", "add", "no-button"],
    });

    const divError = errorPanel("polycountError");

    const divWrapper = div({
        id: "polyCount",
        classes: ["card"],
        children: [
            lblTitle,
            divError,
            divPolyCount,
        ]
    });

    function getData()
    {
        return {
            tris: txtTris.getContent(),
            verts: txtVerts.getContent(),
        }
    }

    return {component: divWrapper, getData};
}

function materials()
{
    const lblTitle = label({
        text: "Materials",
        classes: ["label"]
    });

    const lblmaterialName = label({
        text: "Texture set",
        classes: ["label-input"],
        for: "materialName",
    });
    const txtMaterialName = inputText({
        name: "materialName",
        id: "materialName",
        classes: ["text-input"],
        placeholder: "Texture set's name",
        required: true,
        errorMsg: "Any texture set must have a name",
    });

    const divMaterialName = div({
        classes: ["input-container"],
        children: [lblmaterialName, txtMaterialName.element]
    });

    const lblResolution = label({
        text: "Texture Resolution",
        classes: ["label-input"],
        for: "resolution",
    });

    const txtResolution = inputNumber({
        name: "resolution",
        id: "resolution",
        classes: ["text-input"],
        min: "1",
        placeholder: "What are the texture's dimensions?",
        required: true,
        errorMsg: "The texture must be at least 1 x 1 pixels",
    });

    const divMaterialResolution = div({
        classes: ["input-container"],
        children: [lblResolution, txtResolution.element]
    });

    const btnAdd = iconButton({
        icon: addIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        clickFunction: addTextureSet});

    const divError = errorPanel("addMaterialError");

    const divMaterial = div({
        children: [divMaterialName, divMaterialResolution, btnAdd],
        classes: ["option", "add"],
    });

    const divWrapper = div({
        id: "materials",
        classes: ["card"],
        children: [
            lblTitle,
            divError,
            divMaterial
        ]
    });

    function addTextureSet()
    {
        if (!txtMaterialName.isValid())
        {
            divError.textContent = txtMaterialName.getError();
        }
        else if (!txtResolution.isValid())
        {
            divError.textContent = txtResolution.getError();
        }
        else
        {
            divWrapper.append(listItem(
                txtMaterialName.getContent(),
                `${txtResolution.getContent()} x ${txtResolution.getContent()} Pixels`, "textureSet"));
            txtResolution.clearContent();
            txtMaterialName.clearContent();
            divError.textContent = "";
        }
    }

    function getData()
    {
        const divList = document.querySelectorAll("#materials>#textureSet");

        const modelMaterials = [];

        divList.forEach(item => {
            const pList = item.querySelectorAll("p");
            modelMaterials.push(`${pList[0].textContent} (${pList[1].textContent})`);
        });

        return {materials: modelMaterials};
    }

    return {component: divWrapper, getData};
}

function textureDetails()
{
    const lblTitle = label({
        text: "Texture Details",
        classes: ["label"]
    });

    const textureExt = select({
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

    const workflow = select({
        id: "workflow",
        lblText: "Texture Workflow",
        choices: [
            "PBR Metallic Roughness",
            "PBR Specular Gloss"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        minChoices: 1,
        optionClasses: ["button-choice"]
    });

    const normals = select({
        id: "normals",
        lblText: "Normal Maps",
        choices: [
            "OpenGL",
            "DirectX"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        minChoices: 1,
        optionClasses: ["button-choice"]
    });

    const uvMapping = select({
        id: "uvs",
        lblText: "UV Mapping",
        choices: [
            "Overlapping (Mirrored)",
            "OVerlapping (Duplicate/Array)",
            "Non-Overlapping (unique)"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const maps =  select({
        id: "maps",
        lblText: "Texture Maps",
        choices: [
            "Base Color",
            "Base Color + Alpha Opacity",
            "Normal",
            "Height/Bump",
            "Opacity",
            "Metallic",
            "Glossiness",
            "Roughness",
            "Specular",
            "Ambient Occlusion",
            "Packed RGB (AO + Roughness + Metallic)",
            "ID Map",
            "Emissive",],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        minChoices: 1,
        optionClasses: ["button-choice"]
    });
    
    const divWrapper = div({
        id: "textureDetails",
        classes: ["card"],
        children: [
            lblTitle,
            textureExt.element,
            workflow.element,
            normals.element,
            uvMapping.element,
            maps.element,
        ]
    });

    function getData()
    {
        return {
            format: textureExt.getSelected(),
            workflow: workflow.getSelected(),
            normals: normals.getSelected(),
            uv: uvMapping.getSelected(),
            maps: maps.getSelected(),
        }
    }

    return {component: divWrapper, getData};
}