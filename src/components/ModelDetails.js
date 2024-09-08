import Label from "./Label";
import TextArea from "./TextArea";
import Div from "./Div";

export default function ModelDetails()
{
    const lblModelDetails = Label({
        for: "details",
        text: "Model Description",
        classes: ["label"]});

    const txtModelDetails = TextArea({
        id: "details",
        placeholder:"Describe your model...", 
        classes: ["text-area"]});

    //parent card
    const divWrapper = Div({
        id: "modelDetails",
        classes: ["card"],
        children: [lblModelDetails, txtModelDetails.element]
    })

    function getData()
    {
        return {details: txtModelDetails.getContent()};
    }

    return {component: divWrapper, getData};
}