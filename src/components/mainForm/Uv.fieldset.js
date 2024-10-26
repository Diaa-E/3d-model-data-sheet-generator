import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import CheckBox from "../CheckBox";
import FieldSet from "../Fieldset";

export default function Uv()
{
    const STORAGE_KEY = "uv";

    const options = [
        "Non-overlapping",
        "Overlapping by Duplication",
        "Overlapping by Mirroring",
        "Overlapping by Extrusion",
    ];

    const selectedOptions = getFromStorage(
        STORAGE_KEY,
        []
    );

    const checkboxGroup = options.map(option => {

        return (
            CheckBox({
                name: STORAGE_KEY,
                text: option,
                value: option,
                checked: selectedOptions.includes(option),
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
                }
            })
        );
    });

    const fieldSet = FieldSet({
        legend: "UV Mapping",
        children: checkboxGroup
    });

    function getData()
    {
        return selectedOptions;
    }

    return { element: fieldSet, getData: getData }
}