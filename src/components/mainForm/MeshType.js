import Fieldset from "../Fieldset";
import Radio from "../Radio";
import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";

export default function MeshType()
{
    const STORAGE_KEY = "meshType";
    const options = [
        "Non-unifrom Polygons",
        "Triangulated Mesh",
        "Quad Mesh",
        "Quad Mesh (Subdivision Ready)",
    ];

    const data = getFromStorage(
        STORAGE_KEY,
        {
            meshType: options[0],
        }
    );

    const radioGroup = options.map(option => {

        return (
            Radio({
                name: "meshType",
                onChange: (e) => {

                    data.meshType = e.target.value;
                    saveToStorage(STORAGE_KEY, data)
                },
                checked: data.meshType === option,
                text: option,
                value: option,
            })
        );
    });

    const fieldSet = Fieldset({
        legend: "Mesh Type",
        children: radioGroup
    });

    function getData()
    {
        return data;
    }

    return { element: fieldSet, getData: getData }
}