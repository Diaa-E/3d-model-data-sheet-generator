"use strict";

import domUtility from "./dom.utility";
export {div, p, button, select, radio};
import label from "./components/label";

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
        optionClasses: [],
        ...options
    }

    const divChoices = [];

    for (let i = 0; i < options.choices.length; i++)
    {
        divChoices.push(button({
            text: options.choices[i],
            classes: [...options.optionClasses],
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

    function getSelected()
    {
        const selected = [];

        for (let i = 0; i < divChoices.length; i++)
        {
            if (divChoices[i].classList.contains(options.selectedClasses[0]))
            {
                selected.push(divChoices[i].textContent);
            }
        }

        return selected;
    }

    return {element: divSelect, getSelected};
}

function radio(options)
{
    options = {
        lblText: "Default text",
        id: "",
        Classes: [],
        choiceClasses: [],
        optionClasses: [],
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
            classes: [...options.optionClasses],
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

    function getSelected()
    {
        for (let i = 0; i < divChoices.length; i++)
        {
            if (divChoices[i].classList.contains(options.selectedClasses[0]))
            {
                return divChoices[i].textContent;
            }
        }
    }

    return {element: divSelect, getSelected};
}