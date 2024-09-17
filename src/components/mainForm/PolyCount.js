import Fieldset from "../Fieldset";
import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import NumberInput from "../NumberInput";
import FieldsContainer from "../FieldsContainer";

export default function PolyCount()
{
    const STORAGE_KEY = "polyCount";
    const data = getFromStorage(
        STORAGE_KEY,
        {
            vertices: "",
            triangles: "",
        }
    );

    const verticesInput = NumberInput({
        name: "vertices",
        min: "0",
        onInput: (e) => {

            data.vertices = e.target.value;
            saveToStorage(STORAGE_KEY, data);
        },
        placeholder: "Number of Vertices",
        text: "Vertices",
        value: data.vertices
    });

    const trianglesInput = NumberInput({
        name: "triangles",
        min: "0",
        onInput: (e) => {

            data.triangles = e.target.value;
            saveToStorage(STORAGE_KEY, data);
        },
        placeholder: "Number of Triangles",
        text: "Triangles",
        value: data.triangles
    });

    const fieldsContainer = FieldsContainer({
        children: [
            verticesInput,
            trianglesInput,
        ]
    })

    const fieldSet = Fieldset({
        legend: "Polygon Count",
        children: [
            fieldsContainer
        ]
    });

    function getData()
    {
        return data;
    }

    return { element: fieldSet, getData: getData }
}