import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";

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

    const fieldSet = Fieldset({
        legend: "Texture Workflow",
        children: [
            ...checkboxGroup
        ]
    });

    return { element: fieldSet };
}