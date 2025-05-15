import Popup from "../Popup";

describe("Popup Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
        jest.useFakeTimers();
        jest.spyOn(global, "setTimeout");
    });

    it("Does not append popup to document body when open function is not called", () => {

        Popup({
            error: false,
            lastFocusedElement: null,
            showScrollToField: false,
            msg: "test1",
        });

        jest.runAllTimers();

        const message = document.querySelector("p");

        expect(message).toBeNull();
        expect(setTimeout).toHaveBeenCalledTimes(0);
    });

    it("Popup is appended to document body when open function is called", () => {

        const popup = Popup({
            error: false,
            lastFocusedElement: null,
            showScrollToField: false,
            msg: "test1",
        });

        popup.open()

        const message = document.querySelector("p");
        
        expect(message.textContent).toBe("test1");
        expect(setTimeout).toHaveBeenCalledTimes(1);
    });

    it("Popup is unmounted from document by a timer after being opened", () => {

        const popup = Popup({
            error: false,
            lastFocusedElement: null,
            showScrollToField: false,
            msg: "test1",
        });

        popup.open();

        expect(document.querySelector("p").textContent).toBe("test1");
        expect(setTimeout).toHaveBeenCalledTimes(1);

        jest.runAllTimers();

        expect(document.querySelector("p")).toBeNull();
        expect(setTimeout).toHaveBeenCalledTimes(2);
    });

    it("Shows text message from msg prop", () => {

        const popup = Popup({
            error: false,
            lastFocusedElement: null,
            showScrollToField: false,
            msg: "test1",
        });

        popup.open();

        const message = document.querySelector("p");
        
        expect(message.textContent).toBe("test1");
    });

    it("Adds an error CSS class when error prop is true", () => {

        const popup = Popup({
            error: true,
            lastFocusedElement: null,
            showScrollToField: false,
            msg: "test1",
        });

        popup.open();

        const message = document.querySelector(`div[id=alert]`);
        
        expect(message.className).toContain("error");
    });

    it("Does not Add an error CSS class when error prop is false", () => {

        const popup = Popup({
            error: false,
            lastFocusedElement: null,
            showScrollToField: false,
            msg: "test1",
        });

        popup.open();

        const message = document.querySelector(`div[id=alert]`);
        
        expect(message.className).not.toContain("error");
    });

    it("Does not render a 'scroll to field' link when scrollToField prop is false", () => {

        const popup = Popup({
            error: false,
            lastFocusedElement: null,
            showScrollToField: false,
            msg: "test1",
        });

        popup.open();

        const scrollToField = document.querySelector(`a`);

        expect(scrollToField).toBeNull();
    });

    it("Renders a 'scroll to field' link when scrollToField prop is true", () => {

        const popup = Popup({
            error: false,
            lastFocusedElement: null,
            showScrollToField: true,
            msg: "test1",
        });

        popup.open();

        const scrollToField = document.querySelector(`a`);

        expect(scrollToField).not.toBeNull();
        expect(scrollToField.textContent.toLowerCase()).toContain("scroll");
    });

    it("Closes popup and scrolls to last focused element when 'scroll to field' link is clicked", () => {

        const lastFocusedElement = document.createElement("button");
        lastFocusedElement.scrollIntoView = jest.fn();

        const popup = Popup({
            error: false,
            lastFocusedElement: lastFocusedElement,
            showScrollToField: true,
            msg: "test1",
        });

        popup.open();

        const scrollToField = document.querySelector(`a`);

        expect(document.querySelector("div[id=alert")).not.toBeNull();
        expect(setTimeout).toHaveBeenCalledTimes(1);

        scrollToField.click();
        jest.runAllTimers();

        expect(document.querySelector("div[id=alert")).toBeNull();
        expect(setTimeout).toHaveBeenCalledTimes(3); //Extra 1 is for the setTimeout called by the open function.
        expect(lastFocusedElement.scrollIntoView).toHaveBeenCalledTimes(1);
    });
});