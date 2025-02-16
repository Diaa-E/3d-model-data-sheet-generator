import { InvalidFieldsetException } from "../../utils/customExceptions";
import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import Fieldset from "../Fieldset";
import TextArea from "../TextArea";
import TextInput from "../TextInput";

export default function ModelInfoFieldset(props = {storageKey: ""})
{
    props = {
        storageKey: "defaultKey",
        ...props
    };

    const STATE_INIT = {
        title: "",
        description: ""
    };

    const STORAGE_KEY = props.storageKey;
    let state = getFromStorage(STORAGE_KEY, STATE_INIT);

    const titleField = TextInput({
        autocomplete: "off",
        name: "modelTitle",
        onInput: (e) => {

            state.title = e.target.value;
            saveToStorage(STORAGE_KEY, state);
            fieldSet.setInvalid(false);
        },
        placeholder: "Model Title",
        required: false,
        text: "Model Title",
        value: state.title
    });

    const descriptionField = TextArea({
        placeholder: "Model Description",
        text: "Model Description",
        value: state.description,
        onInput: (e) => {

            state.description = e.target.value;
            saveToStorage(STORAGE_KEY, state);
            fieldSet.setInvalid(false);
        }
    });

    const fieldSet = Fieldset({
        legend: "Model Information",
        required: true,
        children: [
            titleField.element,
            descriptionField.element
        ]
    });

    function getState()
    {
        return state;
    }

    function validate()
    {
        if (state.title === "")
        {
            fieldSet.setInvalid(true);
            throw new InvalidFieldsetException(
                "Model title cannot be empty.",
                { invalidElement: fieldSet.element }
            );
        }
        else if (state.description === "")
        {
            fieldSet.setInvalid(true);
            throw new InvalidFieldsetException(
                "Model description cannot be empty.",
                { invalidElement: fieldSet.element }
            );
        }

        fieldSet.setInvalid(false);
    }

    function reset()
    {
        state = STATE_INIT;
        
        saveToStorage(STORAGE_KEY, STATE_INIT);

        titleField.clear();
        descriptionField.clear();
    }

    return {element: fieldSet.element, getState: getState, validate: validate, reset: reset};
}