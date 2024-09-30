import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import AddCheckbox from "../AddCheckbox";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";
import RadioGroup from "../RadioGroup";

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

    const checkboxGroup = RadioGroup({});

    for (const key of Object.keys(data.textureFormat))
    {
        checkboxGroup.addButton(
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
    
    const addTextureFormat = AddCheckbox({
        legend: "Add a new texture format",
        onAdd: addFormat,
        placeholder: "New Texture Format"
    });

    const fieldSet = Fieldset({
        legend: "Texture Format",
        children: [
            checkboxGroup.element,
            addTextureFormat.element,
        ]
    });

    function addFormat()
    {
        data.textureFormat[addTextureFormat.getValue()] = false;
        checkboxGroup.addButton(
            CheckBox({
                checked: data.textureFormat[addTextureFormat.getValue()],
                name: STORAGE_KEY,
                onChange: (e) => {

                    data.textureFormat[e.target.value] = e.target.checked;
                    saveToStorage(STORAGE_KEY, data);
                },
                text: addTextureFormat.getValue(),
                value: addTextureFormat.getValue()
            })
        );
        addTextureFormat.clear();
        saveToStorage(STORAGE_KEY, data);
    }

    return { element: fieldSet, };
}