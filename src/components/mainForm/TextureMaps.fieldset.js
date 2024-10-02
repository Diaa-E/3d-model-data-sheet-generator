import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import AddCheckbox from "../AddCheckbox";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";
import RadioGroup from "../RadioGroup";

export default function TextureMaps()
{
    const STORAGE_KEY = "textureMaps";
    const data = getFromStorage(
        STORAGE_KEY,
        {
            textureMaps: {
                "Ambient Occlusion": false,
                "Base Color": false,
                "Base Color (RGB) + Opacity (Alpha)": false,
                "Albedo" : false,
                "Albedo (RGB) + Opacity (Alpha)": false,
                "Emissive": false,
                "Glossiness": false,
                "Height/Bump": false,
                "ID Map": false,
                "Metallic": false,
                "Normal DX": false,
                "Normal GL": false,
                "Opacity": false,
                "Normal DX (RGB) + Height (Alpha)": false,
                "Normal GL (RGB) + Height (Alpha)": false,
                "Ambient Occlusion (R) + Roughness (G) + Metallic (B)": false,
                "Roughness": false,
                "Specular": false
            }
        }
    );

    const checkboxGroup = RadioGroup({});

    for (const key of Object.keys(data.textureMaps))
    {
        checkboxGroup.addButton(
            CheckBox({
                name: STORAGE_KEY,
                checked: data.textureMaps[key],
                onChange: (e) => {

                    data.textureMaps[key] = e.target.checked;
                    saveToStorage(STORAGE_KEY, data);
                },
                text: key,
                value: key
            })
        );
    }

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
        data.textureMaps[addTextureMapFieldset.getValue()] = false;
        saveToStorage(STORAGE_KEY, data);
        checkboxGroup.addButton(
            CheckBox({
                name: STORAGE_KEY,
                checked: data.textureMaps[addTextureMapFieldset.getValue()],
                onChange: (e) => {

                    data.textureMaps[e.target.value] = e.target.checked;
                    saveToStorage(STORAGE_KEY, data);
                },
                text: addTextureMapFieldset.getValue(),
                value: addTextureMapFieldset.getValue(),
            })
        );
        addTextureMapFieldset.clear();
    }

    return { element: fieldSet };
}