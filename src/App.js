"use strict";

import "./globals.css";
import Index from "./Index";
import ModelForm from "./ModelForm";
import About from "./About";
import {createElement} from "./utils/createElement";
import logo from "./assets/logo/logo.svg";

const routes = [
    {
        path: "/",
        component: Index
    },
    {
        path: "/model_form.html",
        component: ModelForm
    },
    {
        path: "/about.html",
        component: About
    }
];

const favIcon = createElement(
    "link",
    {
        rel: "icon",
        type: "image/svg+xml",
        href: logo,
    }
);
document.head.appendChild(favIcon);

function getPage()
{
    for (const route of routes)
    {
        if (window.location.pathname === route.path)
        {
            return route.component();
        }
    }
}

document.body.append(
    createElement(
        "div",
        {
            id: "root"
        },
        [
            getPage()
        ]
    )
);