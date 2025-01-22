import styles from "./ErrorPopup.module.css";
import { createElement } from "../utils/createElement";
import { showErrorPopupEvent } from "../utils/errorPopupEvents";
import scrollToElement from "../utils/scrollToElement";

export default function ErrorPopup()
{
    document.addEventListener(showErrorPopupEvent, (e) => {

        const newPopup = PopupElement({
            errorMsg: e.detail.errorMsg,
            lastFocusedElement: e.detail.lastFocusedElement,
            showScrollToField: e.detail.showScrollToField,
        });
        document.body.append(newPopup.element);
        newPopup.openPopup();
    });
}

function PopupElement(props = {
    errorMsg: "",
    lastFocusedElement: null,
    showScrollToField: false
})
{
    props = {

        errorMsg: "",
        lastFocusedElement: null,
        showScrollToField: false,
        ...props
    };

    let isOpen = false;
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

    const fieldLink = props.showScrollToField ? createElement(
        "a",
        {
            class: styles["field-link"],
            href: "javascript:void(0)",
            onClick: () => {
                scrollToElement(props.lastFocusedElement);
                closePopup();
            }
        },
        [
            "Scroll to field"
        ]
    ) : "";

    const popup = createElement(
        "div",
        {
            role: "dialog",
            class: styles["popup"]
        },
        [
            errorMsg,
            fieldLink,
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
            scrollToElement(props.lastFocusedElement);
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

        setTimeout(() => {

            if (isOpen)
            {
                closePopup(true);
            }

        }, 5000);
    }

    return { element: popupWrapper, openPopup: openPopup, closePopup: closePopup }
}