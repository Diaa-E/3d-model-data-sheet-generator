import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import FieldsContainer from "../FieldsContainer";
import Fieldset from "../Fieldset";
import IconButton from "../IconButton";
import NumberInput from "../NumberInput";
import UnorderedList from "../UnorderedList";
import TextInput from "../TextInput";
import MiniFieldset from "../MiniFieldset";
import icons from "../../barrels/icons.barrel";

export default function ModelContentsFieldset(props = {storageKey: ""})
{
    props = {

        storageKey: "defaultKey",
        ...props,
    };

    const STORAGE_KEY = props.storageKey;

    let items = getFromStorage(
        STORAGE_KEY,
        []
    );

    const itemName = TextInput({
        autocomplete: "off",
        name: "itemName",
        onInput: () => {},
        placeholder: "Item Name",
        text: "Item Name",
        value: ""
    });

    const itemCount = NumberInput({
        max: "",
        min: "1",
        name: "itemCount",
        onInput: () => {},
        placeholder: "Item Count",
        text: "Item Count",
        value: ""
    });

    const fieldContainer = FieldsContainer({
        children: [
            itemName.element,
            itemCount.element,
        ]
    });

    const unorderedList = UnorderedList({

        addToData: addToState,
        removeFromData: deleteFromState,
        listItems: items
    });

    function deleteFromState(key)
    {
        items = items.filter(item => {

            return item.id !== key;
        });
        saveToStorage(STORAGE_KEY, items);
    }

    function addToState(key, firstField, secondField)
    {
        items.push({
            id: key,
            itemName: firstField,
            itemCount: secondField
        });
        saveToStorage(STORAGE_KEY, items);
    }

    const addButton = IconButton({
        type: "button",
        color: "primary",
        onClick: () => {
            
            unorderedList.addItem(itemName.getValue(), `x${itemCount.getValue()}`);
            itemCount.clear();
            itemName.clear();
        },
        text: "Add new item",
        iconPath: icons.addIcon
    });

    const addItemFieldset = MiniFieldset({
        legend: "Add a New Item",
        children: [
            fieldContainer,
            addButton
        ]
    });

    const fieldSet = Fieldset({
        legend: "Model Contents",
        children: [
            unorderedList.element,
            addItemFieldset,
        ],
    });

    function getState()
    {
        return items;
    }

    return { element: fieldSet, getState: getState };
}