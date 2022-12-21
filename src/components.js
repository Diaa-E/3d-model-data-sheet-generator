"use strict";

import addIcon from "./icons/add.svg";
import {label, textArea, iconButton, inputNumber, inputText, div} from "./elements";

export function startApp()
{
    
    const form = document.querySelector("#content");
    form.append(
        modelDetails());

}

function modelDetails()
{
    const lblModelDetails = label({
        for: "details",
        text: "Model Details",
        classes: ["label"]});

    const lblModelItems = label({
        text: "Model Contents",
        classes: ["label"]});

    const txtModelDetails = textArea({
        id: "details",
        placeholder:"Describe your model...", 
        classes: ["text-area"]});

    //item name input field
    const lblItemName = label({
        text: "Item",
        classes: ["label-input"],
        for: "itemName",
    });
    const txtItemName = inputText({
        name: "itemName",
        id: "itemName",
        classes: ["text-input"]
    });

    const divItemName = div({
        classes: ["input-container"],
        children: [lblItemName, txtItemName]
    })

    //item count input field
    const lblItemCounte = label({
        text: "Item Count",
        classes: ["label-input"],
        for: "itemCount",
    });

    const txtItemCount = inputNumber({
        name: "itemCount",
        id: "itemCount",
        classes: ["text-input"],
        min: 1
    });

    const divItemCount = div({
        classes: ["input-container"],
        children: [lblItemCounte, txtItemCount]
    })

    //add button
    const btnAdd = iconButton({
        icon: addIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"]});

    //add item card
    const divAddItem = div({
        children: [divItemName, divItemCount, btnAdd],
        classes: ["option", "add"],
    })

    //parent card
    const divWrapper = div({
        id: "modelDetails",
        classes: ["card"],
        children: [lblModelDetails, txtModelDetails, lblModelItems, divAddItem]
    })

    return divWrapper;
}