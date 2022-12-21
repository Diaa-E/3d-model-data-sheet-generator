"use strict";

import domUtility from "./dom.utility";
import addIcon from "./icons/add.svg";

export function modelDetails()
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
function label(options)
{
    options = {
        id: "",
        for: "",
        text: "Default text",
        classes: [],
        ...options
    }

    const lbl = document.createElement("label");
    lbl.textContent = options.text;
    domUtility.addClasses(lbl, options.classes);
    domUtility.setElementAttributes(lbl,["for", "id"], [options.for, options.id]);

    return lbl;
}

function textArea(options)
{
    options = {
        id: "",
        name: "",
        cols: 30,
        rows: 10,
        placeholder: "Write text",
        classes: [],
        ...options
    }

    const txt = document.createElement("textarea");
    domUtility.addClasses(txt, options.classes);
    domUtility.setElementAttributes(
        txt,
        ["name", "id", "rows", "cols", "placeholder"],
        [options.name, options.id, options.rows, options.cols, options.placeholder]
    );

    return txt;
}

function iconButton(options)
{
    options = {
        icon: addIcon,
        btnClasses: [],
        iconClasses: [],
        type: "button",
        id: "",
        clickFunction: () => {},
        ...options
    }

    const btn = document.createElement("buttons");
    domUtility.addClasses(btn, options.btnClasses);
    domUtility.setElementAttributes(btn, ["Type", "id"], [options.type, options.id]);
    
    btn.addEventListener("click", (e) => {

        options.clickFunction(e);
    })

    const btnIcon = new Image();
    btnIcon.src = options.icon;
    domUtility.addClasses(btnIcon, options.iconClasses);

    btn.append(btnIcon);

    return btn;
}

function inputNumber(options)
{
    options = {
        min: "",
        max: "",
        classes: [],
        id: "",
        name: "",
        ...options
    }

    const num = document.createElement("input");
    domUtility.setElementAttributes(
        num,
        ["min", "max", "id", "name"]
        [options.min, options.max, options.id, options.name]);
    domUtility.addClasses(num, options.classes);

    return num;
}

function inputText(options)
{
    options = {
        minlength: "",
        maxlength: "",
        classes: [],
        id: "",
        name: "",
        placeholder: "",
        ...options
    }

    const txt = document.createElement("input");
    domUtility.setElementAttributes(
        txt,
        ["minlength", "maxlength", "id", "name", "placeholder"]
        [options.min, options.max, options.id, options.name, options.placeholder]);
    domUtility.addClasses(txt, options.classes);

    return txt;
}

function div(options)
{
    options = {
        id: "",
        classes: [],
        children: [],
        ...options
    };

    const div = document.createElement("div");
    domUtility.setElementAttributes(
        div,
        ["id"],
        [options.id]
    );
    domUtility.addClasses(div, options.classes);

    if (options.children.length > 0)
    {
        options.children.forEach(child => {

            div.append(child);
        });
    };

    return div;
}