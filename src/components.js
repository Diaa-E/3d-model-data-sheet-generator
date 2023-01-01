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
        polyCount());
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
    });

    const divItemName = div({
        classes: ["input-container"],
        children: [lblItemName, txtItemName]
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
    });

    const divItemCount = div({
        classes: ["input-container"],
        children: [lblItemCount, txtItemCount]
    });

    //add button
    const btnAdd = iconButton({
        icon: addIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        clickFunction: addItem});

    const divError = errorPanel("addError");

    const divAddItem = div({
        children: [divItemName, divItemCount, btnAdd],
        classes: ["option", "add"],
    });

    const divWrapper = div({
        id: "modelContents",
        classes: ["card"],
        children: [lblModelItems, divError, divAddItem]
    });

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

function addItem()
{
    const txtItemName = document.querySelector("#itemName");
    const txtItemCount = document.querySelector("#itemCount");
    const divError = document.querySelector("#addError");
    divError.textContent = "";

    if (!txtItemName.validity.valid)
    {
        divError.textContent = "Any item must have a name.";
    }
    else if (!txtItemCount.checkValidity())
    {
        divError.textContent = "There has to be at least 1 of the item.";
    }
    else
    {
        const divModelContents = document.querySelector("#modelContents");
        divModelContents.append(modelItem(txtItemCount.value, txtItemName.value));
        txtItemCount.value = "";
        txtItemName.value = "";
    }
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
            realWorldScale]
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
    });

    txtTris.addEventListener("input", () => {

        if (!txtTris.checkValidity())
        {
            divError.textContent = "Any model must consist of at least 1 polygon";
        }
        else
        {
            divError.textContent = "";
        }
    });

    const divTris = div({
        classes: ["input-container"],
        children: [lblTris, txtTris]
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
    });

    txtVerts.addEventListener("input", () => {

        if (!txtVerts.checkValidity())
        {
            divError.textContent = "Any model must consist of at least 1 vertex";
        }
        else
        {
            divError.textContent = "";
        }
    });

    const divVerts = div({
        classes: ["input-container"],
        children: [lblVerts, txtVerts]
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