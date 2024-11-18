import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import AddCheckbox from "../AddCheckbox";
import Fieldset from "../Fieldset";
import Radio from "../Radio";
import RadioGroup from "../RadioGroup";

export default function RadioFieldset(props = {
    legend: "",
    storageKey: "",
    options: [],
    enableUserOptions: false,
    userOptionPlaceholder: "",
    userOptionLegend: ""
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
        ...props
    };

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

    if (props.enableUserOptions)
    {
        [...options, ...userOptions].forEach(option => {

            radioGroup.addButton(
                Radio({
                    name: STORAGE_KEY,
                    checked: selectedOption === option,
                    text: option,
                    value: option,
                    onChange: (e) => {
    
                        selectedOption = e.target.value,
                        saveToStorage(STORAGE_KEY, selectedOption);
                    }
                })
            );
        });
    }
    else
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
                    }
                })
            );
        });
    }

    function addOption()
    {
        radioGroup.addButton(
            Radio({
                name: STORAGE_KEY,
                checked: false,
                text: addOptionFieldset.getValue(),
                value: addOptionFieldset.getValue(),
                onChange: (e) => {

                    selectedOption = e.target.value,
                    saveToStorage(STORAGE_KEY, selectedOption);
                }
            })
        );
        userOptions.push(addOptionFieldset.getValue());
        addOptionFieldset.clear();
        saveToStorage(STORAGE_KEY_USER, userOptions);
    }

    function getState()
    {
        return selectedOption;
    }

    return { element: fieldSet, getState: getState }
}