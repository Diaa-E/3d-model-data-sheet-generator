import ItemCheckBox from "../ItemCheckbox";
import AddCheckbox from "../AddCheckbox";
import Fieldset from "../Fieldset";
import RadioGroup from "../RadioGroup";
import icons from "../../barrels/icons.barrel";
import { saveToStorage, getFromStorage } from "../../utils/sesionStorageUtility";
import { searchCaseInsensitive } from "../../utils/customArraySearch";
import { showErrorPopup, showSuccessPopup } from "../../utils/popupEvents";
import { InvalidFieldsetException } from "../../utils/customExceptions";

export default function ItemCheckBoxFieldset(props = {
    legend: "",
    hint: "",
    storageKey: "",
    itemIcon: "",
    addItemLegend: "",
    addItemPlaceholder: "",
    required: false,
})
{
    props = {
        legend: "Item Checkbox Fieldset",
        hint: "",
        storageKey: "defaultKey",
        itemIcon: icons.defaultIcon,
        addItemLegend: "New Item",
        addItemPlaceholder: "Add a New Item",
        required: false,
        ...props
    };

    // storage keys
    const STORAGE_KEY = props.storageKey;
    const STORAGE_KEY_USER = `${STORAGE_KEY}_user`;

    // initial state
    const ITEMS_INIT = [];
    const SELECTED_ITEMS_INIT = [];

    // fieldset state
    let items = getFromStorage(STORAGE_KEY_USER, []);
    let selectedItems = getFromStorage(STORAGE_KEY, []);

    // components
    const checkboxGroup = RadioGroup();

    const addItemFieldset = AddCheckbox({
        legend: props.addItemLegend,
        placeholder: props.addItemPlaceholder,
        onAdd: addItem
    });

    const fieldSet = Fieldset({

        legend: props.legend,
        hint: props.hint,
        required: props.required,
        children: [
            checkboxGroup.element,
            addItemFieldset.element
        ]
    });

    items.forEach(item => {

        checkboxGroup.addButton(
            ItemCheckBox({
                checked: selectedItems.includes(item),
                name: STORAGE_KEY,
                text: item,
                value: item,
                itemIcon: props.itemIcon,
                onChange: (e) => {

                    if (e.target.checked)
                    {
                        selectedItems.push(e.target.value);
                        saveToStorage(STORAGE_KEY, selectedItems);
                        fieldSet.setInvalid(false);
                    }
                    else
                    {
                        selectedItems.splice(selectedItems.findIndex(item => item === item), 1);
                        saveToStorage(STORAGE_KEY, selectedItems);
                        fieldSet.setInvalid(false);
                    }
                },
            })
        );
    });

    function addItem(inputField)
    {
        try
        {
            const newItem = addItemFieldset.getValue();

            if (newItem === "")
            {
                throw new InvalidFieldsetException(
                    `A new ${props.legend} item cannot be empty.`,
                    { invalidElement: inputField }
                );
            }
            else if (searchCaseInsensitive(items, newItem))
            {
                throw new InvalidFieldsetException(
                    `"${newItem}" already exists in ${props.legend}.`,
                    { invalidElement: inputField }
                );
            }

            fieldSet.setInvalid(false);
            checkboxGroup.addButton(
                ItemCheckBox({
                    checked: true,
                    name: STORAGE_KEY,
                    text: newItem,
                    value: newItem,
                    itemIcon: props.itemIcon,
                    onChange: (e) => {

                        if (e.target.checked)
                        {
                            selectedItems.push(e.target.value);
                            saveToStorage(STORAGE_KEY, selectedItems);
                            fieldSet.setInvalid(false);
                        }
                        else
                        {
                            selectedItems.splice(selectedItems.findIndex(item => item === newItem), 1);
                            saveToStorage(STORAGE_KEY, selectedItems);
                            fieldSet.setInvalid(false);
                        }
                    },
                })
            );
            items.push(newItem);
            selectedItems.push(newItem);
            saveToStorage(STORAGE_KEY_USER, items);
            saveToStorage(STORAGE_KEY, selectedItems);
            showSuccessPopup({
                dispatchingElement: inputField,
                successMsg: `"${newItem}" has been added to ${props.legend}`
            });
            addItemFieldset.clear();
            fieldSet.setInvalid(false); 
        }
        catch (error)
        {
            if (error instanceof InvalidFieldsetException)
            {
                fieldSet.setInvalid(true);

                showErrorPopup({
    
                    dispatchingElement: error.details.invalidElement,
                    errorMsg: error.message
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
        return selectedItems;
    }

    function validate()
    {
        if (props.required && selectedItems.length < 1)
        {
            fieldSet.setInvalid(true);
            throw new InvalidFieldsetException(
                `${props.legend} must have at least 1 visible item.`,
                { invalidElement: fieldSet.element }
            );
        }

        fieldSet.setInvalid(false);
    }

    function reset()
    {
        items = ITEMS_INIT;
        selectedItems = SELECTED_ITEMS_INIT;

        saveToStorage(STORAGE_KEY_USER, ITEMS_INIT);
        saveToStorage(STORAGE_KEY, SELECTED_ITEMS_INIT);
    }

    return { element: fieldSet.element, getState: getState, validate: validate, reset: reset };
}