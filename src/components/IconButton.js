import defaultIcon from "../icons/add.svg";
import domUtility from "../dom.utility";

export default function IconButton(options)
{
    options = {
        icon: defaultIcon,
        btnClasses: [],
        iconClasses: [],
        type: "button",
        id: "",
        clickFunction: () => {},
        ...options
    }

    const btn = document.createElement("button");
    btn.type = options.type;
    btn.id = options.id;
    domUtility.addClasses(btn, options.btnClasses);
    
    //When the listener is assigned to the button
    //the event emitter changes depending on where the vlick hit (image or button)
    //which breaks the parentNode chain when deleting the item div
    const btnIcon = new Image();
    btnIcon.src = options.icon;
    domUtility.addClasses(btnIcon, options.iconClasses);

    btn.addEventListener("click", (e) => {

        options.clickFunction(e);
    })

    btn.append(btnIcon);

    return btn;
}