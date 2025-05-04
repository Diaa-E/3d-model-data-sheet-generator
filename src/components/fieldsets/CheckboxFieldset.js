import AddCheckbox from "../AddCheckbox";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";
import RadioGroup from "../RadioGroup";
import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import { showErrorPopup, showSuccessPopup} from "../../utils/popupEvents";
import { searchCaseInsensitive } from "../../utils/customArraySearch";
import { InvalidFieldsetException } from "../../utils/customExceptions";
import { containsIllegalCharacters } from "../../utils/formattingTokens";

export default function CheckboxFieldset(props = {
    legend: "",
    hint: "",
    storageKey: "",
    options: [],
    enableUserOptions: false,
    userOptionPlaceholder: "",
    userOptionLegend: "",
    required: false,
})
{
    props = {
        legend: "Checkbox Fieldset",
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

    // storage keys
    const STORAGE_KEY = props.storageKey;
    const STORAGE_KEY_USER = props.enableUserOptions ? `${STORAGE_KEY}_user` : null;

    // initial state values
    const USER_OPTIONS_INIT = [];
    const SELECTED_OPTIONS_INIT = [];

    // fieldset state
    const options = props.options;
    let userOptions = props.enableUserOptions ? getFromStorage(STORAGE_KEY_USER, USER_OPTIONS_INIT) : null;
    let selectedOptions = getFromStorage(STORAGE_KEY, SELECTED_OPTIONS_INIT);

    // components
    const checkboxGroup = RadioGroup();

    const addOptionFieldset = props.enableUserOptions ? AddCheckbox({

        legend: props.userOptionLegend,
        placeholder: props.userOptionPlaceholder,
        onAdd: addOption
    }) : null;

    const fieldSet = Fieldset({

        legend: props.legend,
        hint: props.hint,
        required: props.required,
        children: props.enableUserOptions ? [
            checkboxGroup.element,
            addOptionFieldset.element
        ] : [
            checkboxGroup.element
        ]
    });

    load();

    function load()
    {
        options.forEach(option => {

            checkboxGroup.addButton(
                CheckBox({
                    checked: selectedOptions.includes(option),
                    name: STORAGE_KEY,
                    text: option,
                    value: option,
                    onChange: (e) => {
    
                        if (e.target.checked)
                        {
                            selectedOptions.push(e.target.value);
                            saveToStorage(STORAGE_KEY, selectedOptions);
                            fieldSet.setInvalid(false);
                        }
                        else
                        {
                            selectedOptions.splice(selectedOptions.findIndex(item => item === option), 1);
                            saveToStorage(STORAGE_KEY, selectedOptions);
                            fieldSet.setInvalid(false);
                        }
                    },
                })
            );
        });
    
        if (props.enableUserOptions)
        {
            userOptions.forEach(option => {
        
                checkboxGroup.addButton(
                    CheckBox({
                        checked: selectedOptions.includes(option),
                        name: STORAGE_KEY,
                        text: option,
                        value: option,
                        userOption: true,
                        onChange: (e) => {
        
                            if (e.target.checked)
                            {
                                selectedOptions.push(e.target.value);
                                saveToStorage(STORAGE_KEY, selectedOptions);
                                fieldSet.setInvalid(false);
                            }
                            else
                            {
                                selectedOptions.splice(selectedOptions.findIndex(item => item === option), 1);
                                saveToStorage(STORAGE_KEY, selectedOptions);
                                fieldSet.setInvalid(false);
                            }
                        },
                    })
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
            checkboxGroup.addButton(
                CheckBox({
                    checked: false,
                    name: STORAGE_KEY,
                    text: newOption,
                    value: newOption,
                    userOption: true,
                    onChange: (e) => {

                        if (e.target.checked)
                        {
                            selectedOptions.push(e.target.value);
                            saveToStorage(STORAGE_KEY, selectedOptions);
                            fieldSet.setInvalid(false);
                        }
                        else
                        {
                            selectedOptions.splice(selectedOptions.findIndex(item => item === newOption), 1);
                            saveToStorage(STORAGE_KEY, selectedOptions);
                            fieldSet.setInvalid(false);
                        }
                    },
                })
            );
            userOptions.push(newOption);
            saveToStorage(STORAGE_KEY_USER, userOptions);
            showSuccessPopup({
                dispatchingElement: inputField,
                successMsg: `"${newOption}" has been added to ${props.legend}`,
            });
            addOptionFieldset.clear();
            fieldSet.setInvalid(false);
        }
        catch (error)
        {
            if (error instanceof InvalidFieldsetException)
            {
                fieldSet.setInvalid(true);
    
                showErrorPopup({
    
                    dispatchingElement: error.details.invalidElement,
                    errorMsg: error.message,
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
        return selectedOptions;
    }

    function validate()
    {
        if (props.required && selectedOptions.length < 1)
        {
            fieldSet.setInvalid(true);
            throw new InvalidFieldsetException(
                `${props.legend} must have at least 1 selected option.`,
                { invalidElement: fieldSet.element }
            );
        }

        fieldSet.setInvalid(false);
    }

    function reset()
    {
        selectedOptions = [...SELECTED_OPTIONS_INIT];
        saveToStorage(STORAGE_KEY, SELECTED_OPTIONS_INIT);

        if (props.enableUserOptions)
        {
            userOptions = [...USER_OPTIONS_INIT];
            saveToStorage(STORAGE_KEY_USER, USER_OPTIONS_INIT);
        }

        checkboxGroup.removeAllButtons();
        load();
    }

    return { element: fieldSet.element, getState: getState, validate: validate, reset: reset };
}