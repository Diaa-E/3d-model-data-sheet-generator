import domUtility from "../dom.utility";

export default function div(options)
{
    options = {
        id: "",
        classes: [],
        children: [],
        ...options
    };

    const div = document.createElement("div");
    div.id = options.id
    domUtility.addClasses(div, options.classes);

    if (options.children.length > 0)
    {
        options.children.forEach(child => {

            div.append(child);
        });
    };

    return div;
}