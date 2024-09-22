import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import CheckBox from "../CheckBox";
import FieldsContainer from "../FieldsContainer";
import Fieldset from "../Fieldset";
import IconButton from "../IconButton";
import TextInput from "../TextInput";

export default function TextureWorkflow()
{
    const STORAGE_KEY = "textureWorkflow";

    const data = getFromStorage(
        STORAGE_KEY,
        {
            textureWorkflow: {
                "PBR Metallic Roughness": false,
                "PBR Specular Gloss": false,
                "Non-PBR": false,
            }
        }
    );

    const checkboxGroup = [];

    for (const key of Object.keys(data.textureWorkflow))
    {
        checkboxGroup.push(
            CheckBox({
                name: STORAGE_KEY,
                checked: data.textureWorkflow[key],
                onChange: (e) => {

                    data.textureWorkflow[e.target.value] = e.target.checked;
                    saveToStorage(STORAGE_KEY, data);
                },
                text: key,
                value: key,
            })
        );
    }

    const newTextureWorkflow = TextInput({
        autocomplete: "off",
        name: "newTextureWorkflow",
        onInput: () => {},
        placeholder: "New Texture Workflow",
        text: "New Texture Workflow",
        value: "",
    });

    const addButton = IconButton({

        color: "primary",
        onClick: addWorkflow,
        text: "Add texture workflow",
        type: "button",
    });

    const fieldsContainer = FieldsContainer({
        children: [
            newTextureWorkflow.element,
            addButton
        ]
    })

    const fieldSet = Fieldset({
        legend: "Texture Workflow",
        children: [
            fieldsContainer,
            ...checkboxGroup,
        ]
    });

    function addWorkflow()
    {
        data.textureWorkflow[newTextureWorkflow.getValue()] = false;
        saveToStorage(STORAGE_KEY, data);
        fieldSet.append(
            ...CheckBox({
                name: STORAGE_KEY,
                checked: data.textureWorkflow[newTextureWorkflow.getValue()],
                onChange: (e) => {

                    data.textureWorkflow[e.target.value] = e.target.checked;
                    saveToStorage(STORAGE_KEY, data);
                },
                text: newTextureWorkflow.getValue(),
                value: newTextureWorkflow.getValue(),
            })
        );
        newTextureWorkflow.clear();
    }

    return { element: fieldSet };
}