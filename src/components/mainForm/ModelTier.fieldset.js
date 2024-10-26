import Fieldset from "../Fieldset";
import Radio from "../Radio";
import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import RadioGroup from "../RadioGroup";

export default function ModelTier()
{
    const STORAGE_KEY = "modelTier";
    const options = [
        "Low-poly",
        "Mid-poly",
        "High-poly"
    ];

    let selectedOption = getFromStorage(
        STORAGE_KEY,
        options[0]
    );

    const radioGroup = RadioGroup({});

    options.forEach(option => {

        radioGroup.addButton(
            Radio({
                name: STORAGE_KEY,
                onChange: (e) => {

                    selectedOption = e.target.value;
                    saveToStorage(STORAGE_KEY, selectedOption);
                },
                checked: selectedOption === option,
                text: option,
                value: option,
            })
        )
    });

    const fieldset = Fieldset({
        legend: "Model Tier",
        children: [
            radioGroup.element
        ]
    });

    function getData()
    {
        return selectedOption;
    }

    return { element: fieldset, getData: getData };
}