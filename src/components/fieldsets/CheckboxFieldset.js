import AddCheckbox from "../AddCheckbox";
import CheckBox from "../CheckBox";
import Fieldset from "../Fieldset";
import RadioGroup from "../RadioGroup";
import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import { showErrorPopup} from "../../utils/errorPopupEvents";
import { searchCaseInsensitive } from "../../utils/customArraySearch";
import { InvalidFieldsetException } from "../../utils/customExceptions";

export default function CheckboxFieldset(props = {
    legend: "",
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

    // fieldset state
    const options = props.options;
    const userOptions = props.enableUserOptions ? getFromStorage(STORAGE_KEY_USER, []) : null;
    const selectedOptions = getFromStorage(STORAGE_KEY, []);

    // components
    const checkboxGroup = RadioGroup();

    const addOptionFieldset = props.enableUserOptions ? AddCheckbox({

        legend: props.userOptionLegend,
        placeholder: props.userOptionPlaceholder,
        onAdd: addOption
    }) : null;

    const fieldSet = Fieldset({

        legend: props.legend,
        children: props.enableUserOptions ? [
            checkboxGroup.element,
            addOptionFieldset.element
        ] : [
            checkboxGroup.element
        ]
    });

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

    function addOption(inputField)
    {
        try
        {
            if (addOptionFieldset.getValue() === "")
            {
                throw new InvalidFieldsetException(
                    "Field Cannot be empty.",
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
            checkboxGroup.addButton(
                CheckBox({
                    checked: false,
                    name: STORAGE_KEY,
                    text: addOptionFieldset.getValue(),
                    value: addOptionFieldset.getValue(),
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
                            selectedOptions.splice(selectedOptions.findIndex(item => item === addOptionFieldset.getValue()), 1);
                            saveToStorage(STORAGE_KEY, selectedOptions);
                            fieldSet.setInvalid(false);
                        }
                    },
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

    return { element: fieldSet.element, getState: getState, validate: validate };
}