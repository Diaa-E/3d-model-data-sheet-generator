import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import Fieldset from "../Fieldset";
import TextArea from "../TextArea";
import TextInput from "../TextInput";

export default function ModelInfoFieldset(props = {storageKey: ""})
{
    props = {
        storageKey: "defaultKey",
        ...props
    };

    const STORAGE_KEY = props.storageKey;
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
        required: false,
        text: "Model Title",
        value: modelInfo.title
    });

    const descriptionField = TextArea({
        placeholder: "Model Description",
        text: "Model Description",
        value: modelInfo.description,
        onInput: (e) => {

            modelInfo.description = e.target.value;
            saveToStorage(STORAGE_KEY, modelInfo);
        }
    });

    const fieldSet = Fieldset({
        legend: "Model Information",
        children: [
            titleField.element,
            descriptionField
        ]
    });

    function getState()
    {
        return modelInfo;
    }

    function validate()
    {
        if (modelInfo.title === "")
        {
            fieldSet.setInvalid(true);
            throw new Error("Model title cannot be empty.");
        }
        else if (modelInfo.description === "")
        {
            fieldSet.setInvalid(true);
            throw new Error("Model description cannot be empty.");
        }

        fieldSet.setInvalid(false);
    }

    return {element: fieldSet.element, getState: getState, validate: validate};
}