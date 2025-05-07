"use strict";

import "./globals.css";
import "./reset.css";

import {createElement} from "./utils/createElement";

document.body.append(
    createElement(
        "div",
        {
            id: "root"
        }
    )
);