"use strict";

import ErrorPopup from "./components/ErrorPopup";
import MainForm from "./components/mainForm/MainForm";
import { createElement } from "./utils/createElement";
import logo from "./assets/logo/logo.svg";

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

    const mainForm = MainForm();
    const errorPopup = ErrorPopup();
           
    return [ mainForm.element, errorPopup.element ];
}