"use strict";

import "./globals.css";
import Index from "./Index";
import ModelForm from "./ModelForm";
import About from "./About";
import {createElement} from "./utils/createElement";
import logo from "./assets/logo/logo.svg";
import Header from "./components/Header";
import Footer from "./components/Footer";

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

const header = Header();
const footer = Footer();

document.body.append(
    createElement(
        "div",
        {
            id: "root"
        },
        [
            header.element,
            routes[window.location.pathname](),
            footer.element
        ]
    )
);