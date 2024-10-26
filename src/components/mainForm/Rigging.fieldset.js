import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";

export default function Rigging()
{
    const STORAGE_KEY = "rigging";

    const options = [
        "Rigged",
        "Animated"
    ];

    const selectedOptions = getFromStorage(
        STORAGE_KEY,
        []
    );

    const checkboxGroup = options.map(option => {

        return (
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

    const fieldSet = Fieldset({
        legend: "Rigging and Animation",
        children: [
            checkboxGroup
        ]
    });

    return { element: fieldSet, }
}