import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import AddCheckbox from "../AddCheckbox";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";
import RadioGroup from "../RadioGroup";

export default function TextureFormat()
{
    const STORAGE_KEY = "textureFormat";
    const STORAGE_KEY_USER = `${STORAGE_KEY}_user`;

    const options = [
        ".PNG",
        ".JPEG",
        ".EXR",
    ];

    const userOptions = getFromStorage(
        STORAGE_KEY_USER,
        []
    );

    const selectedOptions = getFromStorage(
        STORAGE_KEY,
        []
    );

    const checkboxGroup = RadioGroup({});

    [...options, ...userOptions].forEach(option => {

        checkboxGroup.addButton(
            CheckBox({
                checked: selectedOptions.includes(option),
                name: STORAGE_KEY,
                onChange: (e) => {

                    if (e.target.checked)
                    {
                        selectedOptions.push(e.target.value);
                        saveToStorage(STORAGE_KEY, selectedOptions);
                    }
                    else
                    {
                        selectedOptions.splice(selectedOptions.findIndex(item => item === option), 1);
                        saveToStorage(STORAGE_KEY, selectedOptions);
                    }
                },
                text: option,
                value: option
            })
        );
    });
    
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
        checkboxGroup.addButton(
            CheckBox({
                checked: false,
                name: STORAGE_KEY,
                onChange: (e) => {

                    if (e.target.checked)
                    {
                        selectedOptions.push(e.target.value);
                        saveToStorage(STORAGE_KEY, selectedOptions);
                    }
                    else
                    {
                        selectedOptions.splice(selectedOptions.findIndex(item => item === addTextureFormat.getValue()), 1);
                        saveToStorage(STORAGE_KEY, selectedOptions);
                    }
                },
                text: addTextureFormat.getValue(),
                value: addTextureFormat.getValue()
            })
        );
        userOptions.push(addTextureFormat.getValue());
        addTextureFormat.clear();
        saveToStorage(STORAGE_KEY_USER, userOptions);
    }

    return { element: fieldSet, };
}