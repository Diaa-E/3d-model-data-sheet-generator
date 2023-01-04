"use strict";

import defaultIcon from "./icons/add.svg";
import domUtility from "./dom.utility";
export {label, textArea, iconButton, inputNumber, inputText, div, p, button, select, radio};

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
        errorMsg: "Invalid Input",
        ...options
    }

    const element = document.createElement("input");
    element.type = "number";
    element.name = options.name;
    options.min === "" ? null : element.min = options.min;
    options.max === "" ? null : element.max = options.max;
    element.id = options.id;
    element.required = options.required;
    element.placeholder = options.placeholder;

    domUtility.addClasses(element, options.classes);

    function getContent()
    {
        return element.value;
    }

    function isValid()
    {
        return element.checkValidity();
    }

    function getError()
    {
        return options.errorMsg;
    }

    return {element, getContent, isValid, getError};
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
        errorMsg: "Invalid Input",
        ...options
    }

    const element = document.createElement("input");
    element.name = options.name;
    element.id = options.id;
    options.maxLength === "" ? null : element.maxLength = options.maxLength;
    options.minLength === "" ? null : element.minLength = options.minLength;
    element.placeholder = options.placeholder;
    element.required = options.required;

    domUtility.addClasses(element, options.classes);

    function getContent()
    {
        return element.value;
    }

    function isValid()
    {
        return element.checkValidity();
    }

    function getError()
    {
        return options.errorMsg;
    }

    return {element, getContent, isValid, getError};
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

function select(options)
{
    options = {
        lblText: "Default text",
        id: "",
        Classes: [],
        choiceClasses: [],
        labelClasses: [],
        choices: ["Default option 1", "Default option 2"],
        selectedClasses: [],
        minChoices: 0,
        ...options
    }

    const divChoices = [];

    for (let i = 0; i < options.choices.length; i++)
    {
        divChoices.push(button({
            text: options.choices[i],
            classes: ["button-choice"],
            clickFunction: selectChoice,
        }))

        if (i < options.minChoices)
        {
            domUtility.addClasses(divChoices[i], options.selectedClasses);
        }
    }

    const divChoicesContainer = div({
        id: `${options.id}Choices`,
        classes: options.choiceClasses,
        children: [...divChoices]
    })

    const lbl = label({
        text: options.lblText,
        classes: options.labelClasses
    })

    const divSelect = div({
        id: options.id,
        classes: options.classes,
        children: [lbl, divChoicesContainer]
    });

    function selectChoice(e)
    {
        const allChoices = e.target.parentNode.children;
        
        if (options.minChoices === 0)
        {
            toggleSelected(e);
        }
        else
        {
            let currentSelected = 0;
            //count already selected choices
            for (let i = 0; i < allChoices.length; i++)
            {
                if (allChoices[i].classList.contains(options.selectedClasses[0]))
                {
                    currentSelected++;
                }
            }

            //if the user is trying to deselect below the minimum limit of selected choices
            if (!(e.target.classList.contains(options.selectedClasses[0])
                 && currentSelected === options.minChoices))
            {
                toggleSelected(e);
            }
        }
    }

    function toggleSelected(e)
    {
        if (e.target.classList.contains(options.selectedClasses[0]))
        {
            domUtility.removeClasses(e.target, options.selectedClasses);
        }
        else
        {
            domUtility.addClasses(e.target, options.selectedClasses);
        }
    }

    return divSelect;
}

function radio(options)
{
    options = {
        lblText: "Default text",
        id: "",
        Classes: [],
        choiceClasses: [],
        labelClasses: [],
        choices: ["Default option 1", "Default option 2"],
        selectedClasses: [],
        defaultChoice: 0,
        ...options
    }

    const divChoices = [];

    for (let i = 0; i < options.choices.length; i++)
    {
        divChoices.push(button({
            text: options.choices[i],
            classes: ["button-choice"],
            clickFunction: selectChoice,
        }))

        if (i === options.defaultChoice)
        {
            domUtility.addClasses(divChoices[i], options.selectedClasses);
        }
    }

    const divChoicesContainer = div({
        id: `${options.id}Choices`,
        classes: options.choiceClasses,
        children: [...divChoices]
    })

    const lbl = label({
        text: options.lblText,
        classes: options.labelClasses
    })

    const divSelect = div({
        id: options.id,
        classes: options.classes,
        children: [lbl, divChoicesContainer]
    });

    function selectChoice(e)
    {
        const allChoices = e.target.parentNode.children;
        
        for (let i = 0; i < allChoices.length; i++)
        {
            domUtility.removeClasses(allChoices[i], options.selectedClasses);
        }

        domUtility.addClasses(e.target, options.selectedClasses);
    }

    return divSelect;
}