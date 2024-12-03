import Fieldset from "../Fieldset";
import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import NumberInput from "../NumberInput";
import FieldsContainer from "../FieldsContainer";

export default function PolyCountFieldset(props = {storageKey: ""})
{
    props = {
        storageKey: "defaultKey",
        ...props
    };

    const STORAGE_KEY = props.storageKey;
    const polyCount = getFromStorage(
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

            polyCount.vertices = e.target.value;
            saveToStorage(STORAGE_KEY, polyCount);
        },
        placeholder: "Number of Vertices",
        text: "Vertices",
        value: polyCount.vertices
    });

    const trianglesInput = NumberInput({
        name: "triangles",
        min: "0",
        onInput: (e) => {

            polyCount.triangles = e.target.value;
            saveToStorage(STORAGE_KEY, polyCount);
        },
        placeholder: "Number of Triangles",
        text: "Triangles",
        value: polyCount.triangles
    });

    const fieldsContainer = FieldsContainer({
        children: [
            verticesInput.element,
            trianglesInput.element,
        ]
    })

    const fieldSet = Fieldset({
        legend: "Polygon Count",
        children: [
            fieldsContainer
        ]
    });

    function getState()
    {
        return polyCount;
    }

    return { element: fieldSet.element, getState: getState }
}