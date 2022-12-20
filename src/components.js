"use strict";

import domUtility from "./dom.utility";

export function createModelDetails()
{
    const divModelDetails = domUtility.createDomElement("div");
    domUtility.addClasses(divModelDetails, ["card"]);

    const fieldId = "details"
    const lblModelDetails = domUtility.createDomElement("label", "Model Details");
    domUtility.setElementAttributes(lblModelDetails, ["for"], [fieldId]);
    domUtility.addClasses(lblModelDetails, ["label"]);

    const txtModelDetails = domUtility.createDomElement("textarea");
    domUtility.setElementAttributes(txtModelDetails, ["id", "name", "rows", "placeholder"], [fieldId, fieldId, 10, "Model description..."]);
    domUtility.addClasses(txtModelDetails, ["text-field"]);

    divModelDetails.append(lblModelDetails, txtModelDetails);

    return divModelDetails;
}