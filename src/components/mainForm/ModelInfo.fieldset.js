import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import Fieldset from "../Fieldset";
import TextArea from "../TextArea";
import TextInput from "../TextInput";

export default function ModelInfo()
{
    const STORAGE_KEY = "modelInfo";
    const modelInfo = getFromStorage(
        STORAGE_KEY,
        {
            title: "",
            description: ""
        }
    );

    const titleField = TextInput({
        autocomplete: "off",
        name: "modelTitle",
        onInput: (e) => {

            modelInfo.title = e.target.value;
            saveToStorage(STORAGE_KEY, modelInfo);
        },
        placeholder: "Model Title",
        required: true,
        text: "Title",
        value: modelInfo.title
    });

    const descriptionField = TextArea({
        placeholder: "Model Description",
        text: "Description",
        value: modelInfo.description,
        onInput: (e) => {

            modelInfo.description = e.target.value;
            saveToStorage(STORAGE_KEY, modelInfo);
        }
    });

    const fieldSet = Fieldset({
        legend: "Title and Description",
        children: [
            titleField.element,
            descriptionField
        ]
    });

    function getData()
    {
        return modelInfo;
    }

    return {element: fieldSet, getData: getData};
}