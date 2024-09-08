import deleteIcon from "../icons/delete.svg";
import Paragraph from "./Paragraph";
import Div from "./Div";
import IconButton from "./IconButton";

export default function ListItem(firstField, secondField, id)
{
    const divItem = Div({
        id: id,
        classes: ["option"],
        children: [
            Paragraph({
                text: firstField,
                classes: ["item-name"]
            }),
            Paragraph({
                text:secondField,
                classes: ["item-name", "item-count"]
            }),
            IconButton({
                icon: deleteIcon,
                btnClasses: ["button"],
                iconClasses: ["button-icon"],
                clickFunction: removeListItem,
            })
        ]
    });

    return divItem;
}

//instead of writing a unique delete function for every type of list
//since all list items use the .option class it can be used to identify the target
//instead of the id
function removeListItem(e)
{
    let target = e.target.parentNode;
    let counter = 0;

    //keep going up in the tree until the target is found or counter expires
    //counter stops infinite loops, the number 10 is arbitrary
    while (!target.classList.contains("option") && counter < 10)
    {
        target = target.parentNode;
        counter++;
    }

    //the list's parent is always one level higher
    target.parentNode.removeChild(target);
}