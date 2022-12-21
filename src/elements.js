"use strict";

import defaultIcon from "./icons/add.svg";
import domUtility from "./dom.utility";
export {label, textArea, iconButton, inputNumber, inputText, div};

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
        icon: defaultIcon,
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