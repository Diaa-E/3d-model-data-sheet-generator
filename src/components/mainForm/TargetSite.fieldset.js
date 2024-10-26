import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import Fieldset from "../Fieldset";
import Radio from "../Radio";
import RadioGroup from "../RadioGroup";

export default function TargetSite()
{
    const STORAGE_KEY = "targetSite";

    const options = [
        "None",
        "Fab",
        "CGTrader",
        "Sketchfab"
    ];

    let seletedOption = getFromStorage(
        STORAGE_KEY,
        options[0]
    );

    const radioGroup = RadioGroup({
        buttons: options.map(option => {
            return (
                Radio({
                    checked: seletedOption === option,
                    name: STORAGE_KEY,
                    text: option,
                    value: option,
                    onChange: (e) => {
                        seletedOption = e.target.value;
                        saveToStorage(STORAGE_KEY, seletedOption);
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