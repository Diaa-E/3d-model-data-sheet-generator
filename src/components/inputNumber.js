import domUtility from "../dom.utility";

export default function inputNumber(options)
{
    options = {
        min: "",
        max: "",
        classes: [],
        id: "",
        name: "",
        placeholder: "",
        required: false,
        errorMsg: "Invalid Input",
        ...options
    }

    const element = document.createElement("input");
    element.type = "number";
    element.name = options.name;
    options.min === "" ? null : element.min = options.min;
    options.max === "" ? null : element.max = options.max;
    element.id = options.id;
    element.required = options.required;
    element.placeholder = options.placeholder;

    domUtility.addClasses(element, options.classes);

    function getContent()
    {
        return element.value;
    }

    function isValid()
    {
        return element.checkValidity();
    }

    function getError()
    {
        return options.errorMsg;
    }

    function clearContent()
    {
        element.value = "";
    }

    return {element, getContent, isValid, getError, clearContent};
}