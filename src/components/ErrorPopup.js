import styles from "./ErrorPopup.module.css";
import { createElement } from "../utils/createElement";
import IconButton from "./IconButton";
import icons from "../barrels/icons.barrel";
import { closeErrorPopupEvent, showErrorPopupEvent } from "../utils/errorPopupEvents";

export default function ErrorPopup()
{
    document.addEventListener(showErrorPopupEvent, (e) => {

        const newPopup = PopupElement({
            errorMsg: e.detail.errorMsg,
            lastFocusedElement: e.detail.lastFocusedElement,
        });
        document.body.append(newPopup.element);
        newPopup.openPopup();
    });
}

function PopupElement(props = {
    errorMsg: "",
    lastFocusedElement: null
})
{
    props = {

        errorMsg: "",
        lastFocusedElement: null,
        ...props
    };

    let isOpen = false;
    let closeTimer = null;
    const CLOSE_DURATION = 0.3;
    const OPEN_DURATION = 0.3;

    const errorMsg = createElement(
        "p",
        {
            ariaLabel: "error message",
            class: styles["error-msg"],
        },
        [
            props.errorMsg
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

    popup.style.setProperty("--close-duration", `${CLOSE_DURATION}s`);
    popup.style.setProperty("--open-duration", `${OPEN_DURATION}s`);

    function closePopup(silent = false)
    {
        popup.classList.remove(styles["open"]);
        popup.classList.add(styles["close"]);

        if (!silent)
        {
            props.lastFocusedElement.focus();
        }

        setTimeout(() => {

            popupWrapper.style.visibility = "hidden";
            popupWrapper.hidden = true;
            isOpen = false;
            popupWrapper.remove();
            
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

    return { element: popupWrapper, openPopup: openPopup, closePopup: closePopup }
}