import domUtility from "../dom.utility";

export default function inputText(options)
{
    options = {
        minLength: "",
        maxLength: "",
        classes: [],
        id: "",
        name: "",
        placeholder: "",
        required: false,
        errorMsg: "Invalid Input",
        ...options
    }

    const element = document.createElement("input");
    element.name = options.name;
    element.id = options.id;
    options.maxLength === "" ? null : element.maxLength = options.maxLength;
    options.minLength === "" ? null : element.minLength = options.minLength;
    element.placeholder = options.placeholder;
    element.required = options.required;

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