import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import AddCheckbox from "../AddCheckbox";
import Fieldset from "../Fieldset";
import Radio from "../Radio";
import RadioGroup from "../RadioGroup";
import { searchCaseInsensitive } from "../../utils/customArraySearch";
import { InvalidFieldsetException } from "../../utils/customExceptions";
import { containsIllegalCharacters } from "../../utils/formattingTokens";
import Popup from "../Popup";
import ResetFieldsetButton from "../ResetFieldsetButton";

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
    let userOptions = props.enableUserOptions ? getFromStorage(STORAGE_KEY_USER, [...USER_OPTIONS_INIT]) : null;
    let selectedOption = getFromStorage(STORAGE_KEY, SELECTED_OPTION_INIT);

    // components
    const radioGroup = RadioGroup();

    const addOptionFieldset = props.enableUserOptions ? AddCheckbox({
        
        legend: props.userOptionLegend,
        onAdd: addOption,
        placeholder: props.userOptionPlaceholder
    }) : null;

    const resetButton = ResetFieldsetButton({
        fieldsetName: props.legend,
        onReset: reset
    });

    const fieldSet = Fieldset({
        legend: props.legend,
        hint: props.hint,
        required: props.required,
        children: props.enableUserOptions ? [
                resetButton.element,
                radioGroup.element,
                addOptionFieldset.element
            ] : [
                resetButton.element,
                radioGroup.element
            ]
    });

    load();

    function load()
    {
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
                }).element
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
                    }).element
                );
            });
        }
    }

    function addOption(inputField)
    {
        try
        {
            const newOption = addOptionFieldset.getValue();
            const illegalCharactersState = containsIllegalCharacters(newOption);

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
            else if (illegalCharactersState.status === true)
            {
                throw new InvalidFieldsetException(
                    `"${newOption}" contains invalid characters: "${illegalCharactersState.character}".`,
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
                }).element
            );
            userOptions.push(newOption);
            saveToStorage(STORAGE_KEY_USER, userOptions);
            Popup({
                error: false,
                lastFocusedElement: inputField,
                msg: `"${newOption}" has been added to ${props.legend}`,
                showScrollToField: false
            }).open();
            addOptionFieldset.clear();
            fieldSet.setInvalid(false);
        }
        catch (error)
        {
            if (error instanceof InvalidFieldsetException)
            {
                fieldSet.setInvalid(true);
    
                Popup({
                    error: true,
                    lastFocusedElement: inputField,
                    msg: "Field Cannot be empty.",
                    showScrollToField: true,
                }).open();
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
        selectedOption = SELECTED_OPTION_INIT;
        saveToStorage(STORAGE_KEY, SELECTED_OPTION_INIT);

        if (props.enableUserOptions)
        {       
            userOptions = USER_OPTIONS_INIT;
            saveToStorage(STORAGE_KEY_USER, USER_OPTIONS_INIT);
        }

        radioGroup.removeAllButtons();
        load();
    }

    return { element: fieldSet.element, getState: getState, validate: validate, reset: reset }
}