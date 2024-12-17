"use strict";

import ErrorPopup from "./components/ErrorPopup";
import MainForm from "./components/mainForm/MainForm";
import { createElement } from "./utils/createElement";
import logo from "./assets/logo/logo.svg";
import Header from "./components/Header";

export default function App()
{

    const favIcon = createElement(
        "link",
        {
            rel: "icon",
            type: "image/svg+xml",
            href: logo,
        }
    );
    document.head.appendChild(favIcon);

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