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

    let selectedOption = getFromStorage(
        STORAGE_KEY,
        options[0]
    );

    const radioGroup = options.map(option => {

        return (
            Radio({
                name: STORAGE_KEY,
                onChange: (e) => {

                    selectedOption = e.target.value;
                    saveToStorage(STORAGE_KEY, selectedOption)
                },
                checked: selectedOption === option,
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
        return selectedOption;
    }

    return { element: fieldSet, getData: getData }
}