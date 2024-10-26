import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import AddCheckbox from "../AddCheckbox";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";
import RadioGroup from "../RadioGroup";

export default function TextureWorkflow()
{
    const STORAGE_KEY = "textureWorkflow";
    const STORAGE_KEY_USER = `${STORAGE_KEY}_user`;

    const options = [
        "PBR Metallic Roughness",
        "PBR Specular Gloss",
        "Non-PBR",
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
                value: option,
            })
        );
    });

    const addWorkflowFieldset = AddCheckbox({
        legend: "Add a new texture workflow",
        onAdd: addWorkflow,
        placeholder: "New Texture Workflow"
    });

    const fieldSet = Fieldset({
        legend: "Texture Workflow",
        children: [
            checkboxGroup.element,
            addWorkflowFieldset.element,
        ]
    });

    function addWorkflow()
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
                        selectedOptions.splice(selectedOptions.findIndex(item => item === addWorkflowFieldset.getValue()), 1);
                        saveToStorage(STORAGE_KEY, selectedOptions);
                    }
                },
                text: addWorkflowFieldset.getValue(),
                value: addWorkflowFieldset.getValue(),
            })
        );
        userOptions.push(addWorkflowFieldset.getValue());
        addWorkflowFieldset.clear();
        saveToStorage(STORAGE_KEY_USER, userOptions);
    }

    return { element: fieldSet };
}