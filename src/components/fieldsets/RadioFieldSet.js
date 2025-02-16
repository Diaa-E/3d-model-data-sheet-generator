import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import AddCheckbox from "../AddCheckbox";
import Fieldset from "../Fieldset";
import Radio from "../Radio";
import RadioGroup from "../RadioGroup";
import { searchCaseInsensitive } from "../../utils/customArraySearch";
import { InvalidFieldsetException } from "../../utils/customExceptions";
import { showSuccessPopup } from "../../utils/popupEvents";

export default function RadioFieldset(props = {
    legend: "",
    hint: "",
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
        hint: "",
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

    // initial state
    const USER_OPTIONS_INIT = [];
    const SELECTED_OPTION_INIT = props.options[0];

    // fieldset state
    const options = props.options;
    let userOptions = props.enableUserOptions ? getFromStorage(STORAGE_KEY_USER, []) : null;
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
        hint: props.hint,
        required: props.required,
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
            const newOption = addOptionFieldset.getValue();

            if (newOption === "")
            {
                throw new InvalidFieldsetException(
                    `A new ${props.legend} option cannot be empty.`,
                    { invalidElement: inputField }
                );
            }
            else if (searchCaseInsensitive([...options, ...userOptions], newOption))
            {
                throw new InvalidFieldsetException(
                    `"${newOption}" already exists in ${props.legend}.`,
                    { invalidElement: inputField }
                );
            }

            fieldSet.setInvalid(false);
            radioGroup.addButton(
                Radio({
                    name: STORAGE_KEY,
                    checked: false,
                    text: newOption,
                    value: newOption,
                    userOption: true,
                    onChange: (e) => {

                        selectedOption = e.target.value,
                        saveToStorage(STORAGE_KEY, selectedOption);
                        fieldSet.setInvalid(false);
                    }
                })
            );
            userOptions.push(newOption);
            saveToStorage(STORAGE_KEY_USER, userOptions);
            showSuccessPopup({
                dispatchingElement: inputField,
                successMsg: `"${newOption}" has been added to ${props.legend}`
            });
            addOptionFieldset.clear();
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

    function reset()
    {
        userOptions = USER_OPTIONS_INIT;
        selectedOption = SELECTED_OPTION_INIT;

        saveToStorage(STORAGE_KEY, SELECTED_OPTION_INIT);
        if (props.enableUserOptions)
        {       
                saveToStorage(STORAGE_KEY_USER, USER_OPTIONS_INIT);
        }
    }

    return { element: fieldSet.element, getState: getState, validate: validate, reset: reset }
}