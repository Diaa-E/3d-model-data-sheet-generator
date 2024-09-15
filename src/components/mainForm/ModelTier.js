import Fieldset from "../Fieldset";
import Radio from "../Radio";
import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";

export default function ModelTier()
{
    const STORAGE_KEY = "modelTier";
    const options = [
        "Low-poly",
        "Mid-poly",
        "High-poly"
    ];

    const data = getFromStorage(
        STORAGE_KEY,
        {
            modelTier: options[0],
        }
    )

    const radioGroup = options.map(option => {

        return (
            Radio({
                name: "meshTier",
                onChange: (e) => {

                    data.modelTier = e.target.value;
                    saveToStorage(STORAGE_KEY, data)
                },
                checked: data.modelTier === option,
                text: option,
                value: option,
            })
        );
    });

    const fieldset = Fieldset({
        legend: "Model Tier",
        children: radioGroup
    });

    return { element: fieldset };
}