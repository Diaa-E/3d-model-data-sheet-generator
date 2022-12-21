"use strict";

import domUtility from "./dom.utility";
import addIcon from "./icons/add.svg";

export function modelDetails()
{
    const divWrapper = card("modelDetails");

    const fieldId = "details"
    const lblModelDetails = label({for: "details", text: "Model Details", classes: ["label"]});
    const txtModelDetails = textArea({id: "details", placeholder:"Describe your model...", classes: ["text-area"]});
    const lblModelItems = label("", "Model Contents");

    const divAddItem = cardOption(true);
    const txtItemName = labeledInput("Item", "itemName", "text");
    const txtItemCount = labeledInput("Item Count", "itemCount", "number");
    domUtility.setElementAttributes(txtItemCount, ["min", "value"], [1, 1]);

    divAddItem.append(txtItemName, txtItemCount, button(addIcon));

    divWrapper.append(
        lblModelDetails,
        txtModelDetails,
        lblModelItems,
        divAddItem);

    return divWrapper;
}

function card(id = "")
{
    const cardClasses = ["card"];

    const divCard = domUtility.createDomElement("div", null, id);
    domUtility.addClasses(divCard, cardClasses);

    return divCard;
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

    const lbl = domUtility.createDomElement("label", options.text, options.id);
    domUtility.addClasses(lbl, options.classes);
    domUtility.setElementAttributes(lbl,["for"], [options.for]);

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

function cardOption(add = false)
{
    const optionClasses = ["option"];
    const addClasses = ["add"];

    const totalClasses = [...optionClasses, ...add ? addClasses : []];

    const divOption = domUtility.createDomElement("div");
    domUtility.addClasses(divOption, totalClasses);

    return divOption;
}

function labeledInput(labelText, id, type)
{
    const labelClasses = ["label-input"];
    const textClasses = ["text-input"];
    const wrapperClasses = ["input-container"];

    const divWrapper = domUtility.createDomElement();
    domUtility.addClasses(divWrapper, wrapperClasses);

    const lbl = domUtility.createDomElement("label", labelText);
    const txt = domUtility.createDomElement("input", "", id);

    domUtility.addClasses(lbl, labelClasses);
    domUtility.setElementAttributes(lbl, ["for"], [id]);

    domUtility.addClasses(txt, textClasses);
    domUtility.setElementAttributes(txt, ["type"], [type])

    divWrapper.append(lbl, txt);

    return divWrapper;
}

function button(newIcon, clickFunction = () => {})
{
    const btnClasses = ["button"];
    const iconClasses = ["button-icon"];

    const btn = domUtility.createDomElement("button");
    domUtility.addClasses(btn, btnClasses);
    domUtility.setElementAttributes(btn, ["Type"], ["button"])
    
    btn.addEventListener("click", (e) => {

        clickFunction(e);
    })

    const btnIcon = new Image();
    btnIcon.src = newIcon;
    domUtility.addClasses(btnIcon, iconClasses);

    btn.append(btnIcon);

    return btn;
}