import ItemCheckBox from "../ItemCheckbox";
import AddCheckbox from "../AddCheckbox";
import Fieldset from "../Fieldset";
import RadioGroup from "../RadioGroup";
import icons from "../../barrels/icons.barrel";
import { saveToStorage, getFromStorage } from "../../utils/sesionStorageUtility";
import { searchCaseInsensitive } from "../../utils/customArraySearch";

export default function ItemCheckBoxFieldset(props = {
    legend: "",
    storageKey: "",
    items: [],
    itemIcon: "",
    addItemLegend: "",
    addItemPlaceholder: "",
})
{
    props = {
        legend: "Item Checkbox Fieldset",
        storageKey: "defaultKey",
        items: [
            "item1",
            "item2",
        ],
        itemIcon: icons.defaultIcon,
        addItemLegend: "New Item",
        addItemPlaceholder: "Add a New Item",
        ...props
    };

    // storage keys
    const STORAGE_KEY = props.storageKey;

    // fieldset state
    const items = props.items;
    const selectedItems = getFromStorage(STORAGE_KEY, []);

    // components
    const checkboxGroup = RadioGroup();

    const addItemFieldset = AddCheckbox({
        legend: props.addItemLegend,
        placeholder: props.addItemPlaceholder,
        onAdd: addItem
    });

    const fieldSet = Fieldset({

        legend: props.legend,
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
                    }
                    else
                    {
                        selectedItems.splice(selectedItems.findIndex(item => item === item), 1);
                        saveToStorage(STORAGE_KEY, selectedItems);
                    }
                },
            })
        );
    });

    function addItem(invalidField)
    {
        if (addItemFieldset.getValue() === "")
        {
            dispatchErrorPopupEvent({

                dispatchingElement: invalidField,
                errorMsg: "Field Cannot be empty."
            });
            fieldSet.setInvalid(true);
            return;
        }
        else if (searchCaseInsensitive(items, addItemFieldset.getValue()))
        {
            dispatchErrorPopupEvent({

                dispatchingElement: invalidField,
                errorMsg: "This option already exists"
            });
            fieldSet.setInvalid(true);
            return;
        }

        fieldSet.setInvalid(false);
        checkboxGroup.addButton(
            ItemCheckBox({
                checked: false,
                name: STORAGE_KEY,
                text: addItemFieldset.getValue(),
                value: addItemFieldset.getValue(),
                itemIcon: props.itemIcon,
                onChange: (e) => {

                    if (e.target.checked)
                    {
                        selectedItems.push(e.target.value);
                        saveToStorage(STORAGE_KEY, selectedItems);
                    }
                    else
                    {
                        selectedItems.splice(selectedItems.findIndex(item => item === addItemFieldset.getValue()), 1);
                        saveToStorage(STORAGE_KEY, selectedItems);
                    }
                },
            })
        );
        items.push(addItemFieldset.getValue());
        addItemFieldset.clear();
        saveToStorage(STORAGE_KEY, items);
    }

    function getState()
    {
        return selectedItems;
    }

    return { element: fieldSet.element, getState: getState };
}