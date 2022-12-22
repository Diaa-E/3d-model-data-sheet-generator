"use strict";

import addIcon from "./icons/add.svg";
import deleteIcon from "./icons/delete.svg";
import {label, textArea, iconButton, inputNumber, inputText, div, p} from "./elements";

export function startApp()
{
    const form = document.querySelector("#content");
    form.append(
        modelDetails(),
        modelContents());
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
    })

    //add button
    const btnAdd = iconButton({
        icon: addIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"]});

    const divAddItem = div({
        children: [divItemName, divItemCount, btnAdd],
        classes: ["option", "add"],
    })

    const testItem = modelItem(3, "Coffee Flask");
    const testItem2 = modelItem(10, "Jerrycan");

    const divWrapper = div({
        id: "modelContents",
        classes: ["card"],
        children: [lblModelItems, divAddItem, testItem, testItem2]
    })

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
    divModelDetails.removeChild(e.target.parentNode.parentNode);
}