import domUtility from "../dom.utility";
import button from "./button";
import div from "./div";
import label from "./label";

export default function radio(options)
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