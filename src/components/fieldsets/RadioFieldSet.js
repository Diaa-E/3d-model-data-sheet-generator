import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import AddCheckbox from "../AddCheckbox";
import Fieldset from "../Fieldset";
import Radio from "../Radio";
import RadioGroup from "../RadioGroup";
import { searchCaseInsensitive } from "../../utils/customArraySearch";
import { InvalidFieldsetException } from "../../utils/customExceptions";

export default function RadioFieldset(props = {
    legend: "",
    storageKey: "",
    options: [],
    enableUserOptions: false,
    userOptionPlaceholder: "",
    userOptionLegend: "",
    required: false
})
{
    props = {
        legend: "Radio Fieldset",
        storageKey: "defaultKey",
        options: [
            "option1",
            "option2",
        ],
        enableUserOptions: false,
        userOptionPlaceholder: "New Option",
        userOptionLegend: "Add a New Option",
        required: false,
        ...props
    };

    if (!Array.isArray(props.options))
    {
        throw new Error("Options must be an array.");
    }
    else if (props.options.length === 0)
    {
        throw new Error("Options array must contain at least 1 element.");
    }

    // storage keys
    const STORAGE_KEY = props.storageKey;
    const STORAGE_KEY_USER = props.enableUserOptions ? `${STORAGE_KEY}_user` : null;

    // fieldset state
    const options = props.options;
    const userOptions = props.enableUserOptions ? getFromStorage(STORAGE_KEY_USER, []) : null;
    let selectedOption = getFromStorage(STORAGE_KEY, options[0]);

    // components
    const radioGroup = RadioGroup();

    const addOptionFieldset = props.enableUserOptions ? AddCheckbox({
        
        legend: props.userOptionLegend,
        onAdd: addOption,
        placeholder: props.userOptionPlaceholder
    }) : null;

    const fieldSet = Fieldset({
        legend: props.legend,
        children: props.enableUserOptions ? [
                radioGroup.element,
                addOptionFieldset.element
            ] : [
                radioGroup.element
            ]
    });

    options.forEach(option => {

        radioGroup.addButton(
            Radio({
                name: STORAGE_KEY,
                checked: selectedOption === option,
                text: option,
                value: option,
                onChange: (e) => {

                    selectedOption = e.target.value,
                    saveToStorage(STORAGE_KEY, selectedOption);
                    fieldSet.setInvalid(false);
                }
            })
        );
    });

    if (props.enableUserOptions)
    {
        userOptions.forEach(option => {

            radioGroup.addButton(
                Radio({
                    name: STORAGE_KEY,
                    checked: selectedOption === option,
                    text: option,
                    value: option,
                    userOption: true,
                    onChange: (e) => {
    
                        selectedOption = e.target.value,
                        saveToStorage(STORAGE_KEY, selectedOption);
                        fieldSet.setInvalid(false);
                    }
                })
            );
        });
    }
    

    function addOption(inputField)
    {
        try
        {
            if (addOptionFieldset.getValue() === "")
            {
                throw new InvalidFieldsetException(
                    "Field cannot be empty.",
                    { invalidElement: inputField }
                );
            }
            else if (searchCaseInsensitive([...options, ...userOptions], addOptionFieldset.getValue()))
            {
                throw new InvalidFieldsetException(
                    "This option already exists.",
                    { invalidElement: inputField }
                );
            }

            fieldSet.setInvalid(false);
            radioGroup.addButton(
                Radio({
                    name: STORAGE_KEY,
                    checked: false,
                    text: addOptionFieldset.getValue(),
                    value: addOptionFieldset.getValue(),
                    userOption: true,
                    onChange: (e) => {

                        selectedOption = e.target.value,
                        saveToStorage(STORAGE_KEY, selectedOption);
                        fieldSet.setInvalid(false);
                    }
                })
            );
            userOptions.push(addOptionFieldset.getValue());
            addOptionFieldset.clear();
            saveToStorage(STORAGE_KEY_USER, userOptions);
            fieldSet.setInvalid(false);
        }
        catch (error)
        {
            if (error instanceof InvalidFieldsetException)
            {
                fieldSet.setInvalid(true);
    
                dispatchErrorPopupEvent({
        
                    dispatchingElement: inputField,
                    errorMsg: "Field Cannot be empty."
                });
            }
            else
            {
                throw error;
            }
        }
    }

    function getState()
    {
        return selectedOption;
    }

    function validate()
    {
        if (props.required && !selectedOption)
        {
            fieldSet.setInvalid(true);
            throw new InvalidFieldsetException(
                `${props.legend} must have at least one selected option.`,
                { invalidElement: fieldSet.element }
            );
        }

        fieldSet.setInvalid(false);
    }

    return { element: fieldSet.element, getState: getState, validate: validate }
}