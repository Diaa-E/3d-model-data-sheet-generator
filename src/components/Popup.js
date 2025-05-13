import styles from "./Popup.module.css";
import { createElement } from "../utils/createElement";
import scrollToElement from "../utils/scrollToElement";

export default function Popup(props = {
    msg: "",
    lastFocusedElement: null,
    error: false,
    showScrollToField: false
})
{
    props = {

        msg: "default message",
        lastFocusedElement: null,
        showScrollToField: false,
        error: false,
        ...props
    };

    let isOpen = false;
    const CLOSE_DURATION = 0.3;
    const OPEN_DURATION = 0.3;

    const msg = createElement(
        "p",
        {
            ariaLabel: "error message",
            class: styles["error-msg"],
        },
        [
            props.msg
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

    const statusIcon = createElement(
        "div",
        {
            class: `${styles["popup-icon"]} ${props.error ? styles["error-icon"] : styles["success-icon"]}`,
        }
    )

    const popup = createElement(
        "div",
        {
            role: "alert",
            class: `${styles["popup"]} ${props.error ? styles["popup-error"] : styles["popup-success"]}`,
            "--close-duration": `${CLOSE_DURATION}s`,
            "--open-duration": `${OPEN_DURATION}s`
        },
        [
            statusIcon,
            msg,
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
        document.body.append(popupWrapper);

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

    return { element: popupWrapper, open: openPopup}
}