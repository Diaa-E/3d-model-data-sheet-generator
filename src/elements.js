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
    lbl.setAttribute("for", options.for);
    lbl.id = options.id
    domUtility.addClasses(lbl, options.classes);

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
    txt.id = options.id;
    txt.name = options.name;
    txt.cols = options.cols;
    txt.rows = options.rows;
    txt.placeholder = options.placeholder;
    domUtility.addClasses(txt, options.classes);

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
    btn.type = options.type;
    btn.id = options.id;
    domUtility.addClasses(btn, options.btnClasses);
    
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
        placeholder: "",
        ...options
    }

    const num = document.createElement("input");
    num.type = "number";
    num.name = options.name;
    num.min = options.min;
    num.max = options.max;
    num.id = options.id;
    num.placeholder = options.placeholder;

    domUtility.addClasses(num, options.classes);

    return num;
}

function inputText(options)
{
    options = {
        minLength: "",
        maxLength: "",
        classes: [],
        id: "",
        name: "",
        placeholder: "",
        ...options
    }

    const txt = document.createElement("input");
    txt.name = options.name;
    txt.id = options.id;
    txt.maxLength = options.maxLength;
    txt.minLength = options.minLength;
    txt.placeholder = options.placeholder;

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
    div.id = options.id
    domUtility.addClasses(div, options.classes);

    if (options.children.length > 0)
    {
        options.children.forEach(child => {

            div.append(child);
        });
    };

    return div;
}