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

    const data = getFromStorage(
        STORAGE_KEY,
        {
            uv: []
        }
    );

    const checkboxGroup = options.map(option => {

        return (
            CheckBox({
                name: "uv",
                text: option,
                value: option,
                checked: data.uv.findIndex(item => item === option) > -1,
                onChange: (e) => {

                    if (e.target.checked)
                    {
                        data.uv.push(e.target.value);
                        saveToStorage(STORAGE_KEY, data);
                    }
                    else
                    {
                        data.uv.splice(data.uv.findIndex(item => item === option), 1);
                        saveToStorage(STORAGE_KEY, data);
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
        return data;
    }

    return { element: fieldSet, getData: getData }
}