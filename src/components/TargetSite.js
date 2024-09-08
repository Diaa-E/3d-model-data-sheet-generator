"use strict";
import Div from "./Div";
import Label from "./Label";
import Radio from "./Radio";

export default function TargetSite() {
    const lblTitle = Label({
        text: "Target Website",
        classes: ["label"]
    });

    const websites = Radio({
        id: "websites",
        lblText: "Generate Sheet For",
        choices: [
            "CGTrader",
            "Sketchfab"
        ],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const divWrapper = Div({
        id: "targetSite",
        classes: ["card"],
        children: [
            lblTitle,
            websites.element
        ]
    });

    function getData() {
        return { target: websites.getSelected() };
    }

    return { component: divWrapper, getData };
}
