export const showErrorPopupEvent = "onShowErrorPopup";
export const closeErrorPopupEvent = "onCloseErrorPopup";

export function showErrorPopup(options = {
    dispatchingElement: null,
    errorMsg: "",
})
{
    options = {
        dispatchingElement: null,
        errorMsg: "This is an Error",
        ...options
    };

    if (!(options.dispatchingElement instanceof HTMLElement))
    {
        throw new Error("DispatchingElement must be an HTML element");
    }

    const event = new CustomEvent(
        showErrorPopupEvent,
        {
            detail: {
                errorMsg: options.errorMsg,
                lastFocusedElement: options.dispatchingElement,
            },
            bubbles: true,
        }
    )

    options.dispatchingElement.dispatchEvent(event);
}

export function closeErrorPopup(options = {
    silent: false,
})
{
    options = {
        silent: false,
        ...options
    };

    const event = new CustomEvent(
        closeErrorPopupEvent,
        {
            detail: {
                silent: options.silent,
            },
            bubbles: true,
        }
    );

    document.dispatchEvent(event);
}