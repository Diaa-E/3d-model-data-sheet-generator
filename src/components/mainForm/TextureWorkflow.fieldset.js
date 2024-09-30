import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import AddCheckbox from "../AddCheckbox";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";
import RadioGroup from "../RadioGroup";

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

    const radioGroup = RadioGroup({});

    for (const key of Object.keys(data.textureWorkflow))
    {
        radioGroup.addButton(
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

    const addWorkflowFieldset = AddCheckbox({
        legend: "Add a new texture workflow",
        onAdd: addWorkflow,
        placeholder: "New Texture Workflow"
    })

    const fieldSet = Fieldset({
        legend: "Texture Workflow",
        children: [
            radioGroup.element,
            addWorkflowFieldset.element,
        ]
    });

    function addWorkflow()
    {
        data.textureWorkflow[addWorkflowFieldset.getValue()] = false;
        saveToStorage(STORAGE_KEY, data);
        radioGroup.addButton(
            CheckBox({
                name: STORAGE_KEY,
                checked: data.textureWorkflow[addWorkflowFieldset.getValue()],
                onChange: (e) => {

                    data.textureWorkflow[e.target.value] = e.target.checked;
                    saveToStorage(STORAGE_KEY, data);
                },
                text: addWorkflowFieldset.getValue(),
                value: addWorkflowFieldset.getValue(),
            })
        );
        addWorkflowFieldset.clear();
    }

    return { element: fieldSet };
}