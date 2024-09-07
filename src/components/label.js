import domUtility from "../dom.utility";

export default function label(options)
{
    options = {
        id: "",
        for: "",
        text: "Default text",
        classes: [],
        ...options
    }

    const lbl = document.createElement("label");
    lbl.textContent = options.text;
    lbl.setAttribute("for", options.for);
    lbl.id = options.id
    domUtility.addClasses(lbl, options.classes);

    return lbl;
}