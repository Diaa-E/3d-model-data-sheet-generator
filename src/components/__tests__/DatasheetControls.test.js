import DatasheetControls from "../DatasheetControls";

describe("Datasheet Controls Component", () => {

    beforeEach(() => {
        
        jest.resetAllMocks();
        cleanup();
    });

    it("Renders a div wrapper", () => {

        render(DatasheetControls({
            onCopy: () => {} 
        }).element);

        const divWrapper = document.querySelector("div");

        expect(divWrapper).not.toBeNull();
    });

    it("Renders a generate submit button", () => {

        render(DatasheetControls({
            onCopy: () => {} 
        }).element);

        const divWrapper = document.querySelector("div");
        const generateButton = Array.from(divWrapper.querySelectorAll("button"))
        .find(button => button.textContent.match(/generate/i));

        expect(generateButton).not.toBeNull();
    });

    it("Renders a copy to clipboard button", () => {

        render(DatasheetControls({
            onCopy: () => {} 
        }).element);

        const divWrapper = document.querySelector("div");
        const copyButton = Array.from(divWrapper.querySelectorAll("button"))
        .find(button => button.textContent.match(/copy/i));

        expect(copyButton).not.toBeNull();
    });

    it("onCopy funciton is called when copy button is clicked", () => {

        const onCopy = jest.fn();

        render(DatasheetControls({
            onCopy: onCopy 
        }).element);

        const divWrapper = document.querySelector("div");
        const copyButton = Array.from(divWrapper.querySelectorAll("button"))
        .find(button => button.textContent.match(/copy/i));
        copyButton.click();

        expect(onCopy).toHaveBeenCalledTimes(1);
    });
});