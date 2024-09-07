import domUtility from "../dom.utility";

export default function p(options)
{
    options = {
        id: "",
        classes: [],
        text: "Default text",
        ...options
    }

    const p = document.createElement("p");
    p.id = options.id;
    p.textContent = options.text;
    domUtility.addClasses(p, options.classes);

    return p;
}