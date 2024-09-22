import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";
import IconButton from "../IconButton";
import MiniFieldset from "../MiniFieldset";
import TextInput from "../TextInput";

export default function TextureFormat()
{
    const STORAGE_KEY = "textureFormat";

    const data = getFromStorage(
        STORAGE_KEY,
        {
            textureFormat: {
                ".PNG": false,
                ".EXR": false,
                ".JPEG": false,
            }
        }
    );

    const checkboxGroup = [];

    for (const key of Object.keys(data.textureFormat))
    {
        checkboxGroup.push(

            CheckBox({
                name: STORAGE_KEY,
                checked: data.textureFormat[key],
                onChange: (e) => {

                    data.textureFormat[key] = e.target.checked;
                    saveToStorage(STORAGE_KEY, data);
                },
                text: key,
                value: key
            })
        );
    }

    const newTextureFormat = TextInput({
        autocomplete: "off",
        name: "newTextureFormat",
        onInput: () => {},
        placeholder: "New Texture Format",
        text: "New Texture Format",
        value: "",
    });

    const addButton = IconButton({
        color: "primary",
        onClick: addFormat,
        text: "Add texture format",
        type: "button",
    });

    const miniFieldset = MiniFieldset({
        legend: "Add a New Texture Format",
        children: [
            newTextureFormat.element,
            addButton
        ]
    })

    const fieldSet = Fieldset({
        legend: "Texture Format",
        children: [
            ...checkboxGroup,
            miniFieldset
        ]
    });

    function addFormat()
    {
        data.textureFormat[newTextureFormat.getValue()] = false;
        fieldSet.append(
            ...CheckBox({
                checked: data.textureFormat[newTextureFormat.getValue()],
                name: STORAGE_KEY,
                onChange: (e) => {

                    data.textureFormat[e.target.value] = e.target.checked;
                    saveToStorage(STORAGE_KEY, data);
                },
                text: newTextureFormat.getValue(),
                value: newTextureFormat.getValue()
            })
        );
        newTextureFormat.clear();
        saveToStorage(STORAGE_KEY, data);
    }

    return { element: fieldSet, };
}