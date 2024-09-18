import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import FieldsContainer from "../FieldsContainer";
import Fieldset from "../Fieldset";
import IconButton from "../IconButton";
import NumberInput from "../NumberInput";
import OrderedList from "../UnorderedList";
import TextInput from "../TextInput";

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

    const orderedList = OrderedList({

        addItemCallback: (key, firstField, secondField) => {
            data.modelContents.push({
                id: key,
                itemName: firstField,
                itemCount: secondField
            });
            saveToStorage(STORAGE_KEY, data);
        },
        deleteItemCallback: (key) => {
            data.modelContents = data.modelContents.filter(item => {
                return item.id !== key;
            });
            saveToStorage(STORAGE_KEY, data);
        },
    });

    const addButton = IconButton({
        type: "button",
        color: "primary",
        onClick: () => orderedList.addItem(itemName.getValue(), itemCount.getValue()),
        text: "Add new item"
    });

    const fieldSet = Fieldset({
        legend: "Model Contents",
        children: [
            fieldContainer,
            addButton,
            orderedList.element
        ],
    });

    return { element: fieldSet }
}