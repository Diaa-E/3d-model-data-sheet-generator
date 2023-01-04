"use strict";

import addIcon from "./icons/add.svg";
import deleteIcon from "./icons/delete.svg";
import {label, textArea, iconButton, inputNumber, inputText, div, p, select, radio} from "./elements";

export function startApp()
{
    const form = document.querySelector("#content");
    form.append(
        modelDetails(),
        modelContents(),
        meshDetails(),
        polyCount(),
        materials(),
        textureDetails());
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
        children: [lblModelDetails, txtModelDetails]
    })

    return divWrapper;
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
        divWrapper.append(modelItem(txtItemCount.getContent(), txtItemName.getContent()));
        txtItemCount.clearContent();
        txtItemName.clearContent();
    }
}

    return divWrapper;
}

function modelItem(itemCount, itemName)
{
    const divItem = div({
        id: "modelItem",
        classes: ["option"],
        children: [
            p({
                text: itemName,
                classes: ["item-name"]
            }),
            p({
                text: `x ${itemCount}`,
                classes: ["item-name", "item-count"]
            }),
            iconButton({
                icon: deleteIcon,
                btnClasses: ["button"],
                iconClasses: ["button-icon"],
                clickFunction: removeItem,
            })
        ]
    });

    return divItem;
}

//since nothing is passed to the back before form submition, no need to keep track of items order
function removeItem(e)
{
    const divModelDetails = document.querySelector("#modelContents");
    let target = e.target.parentNode;
    let counter = 0;

    //keep going up in the tree until the target is found or counter expires
    //counter stops infinite loops, the number 10 is arbitrary
    while (target.id !== "modelItem" && counter < 10)
    {
        target = target.parentNode;
        counter++;
    }

    divModelDetails.removeChild(target);
}

function removeSet(e)
{
    const divMaterials = document.querySelector("#materials");
    let target = e.target.parentNode;
    let counter = 0;

    //keep going up in the tree until the target is found or counter expires
    //counter stops infinite loops, the number 10 is arbitrary
    while (target.id !== "textureSet" && counter < 10)
    {
        target = target.parentNode;
        counter++;
    }

    divMaterials.removeChild(target);
}

// function addItem()
// {
//     const txtItemName = document.querySelector("#itemName");
//     const txtItemCount = document.querySelector("#itemCount");
//     const divError = document.querySelector("#addItemError");
//     divError.textContent = "";

//     if (!txtItemName.validity.valid)
//     {
//         divError.textContent = "Any item must have a name";
//     }
//     else if (!txtItemCount.checkValidity())
//     {
//         divError.textContent = "There has to be at least 1 of the item";
//     }
//     else
//     {
//         const divModelContents = document.querySelector("#modelContents");
//         divModelContents.append(modelItem(txtItemCount.value, txtItemName.value));
//         txtItemCount.value = "";
//         txtItemName.value = "";
//     }
// }

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
    });

    const divWrapper = div({
        id: "meshDetails",
        classes: ["card"],
        children: [
            lblTitle,
            meshType,
            polyTier,
            gameReady,
            subdivision,
            edgeSplit,
            realWorldScale,
            rigged]
    });

    return divWrapper;
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

    return divWrapper;
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
    const txtmaterialName = inputText({
        name: "materialName",
        id: "materialName",
        classes: ["text-input"],
        placeholder: "Texture set's name",
        required: true,
    });

    const divMaterialName = div({
        classes: ["input-container"],
        children: [lblmaterialName, txtmaterialName.element]
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

    return divWrapper;
}

function addTextureSet()
{
    const txtMaterialName = document.querySelector("#materialName");
    const txtResolution = document.querySelector("#resolution");
    const divError = document.querySelector("#addMaterialError");
    divError.textContent = "";

    if (!txtMaterialName.checkValidity())
    {
        divError.textContent = "Any texture set must have a name.";
    }
    else if (!txtResolution.checkValidity())
    {
        divError.textContent = "The texture must be at least 1 x 1 pixels";
    }
    else
    {
        const divMaterials = document.querySelector("#materials");
        divMaterials.append(textureSet(txtMaterialName.value, txtResolution.value));
        txtResolution.value = "";
        txtMaterialName.value = "";
    }
}

function textureSet(setName, setResolution)
{
    const divItem = div({
        id: "textureSet",
        classes: ["option"],
        children: [
            p({
                text: setName,
                classes: ["item-name"]
            }),
            p({
                text: `${setResolution} x ${setResolution} Pixels`,
                classes: ["item-name", "item-count"]
            }),
            iconButton({
                icon: deleteIcon,
                btnClasses: ["button"],
                iconClasses: ["button-icon"],
                clickFunction: removeSet,
            })
        ]
    });

    return divItem;
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
    });
    
    const divWrapper = div({
        id: "textureDetails",
        classes: ["card"],
        children: [
            lblTitle,
            textureExt,
            workflow,
            normals,
            uvMapping,
            maps,
        ]
    });

    return divWrapper;
}