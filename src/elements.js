"use strict";

import defaultIcon from "./icons/add.svg";
import domUtility from "./dom.utility";
export {label, textArea, iconButton, inputNumber, inputText, div, p, button, select};

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
        required: false,
        ...options
    }

    const txt = document.createElement("textarea");
    txt.id = options.id;
    txt.name = options.name;
    txt.cols = options.cols;
    txt.rows = options.rows;
    txt.placeholder = options.placeholder;
    txt.required = options.required;
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

    const btn = document.createElement("button");
    btn.type = options.type;
    btn.id = options.id;
    domUtility.addClasses(btn, options.btnClasses);
    
    //When the listener is assigned to the button
    //the event emitter changes depending on where the vlick hit (image or button)
    //which breaks the parentNode chain when deleting the item div
    const btnIcon = new Image();
    btnIcon.src = options.icon;
    domUtility.addClasses(btnIcon, options.iconClasses);

    btn.addEventListener("click", (e) => {

        options.clickFunction(e);
    })

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
        required: false,
        ...options
    }

    const num = document.createElement("input");
    num.type = "number";
    num.name = options.name;
    options.min === "" ? null : num.min = options.min;
    options.max === "" ? null : num.max = options.max;
    num.id = options.id;
    num.required = options.required;
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
        required: false,
        ...options
    }

    const txt = document.createElement("input");
    txt.name = options.name;
    txt.id = options.id;
    options.maxLength === "" ? null : txt.maxLength = options.maxLength;
    options.minLength === "" ? null : txt.minLength = options.minLength;
    txt.placeholder = options.placeholder;
    txt.required = options.required;

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

function p(options)
{
    options = {
        id: "",
        classes: [],
        text: "Default text",
        ...options
    }

    const p = document.createElement("p");
    p.id = options.id;
    p.textContent = options.text;
    domUtility.addClasses(p, options.classes);

    return p;
}

function button(options)
{
    options = {
        classes: [],
        type: "button",
        text: "click here",
        id: "",
        clickFunction: () => {},
        ...options
    }

    const btn = document.createElement("button");
    btn.textContent = options.text;
    btn.id = options.id;
    domUtility.addClasses(btn, options.classes);

    btn.addEventListener("click", (e) => {

        //prevent triggering of other click events further up the DOM tree
        e.preventDefault();
        options.clickFunction(e);
    })

    return btn;
}

function select(id, choices = [], lblText)
{
    const divChoices = [];

    choices.forEach(choice => {

        divChoices.push(button({
            text: choice,
            classes: ["button-choice"]
        }))
    })

    const divChoicesContainer = div({
        id: "meshTypeChoices",
        classes: ["choices-container"],
        children: [...divChoices]
    })

    const lbl = label({
        text: lblText,
        classes: ["label-input"]
    })

    const divSelect = div({
        id: id,
        classes: ["option", "add", "select"],
        children: [lbl, divChoicesContainer]
    });

    return divSelect;
}