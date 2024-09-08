"use strict";
import Div from "./Div";
import ErrorPanel from "./ErrorPanel";
import IconButton from "./IconButton";
import Label from "./Label";
import TextArea from "./TextArea";

import generateIcon from "../icons/bolt.svg";
import copyIcon from "../icons/copy.svg";

export default function Datasheet() {
    const lblTitle = Label({
        text: "Datasheet",
        classes: ["label"]
    });

    const divError = ErrorPanel("submitError");

    const txtSheet = TextArea({
        id: "sheet",
        classes: ["text-area"],
        placeholder: "Click the bolt to generate a sheet...\nCopy the generated sheet to your target site...",
    });
    txtSheet.element.readOnly = true;

    const btnGenerate = IconButton({
        icon: generateIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        type: "submit"
    });
    btnGenerate.formNoValidate = true; //Avoid validating item creation empty fields

    const btnCopy = IconButton({
        icon: copyIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        clickFunction: copyToClipboard
    });

    const divControls = Div({
        classes: ["sheet-controls"],
        children: [btnGenerate, btnCopy]
    });

    const divSheet = Div({
        id: "datasheet",
        classes: ["option", "add", "data-sheet"],
        children: [
            txtSheet.element,
            divControls
        ]
    });

    const divWrapper = Div({
        id: "datasheet",
        classes: ["card"],
        children: [
            lblTitle,
            divError.element,
            divSheet,
        ]
    });

    function showError(errorMsg) {
        divError.showError(errorMsg);
    }

    function clearError() {
        divError.clearError();
    }

    function writeSheet(sheet) {
        txtSheet.element.value = sheet;
    }

    function copyToClipboard() {
        if (txtSheet.getContent() === "") {
            divError.showError("Sheet is empty, nothing was copied to clipboard");
        }

        else {
            navigator.clipboard.writeText(txtSheet.getContent());
            divError.showInfo("Sheet copied to clipboard");
        }
    }

    return { component: divWrapper, showError, clearError, writeSheet };
}
