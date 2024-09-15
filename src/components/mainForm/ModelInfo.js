import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import Fieldset from "../Fieldset";
import TextArea from "../TextArea";
import TextInput from "../TextInput";

export default function ModelInfo()
{
    const STORAGE_KEY = "modelInfo";
    const data = getFromStorage(
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

            data.title = e.target.value;
            saveToStorage(STORAGE_KEY, data);
        },
        placeholder: "Model Title",
        required: true,
        text: "Title",
        value: data.title
    });

    const descriptionField = TextArea({
        placeholder: "Model Description",
        text: "Description",
        value: data.description,
        onInput: (e) => {

            data.description = e.target.value;
            saveToStorage(STORAGE_KEY, data);
        }
    });

    const fieldSet = Fieldset({
        legend: "Title and Description",
        children: [
            titleField,
            descriptionField
        ]
    });

    function getData()
    {
        return data;
    }

    return {element: fieldSet, getData: getData};
}