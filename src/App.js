"use strict";

import "./globals.css";
import Index from "./Index";
import ModelForm from "./ModelForm";
import About from "./About";
import {createElement} from "./utils/createElement";
import logo from "./assets/logo/logo.svg";

const routes = {
    "/": Index,
    "/model_form.html": ModelForm,
    "/about.html": About
};

const favIcon = createElement(
    "link",
    {
        rel: "icon",
        type: "image/svg+xml",
        href: logo,
    }
);
document.head.appendChild(favIcon);

document.body.append(
    createElement(
        "div",
        {
            id: "root"
        },
        [
            routes[window.location.pathname]()
        ]
    )
);