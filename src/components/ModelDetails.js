import label from "./label";
import textArea from "./textArea";
import div from "./div";

export default function ModelDetails()
{
    const lblModelDetails = label({
        for: "details",
        text: "Model Description",
        classes: ["label"]});

    const txtModelDetails = textArea({
        id: "details",
        placeholder:"Describe your model...", 
        classes: ["text-area"]});

    //parent card
    const divWrapper = div({
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