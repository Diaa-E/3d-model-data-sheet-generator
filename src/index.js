"use strict";

import "./globals.css";

import App from "./App";
import {createElement} from "./utils/createElement";

document.body.append(
    createElement(
        "div",
        {
            id: "root"
        },
        [
            App()
        ]
    )
);