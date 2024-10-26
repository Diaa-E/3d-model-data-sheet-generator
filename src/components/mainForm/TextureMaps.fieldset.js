import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import AddCheckbox from "../AddCheckbox";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";
import RadioGroup from "../RadioGroup";

export default function TextureMaps()
{
    const STORAGE_KEY = "textureMaps";
    const STORAGE_KEY_USER = `${STORAGE_KEY}_user`;

    const options = [
        "Ambient Occlusion",
        "Base Color",
        "Base Color (RGB) + Opacity (Alpha)",
        "Albedo",
        "Albedo (RGB) + Opacity (Alpha)",
        "Emissive",
        "Glossiness",
        "Height/Bump",
        "ID Map",
        "Metallic",
        "Normal DX",
        "Normal GL",
        "Opacity",
        "Normal DX (RGB) + Height (Alpha)",
        "Normal GL (RGB) + Height (Alpha)",
        "Ambient Occlusion (R) + Roughness (G) + Metallic (B)",
        "Roughness",
        "Specular"
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
        )
    });

    const addTextureMapFieldset = AddCheckbox({
        legend: "Add a new texture map",
        onAdd: addTextureMap,
        placeholder: "New Texture Map"
    });
    
    const fieldSet = Fieldset({
        legend: "Texture Maps",
        children: [
            checkboxGroup.element,
            addTextureMapFieldset.element
        ]
    });

    function addTextureMap()
    {
        checkboxGroup.addButton(
            CheckBox({
                name: STORAGE_KEY,
                checked: false,
                onChange: (e) => {

                    if (e.target.checked)
                    {
                        selectedOptions.push(e.target.value);
                        saveToStorage(STORAGE_KEY, selectedOptions);
                    }
                    else
                    {
                        selectedOptions.splice(selectedOptions.findIndex(item => item === addTextureMapFieldset.getValue()), 1);
                        saveToStorage(STORAGE_KEY, selectedOptions);
                    }
                },
                text: addTextureMapFieldset.getValue(),
                value: addTextureMapFieldset.getValue(),
            })
        );
        userOptions.push(addTextureMapFieldset.getValue());
        addTextureMapFieldset.clear();
        saveToStorage(STORAGE_KEY_USER, userOptions)
    }

    return { element: fieldSet };
}