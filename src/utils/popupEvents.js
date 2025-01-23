export const showErrorPopupEvent = "onShowErrorPopup";
export const closeErrorPopupEvent = "onCloseErrorPopup";
export const showSuccessPopupEvent = "onShowSuccessPopup";

export function showSuccessPopup(options = {
    dispatchingElement: null,
    successMsg: "",
})
{
    options = {
        dispatchingElement: null,
        successMsg: "Success",
        ...options
    };

    if (!(options.dispatchingElement instanceof HTMLElement))
    {
        throw new Error("DispatchingElement must be an HTML element");
    }

    const event = new CustomEvent(
        showSuccessPopupEvent,
        {
            detail: {
                successMsg: options.successMsg,
                lastFocusedElement: options.dispatchingElement,
            },
            bubbles: true,
        }
    )

    options.dispatchingElement.dispatchEvent(event);
}

export function showErrorPopup(options = {
    dispatchingElement: null,
    errorMsg: "",
    showScrollToField: false
})
{
    options = {
        dispatchingElement: null,
        errorMsg: "This is an Error",
        showScrollToField: false,
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
                showScrollToField: options.showScrollToField,
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