"use strict";

import domUtility from "./dom.utility";
import addIcon from "./icons/add.svg";

export function modelDetails()
{
    const divWrapper = card("modelDetails");

    const fieldId = "details"
    const lblModelDetails = label(fieldId, "Model Details");
    const txtModelDetails = textArea(fieldId, "Describe your model...");

    const divAddItem = cardOption(true);
    const txtItemName = labeledInput("Item", "itemName", "text");
    const txtItemCount = labeledInput("Item Count", "itemCount", "number");
    domUtility.setElementAttributes(txtItemCount, ["min", "value"], [1, 1]);

    divAddItem.append(txtItemName, txtItemCount, addButton());

    divWrapper.append(
        lblModelDetails,
        txtModelDetails,
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

function label(target = "", text = "")
{
    const labelClasses = ["label"];

    const lbl = domUtility.createDomElement("label", text);
    domUtility.addClasses(lbl, labelClasses);
    domUtility.setElementAttributes(lbl, ["for"], [target]);

    return lbl;
}

function textArea(id = "", placeholder = "")
{
    const textAreaClasses = ["text-area"];

    const txt = domUtility.createDomElement("textarea", null, id);
    domUtility.addClasses(txt, textAreaClasses);
    domUtility.setElementAttributes(txt, ["name", "rows", "placeholder"], [id, 10, placeholder]);

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

function addButton()
{
    const btnClasses = ["button"];
    const iconClasses = ["button-icon"];

    const btn = domUtility.createDomElement("button");
    domUtility.addClasses(btn, btnClasses);
    domUtility.setElementAttributes(btn, ["Type"], ["button"])

    const icon = new Image();
    icon.src = addIcon;
    domUtility.addClasses(icon, iconClasses);

    btn.append(icon);

    return btn;
}