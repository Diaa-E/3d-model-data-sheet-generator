import { getFromStorage, saveToStorage } from "../../utils/sesionStorageUtility";
import FieldsContainer from "../FieldsContainer";
import Fieldset from "../Fieldset";
import IconButton from "../IconButton";
import NumberInput from "../NumberInput";
import TextInput from "../TextInput";
import UnorderedList from "../UnorderedList";

export default function TextureSets()
{
    const STORAGE_KEY = "textureSets";

    const data = getFromStorage(
        STORAGE_KEY,
        {
            textureSets: []
        }
    );

    const textureName = TextInput({
        text: "Set's Name",
        autocomplete: "off",
        name: "textureSetName",
        onInput: () => {

        },
        placeholder: "Texture Set Name",
        value: ""
    });

    const textureHeight = NumberInput({
        text: "Map Height (Pixels)",
        min: "0",
        name: "textureHeight",
        onInput: () => {

        },
        placeholder: "Map Height",
        value: ""
    });

    const textureWidth = NumberInput({
        text: "Map Width (Pixels)",
        min: "0",
        name: "textureWidth",
        onInput: () => {

        },
        placeholder: "Map Width",
        value: ""
    });

    const addButton = IconButton({
        color: "primary",
        onClick: () => {

            unorderedList.addItem(textureName.getValue(), `${textureWidth.getValue()} x ${textureWidth.getValue()}`);
            textureName.clear();
            textureHeight.clear();
            textureWidth.clear();
        },
        text: "Add texture set",
        type: "button"
    });

    const unorderedList = UnorderedList({
        addToData: addToData,
        removeFromData: deleteFromData,
        listItems: data.textureSets
    })

    const fieldContainer = FieldsContainer({
        children: [
            textureName.element,
            textureHeight.element,
            textureWidth.element,
        ]
    })

    const fieldSet = Fieldset({
        legend: "Texture Sets",
        children: [
            fieldContainer,
            addButton,
            unorderedList.element
        ]
    });

    function addToData(key, firstField, secondField)
    {
        data.textureSets.push({
            id: key,
            itemName: firstField,
            itemCount: secondField
        });
        saveToStorage(STORAGE_KEY, data);
    }

    function deleteFromData(key)
    {
        data.textureSets = data.textureSets.filter(item => {

            return item.id !== key;
        });
        saveToStorage(STORAGE_KEY, data);
    }

    return { element: fieldSet }
}