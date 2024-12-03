import styles from "./ErrorPopup.module.css";
import { createElement } from "../utils/createElement";
import IconButton from "./IconButton";
import icons from "../barrels/icons.barrel";
import { popupEventName } from "../utils/errorPopupEvents";

export default function ErrorPopup()
{
    let lastFocusedElement = null;
    const CLOSE_DURATION = 0.5;
    const OPEN_DURATION = 0.3;

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
    });

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
        lastFocusedElement = e.detail.lastFocusedElement;
    });

    popup.style.setProperty("--close-duration", `${CLOSE_DURATION}s`);
    popup.style.setProperty("--open-duration", `${OPEN_DURATION}s`);

    function closePopup()
    {
        popup.classList.remove(styles["open"]);
        popup.classList.add(styles["close"]);
        lastFocusedElement.focus();

        setTimeout(CLOSE_DURATION, () => {
            
            popupWrapper.style.visibility = "hidden";
            popupWrapper.hidden = true;
        });
    }

    function openPopup()
    {
        popupWrapper.style.visibility = "visible";
        popupWrapper.hidden = false;
        
        popup.classList.add(styles["open"]);
        popup.classList.remove(styles["close"]);
        closeButton.focus();
    }

    return { element: popupWrapper }
}