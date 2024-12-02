export const popupEventName = "onShowPopup";

export function dispatchErrorPopupEvent(options = {
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
        popupEventName,
        {
            detail: {
                errorMsg: options.errorMsg
            },
            bubbles: true,
        }
    )

    options.dispatchingElement.dispatchEvent(event);
}