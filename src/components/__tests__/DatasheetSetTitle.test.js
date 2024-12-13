import DatasheetSetTitle from "../DatasheetSetTitle";

describe("Datasheet Set Title Component", () => {

    beforeEach(() => {

        jest.resetAllMocks();
        cleanup();
    });

    it("Renders an h2 element", () => {

        render(
            DatasheetSetTitle({
                title: "",
                emptySet: false
            }).element
        );

        const title = document.querySelector("h2");

        expect(title).not.toBeNull();
    });

    it("Renders title text from props", () => {

        render(
            DatasheetSetTitle({
                title: "test1",
                emptySet: false
            }).element
        );

        const title = document.querySelector("h2");

        expect(title.textContent).toBe("test1");
    });

    it("Adds a distinct class when emptySet prop is true", () => {

        render(
            DatasheetSetTitle({
                title: "test1",
                emptySet: true
            }).element
        );

        const title = document.querySelector("h2");

        expect(title.classList.toString()).toMatch(/empty/i);
    });
});