import FieldsContainer from "../FieldsContainer";
import Fieldset from "../Fieldset";
import IconButton from "../IconButton";
import NumberInput from "../NumberInput";
import TextInput from "../TextInput";

export default function ModelContents()
{
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

    const addButton = IconButton({
        type: "button",
        color: "primary",
        onClick: () => {},
        text: "Add new item"
    });

    const fieldContainer = FieldsContainer({
        children: [
            itemName,
            itemCount,
        ]
    });

    const fieldSet = Fieldset({
        legend: "Model Contents",
        children: [
            fieldContainer,
            addButton
        ],
    });

    return { element: fieldSet }
}