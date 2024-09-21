import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";

export default function Rigging()
{
    const STORAGE_KEY = "rigging";

    const data = getFromStorage(
        STORAGE_KEY,
        {
            rigging: {
                isRigged: false,
                isAnimated: false,
            }
        }
    );

    const riggedCheckbox = CheckBox({
        checked: data.rigging.isRigged,
        name: "rigged",
        text: "Rigged",
        value: "rigged",
        onChange: (e) => {
            
            data.rigging.isRigged = e.target.checked;
            saveToStorage(STORAGE_KEY, data);
        }
    });

    const animatedCheckbox = CheckBox({
        checked: data.rigging.isAnimated,
        name: "animated",
        text: "Animated",
        value: "animated",
        onChange: (e) => {

            data.rigging.isAnimated = e.target.checked;
            saveToStorage(STORAGE_KEY, data);
        }
    })

    const fieldSet = Fieldset({
        legend: "Rigging and Animation",
        children: [
            riggedCheckbox,
            animatedCheckbox,
        ]
    });

    return { element: fieldSet, }
}