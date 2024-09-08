"use strict";
import domUtility from "../dom.utility";
import logo from "../logo/logo.svg";

export default function LogoHeader() {
    const appLogo = new Image();
    appLogo.src = logo;
    domUtility.addClasses(appLogo, ["logo"]);

    const header1 = document.createElement("h1");
    header1.textContent = "3D Model Datasheet Generator";

    const header2 = document.createElement("h2");
    header2.textContent = "Your datasheet is only a few clicks away";

    return { logo: appLogo, header: header1, slogan: header2 };
}
