import domUtility from "../dom.utility";
import Button from "./Button";
import Div from "./Div";
import Label from "./Label";

export default function Select(options)
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
        divChoices.push(Button({
            text: options.choices[i],
            classes: [...options.optionClasses],
            clickFunction: selectChoice,
        }))

        if (i < options.minChoices)
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