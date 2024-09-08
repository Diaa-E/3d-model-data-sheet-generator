import domUtility from "../dom.utility";

export default function TextArea(options)
{
    options = {
        id: "",
        name: "",
        cols: 30,
        rows: 10,
        placeholder: "Write text",
        classes: [],
        required: false,
        ...options
    }

    const txt = document.createElement("textarea");
    txt.id = options.id;
    txt.name = options.name;
    txt.cols = options.cols;
    txt.rows = options.rows;
    txt.placeholder = options.placeholder;
    txt.required = options.required;
    domUtility.addClasses(txt, options.classes);

    function getContent()
    {
        return txt.value;
    }

    return {element: txt, getContent};
}