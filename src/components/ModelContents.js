import Label from "./Label";
import InputText from "./InputText";
import Div from "./Div";
import InputNumber from "./InputNumber";
import IconButton from "./IconButton";
import addIcon from "../icons/add.svg";
import ErrorPanel from "./ErrorPanel";
import ListItem from "./ListItem";

export default function ModelContents()
{
    const lblModelItems = Label({
        text: "Model Contents",
        classes: ["label"]});
    //item name input field
    const lblItemName = Label({
        text: "Item's Name",
        classes: ["label-input"],
        for: "itemName",
    });
    const txtItemName = InputText({
        name: "itemName",
        id: "itemName",
        classes: ["text-input"],
        placeholder: "Item's name",
        required: true,
        errorMsg: "Any item must have a name",
    });

    const divItemName = Div({
        classes: ["input-container"],
        children: [lblItemName, txtItemName.element]
    })

    //item count input field
    const lblItemCount = Label({
        text: "Item's Count",
        classes: ["label-input"],
        for: "itemCount",
    });

    const txtItemCount = InputNumber({
        name: "itemCount",
        id: "itemCount",
        classes: ["text-input"],
        min: "1",
        placeholder: "How many of it included",
        required: true,
        errorMsg: "There has to be at least 1 of the item"
    });

    const divItemCount = Div({
        classes: ["input-container"],
        children: [lblItemCount, txtItemCount.element]
    });

    //add button
    const btnAdd = IconButton({
        icon: addIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        clickFunction: addItem});

    const divError = ErrorPanel("addItemError");

    const divAddItem = Div({
        children: [divItemName, divItemCount, btnAdd],
        classes: ["option", "add"],
    });

    const divWrapper = Div({
        id: "modelContents",
        classes: ["card"],
        children: [lblModelItems, divError.element, divAddItem]
    });

    function addItem()
    {
        if (!txtItemName.isValid())
        {
            showError(txtItemName.getError());
        }
        else if (!txtItemCount.isValid())
        {
            showError(txtItemCount.getError());
        }
        else
        {
            divWrapper.append(ListItem(txtItemName.getContent(),
                `x ${txtItemCount.getContent()}`, "modelItem"));
            txtItemCount.clearContent();
            txtItemName.clearContent();
            clearError();
        }
    }

    function getData()
    {
        const divList = document.querySelectorAll("#modelContents>#modelItem");

        const modelItems = [];

        divList.forEach(item => {
            const pList = item.querySelectorAll("p");
            modelItems.push(`${pList[1].textContent} ${pList[0].textContent}`);
        });

        return {items: modelItems};
    }

    function showError(errorMsg)
    {
        divError.showError(errorMsg);
    }

    function clearError()
    {
        divError.clearError();
    }

    return {component: divWrapper, getData, showError, clearError};
}