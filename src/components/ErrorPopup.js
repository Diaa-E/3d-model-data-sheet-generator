import styles from "./ErrorPopup.module.css";
import { createElement } from "../utils/createElement";
import IconButton from "./IconButton";
import icons from "../barrels/icons.barrel";
import { popupEventName } from "../utils/errorPopupEvents";

export default function ErrorPopup()
{
    const errorMsg = createElement(
        "p",
        {
            ariaLabel: "error message",
            class: styles["error-msg"],
        },
        [
            "This is an error message."
        ]
    );

    const closeButton = IconButton({
        iconPath: icons.closeIcon,
        text: "Dismiss error popup",
        onClick: closePopup,
        type: "button"
    })

    const popup = createElement(
        "div",
        {
            role: "dialog",
            class: styles["popup"]
        },
        [
            errorMsg,
            closeButton
        ]
    );

    const popupWrapper = createElement(
        "div",
        {
            class: styles["popup-wrapper"],
            hidden: true
        },
        [
            popup
        ]
    );

    document.addEventListener(popupEventName, (e) => {

        openPopup();
        errorMsg.textContent = e.detail.errorMsg;
    });

    function closePopup()
    {
        popupWrapper.style.visibility = "hidden";
        popupWrapper.hidden = true;
    }

    function openPopup()
    {
        popupWrapper.style.visibility = "visible";
        popupWrapper.hidden = false;
    }

    return { element: popupWrapper }
}