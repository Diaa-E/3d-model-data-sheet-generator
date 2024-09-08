import Radio from "./Radio";
import Label from "./Label";
import Div from "./Div";

export default function MeshDetails()
{
    const lblTitle = Label({
        text: "Mesh Details",
        classes: ["label"]
    });
    const meshType = Radio({
        id: "meshType",
        lblText: "Mesh Type",
        choices: [
            "Polygon Mesh",
            "Triangulated Polygon Mesh",
            "Quad Mesh"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const polyTier = Radio({
        id: "polyTier",
        lblText: "Polycount Tier",
        choices: [
            "Lowpoly",
            "Highpoly"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const gameReady = Radio({
        id: "gameready",
        lblText: "Model is game-ready",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const subdivision = Radio({
        id: "subdivision",
        lblText: "Model is subdivision-ready",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const edgeSplit = Radio({
        id: "edgeSplit",
        lblText: "Edge splits",
        choices: [
            "Sharp edges only",
            "All edges",
            "Based on angle",
            "None"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const realWorldScale = Radio({
        id: "realWorldScale",
        lblText: "Model is scaled to real world dimensions",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const rigged = Radio({
        id: "rigged",
        lblText: "Model is rigged",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const divWrapper = Div({
        id: "meshDetails",
        classes: ["card"],
        children: [
            lblTitle,
            meshType.element,
            polyTier.element,
            gameReady.element,
            subdivision.element,
            edgeSplit.element,
            realWorldScale.element,
            rigged.element]
    });

    function getData()
    {
        return {
            meshType: meshType.getSelected(),
            polyTier: polyTier.getSelected(),
            gameReady: gameReady.getSelected(),
            subdivision: subdivision.getSelected(),
            edgeSplit: edgeSplit.getSelected(),
            realWorldScale: realWorldScale.getSelected(),
            rigged: rigged.getSelected(),
        }
    }

    return {component: divWrapper, getData};
}