import domUtility from "../dom.utility";

export default function button(options)
{
    options = {
        classes: [],
        type: "button",
        text: "click here",
        id: "",
        clickFunction: () => {},
        ...options
    }

    const btn = document.createElement("button");
    btn.textContent = options.text;
    btn.id = options.id;
    domUtility.addClasses(btn, options.classes);

    btn.addEventListener("click", (e) => {

        //prevent triggering of other click events further up the DOM tree
        e.preventDefault();
        options.clickFunction(e);
    })

    return btn;
}