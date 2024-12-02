import { dispatchErrorPopupEvent, popupEventName } from "../errorPopupEvents";

describe("Error Popup Events Utility Functions", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("Dispatches an event with the correct name", () => {

        const dispatchEventMock = jest.fn();
        const dispatcherElement = document.createElement("button");
        dispatcherElement.dispatchEvent = dispatchEventMock;

        dispatchErrorPopupEvent({ dispatchingElement: dispatcherElement, errorMsg: "" });

        expect(dispatchEventMock).toHaveBeenCalledTimes(1);
        expect(dispatchEventMock.mock.calls[0][0].type).toBe(popupEventName);
        expect(dispatchEventMock.mock.calls[0][0].bubbles).toBeTruthy();
    });

    it("Dispatches event from the dispatching element passed in options object", async () => {

        const dispatchEventMock = jest.fn();
        const dispatcherElement = document.createElement("button");
        dispatcherElement.dispatchEvent = dispatchEventMock;

        dispatchErrorPopupEvent({ dispatchingElement: dispatcherElement, errorMsg: "" });

        expect(dispatchEventMock.mock.contexts[0]).toBe(dispatcherElement);
    });

    it("Throws when no dispatching element is passed in the options object", () => {

        const dispatchEventMock = jest.fn();
        const dispatcherElement = document.createElement("button");
        dispatcherElement.dispatchEvent = dispatchEventMock;

        expect(() => dispatchErrorPopupEvent({ errorMsg: "" })).toThrow("DispatchingElement must be an HTML element");
    });

    it("Throws when an invalid dispatching element is passed in the options object", () => {

        const dispatchEventMock = jest.fn();
        const dispatcherElement = document.createElement("button");
        dispatcherElement.dispatchEvent = dispatchEventMock;

        expect(() => dispatchErrorPopupEvent({ dispatchingElement: "string", errorMsg: "" })).toThrow("DispatchingElement must be an HTML element");
    });

    it("Passes error message from the options object to the detail object", () => {

        const dispatchEventMock = jest.fn();
        const dispatcherElement = document.createElement("button");
        dispatcherElement.dispatchEvent = dispatchEventMock;

        dispatchErrorPopupEvent({ dispatchingElement: dispatcherElement, errorMsg: "test1" })

        expect(dispatchEventMock.mock.calls[0][0].detail.errorMsg).toBe("test1");
    });
});