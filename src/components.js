"use strict";

import domUtility from "./dom.utility";

export function modelDetails()
{
    const divWrapper = card("modelDetails");

    const fieldId = "details"
    const lblModelDetails = label(fieldId, "Model Details");
    const txtModelDetails = textArea(fieldId, "Describe your model...");
    divWrapper.append(lblModelDetails, txtModelDetails);

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
    const textAreaClasses = ["text-field"];

    const txt = domUtility.createDomElement("textarea", null, id);
    domUtility.addClasses(txt, textAreaClasses);
    domUtility.setElementAttributes(txt, ["name", "rows", "placeholder"], [id, 10, placeholder]);

    return txt;
}