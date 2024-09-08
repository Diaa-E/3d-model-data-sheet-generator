import domUtility from "../dom.utility";
import Button from "./Button";
import Div from "./Div";
import Label from "./Label";

export default function Radio(options)
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
        divChoices.push(Button({
            text: options.choices[i],
            classes: [...options.optionClasses],
            clickFunction: selectChoice,
        }))

        if (i === options.defaultChoice)
        {
            domUtility.addClasses(divChoices[i], options.selectedClasses);
        }
    }

    const divChoicesContainer = Div({
        id: `${options.id}Choices`,
        classes: options.choiceClasses,
        children: [...divChoices]
    })

    const lbl = Label({
        text: options.lblText,
        classes: options.labelClasses
    })

    const divSelect = Div({
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