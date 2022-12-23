"use strict";

import addIcon from "./icons/add.svg";
import deleteIcon from "./icons/delete.svg";
import {label, textArea, iconButton, inputNumber, inputText, div, p, select} from "./elements";

export function startApp()
{
    const form = document.querySelector("#content");
    form.append(
        modelDetails(),
        modelContents(),
        meshDetails());
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
    const meshType = select("meshType", ["option1", "option2"], "Mesh Type");

    const divWrapper = div({
        id: "meshDetails",
        classes: ["card"],
        children: [lblTitle, meshType]
    });

    return divWrapper;
}