import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import Fieldset from "../Fieldset";
import Radio from "../Radio";

export default function EdgeSplit()
{
    const STORAGE_KEY = "edgeSplit";

    const options = [
        "None",
        "Sharp Edges",
        "Angle-based",
        "All Edges"
    ]

    let selectedOption = getFromStorage(
        STORAGE_KEY,
        options[0]
    );

    const radioGroup = options.map(option => {

        return (
            Radio({
                name: STORAGE_KEY,
                checked: selectedOption === option,
                text: option,
                value: option,
                onChange: (e) => {

                    selectedOption = e.target.value,
                    saveToStorage(STORAGE_KEY, selectedOption);
                }
            })
        );
    });

    const fieldSet = Fieldset({
        legend: "Edge Split",
        children: radioGroup
    });

    function getData()
    {
        return selectedOption;
    }

    return {element: fieldSet, getData: getData}
}