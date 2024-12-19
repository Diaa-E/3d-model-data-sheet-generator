import styles from "./ErrorPopup.module.css";
import { createElement } from "../utils/createElement";
import IconButton from "./IconButton";
import icons from "../barrels/icons.barrel";
import { popupEventName } from "../utils/errorPopupEvents";

export default function ErrorPopup()
{
    let isOpen = false;
    let lastFocusedElement = null;
    let closeTimer = null;
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
        onClick: () => closePopup(false),
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

    function closePopup(silent = false)
    {
        popup.classList.remove(styles["open"]);
        popup.classList.add(styles["close"]);

        if (!silent)
        {
            lastFocusedElement.focus();
        }

        setTimeout(() => {

            popupWrapper.style.visibility = "hidden";
            popupWrapper.hidden = true;
            isOpen = false;
            
        }, CLOSE_DURATION * 1000);
    }

    function openPopup()
    {
        popupWrapper.style.visibility = "visible";
        popupWrapper.hidden = false;
        
        popup.classList.add(styles["open"]);
        popup.classList.remove(styles["close"]);
        isOpen = true;

        closeButton.focus();

        clearTimeout(closeTimer);

        closeTimer = setTimeout(() => {

            if (isOpen)
            {
                closePopup(true);
            }

        }, 10000);
    }

    return { element: popupWrapper }
}