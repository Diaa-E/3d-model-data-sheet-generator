import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import FieldsContainer from "../FieldsContainer";
import Fieldset from "../Fieldset";
import IconButton from "../IconButton";
import NumberInput from "../NumberInput";
import UnorderedList from "../UnorderedList";
import TextInput from "../TextInput";
import MiniFieldset from "../MiniFieldset";

export default function ModelContents()
{
    const STORAGE_KEY = "modelContents";

    const data = getFromStorage(
        STORAGE_KEY,
        {
            modelContents: [],
        }
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

        addToData: addToData,
        removeFromData: deleteFromData,
        listItems: data.modelContents
    });

    function deleteFromData(key)
    {
        data.modelContents = data.modelContents.filter(item => {

            return item.id !== key;
        });
        saveToStorage(STORAGE_KEY, data);
    }

    function addToData(key, firstField, secondField)
    {
        data.modelContents.push({
            id: key,
            itemName: firstField,
            itemCount: secondField
        });
        saveToStorage(STORAGE_KEY, data);
    }

    const addButton = IconButton({
        type: "button",
        color: "primary",
        onClick: () => {
            
            unorderedList.addItem(itemName.getValue(), `x${itemCount.getValue()}`);
            itemCount.clear();
            itemName.clear();
        },
        text: "Add new item"
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

    return { element: fieldSet }
}