import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import Fieldset from "../Fieldset";
import Radio from "../Radio";
import RadioGroup from "../RadioGroup";

export default function TargetSite()
{
    const STORAGE_KEY = "targetSite";

    const options = [
        "CGTrader",
        "Sketchfab"
    ];

    const data = getFromStorage(
        STORAGE_KEY,
        {
            TargetSite: options[0]
        }
    );

    const radioGroup = RadioGroup({
        buttons: options.map(option => {
            return (
                Radio({
                    checked: data.TargetSite === option,
                    name: STORAGE_KEY,
                    text: option,
                    value: option,
                    onChange: (e) => {
                        data.TargetSite = e.target.value;
                        saveToStorage(STORAGE_KEY, data);
                    }
                })
            );
        })
    });

    const fieldset = Fieldset({
        legend: "Target Website",
        children: [
            radioGroup.element
        ]
    });

    return { element: fieldset, }
}