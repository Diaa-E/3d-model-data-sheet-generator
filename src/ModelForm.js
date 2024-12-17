import MainForm from "./components/mainForm/MainForm";
import ErrorPopup from "./components/ErrorPopup";
import Header from "./components/Header";
import { createElement } from "./utils/createElement";

export default function ModelForm()
{
    const header = Header();
    const mainForm = MainForm();
    const errorPopup = ErrorPopup();

    const contentDiv = createElement(
        "div",
        {
            id: "content"
        },
        [
            mainForm.element
        ]
    )
        
    return [ header.element, contentDiv, errorPopup.element ];
}