import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import { v4 as generateId } from "uuid";
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

    const data = getFromStorage(
        STORAGE_KEY,
        {
            edgeSplit: options[0],
        }
    );

    const radioGroup = options.map(option => {

        return (
            Radio({
                name: "edgeSplit",
                checked: data.edgeSplit === option,
                text: option,
                value: option,
                onChange: (e) => {

                    data.edgeSplit = e.target.value,
                    saveToStorage(STORAGE_KEY, data);
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
        return data;
    }

    return {element: fieldSet, getData: getData}
}