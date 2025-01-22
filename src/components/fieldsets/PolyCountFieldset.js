import Fieldset from "../Fieldset";
import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import NumberInput from "../NumberInput";
import FieldsContainer from "../FieldsContainer";
import { InvalidFieldsetException } from "../../utils/customExceptions";

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
            fieldSet.setInvalid(false);
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
            fieldSet.setInvalid(false);
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

    function validate()
    {
        if (isNaN(verticesInput.getValue()) || !verticesInput.getValue())
        {
            fieldSet.setInvalid(true);
            throw new InvalidFieldsetException(
                "Vertices count must be a number.",
                { invalidElement: fieldSet.element }
            );
        }
        else if (verticesInput.getValue().indexOf(".") !== -1)
        {
            fieldSet.setInvalid(true);
            throw new InvalidFieldsetException(
                "Vertices count cannot be a fraction.",
                { invalidElement: fieldSet.element }
            );
        }
        else if (isNaN(trianglesInput.getValue()) || !trianglesInput.getValue())
        {
            fieldSet.setInvalid(true);
            throw new InvalidFieldsetException(
                "Triangles count must be a number.",
                { invalidElement: fieldSet.element }
            );
        }
        else if (trianglesInput.getValue().indexOf(".") !== -1)
        {
            fieldSet.setInvalid(true);
            throw new InvalidFieldsetException(
                "Triangles count cannot be a fraction.",
                { invalidElement: fieldSet.element }
            );
        }

        fieldSet.setInvalid(false);
    }

    return { element: fieldSet.element, getState: getState, validate: validate }
}