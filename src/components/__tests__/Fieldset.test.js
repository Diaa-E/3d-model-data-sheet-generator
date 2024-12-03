import Fieldset from "../Fieldset";

describe("Fieldset Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
    });

    it("Renders a fieldset and a legend child", () => {

        render(Fieldset({ legend: "fieldset" }).element);

        const fieldset = document.querySelector("fieldset");
        const legend = document.querySelector("legend");

        expect(fieldset).not.toBeNull();
        expect(legend.parentElement).toBe(fieldset);
    });

    it("Legend uses text from legend prop", () => {

        render(Fieldset({ legend: "form fieldset 1" }).element);
        const legend = document.querySelector("legend");

        expect(legend.textContent).toBe("form fieldset 1");
    });

    it("Appends cildren elements from props", () => {

        const childNode = document.createElement("h1");
        childNode.textContent = "child node";

        render(Fieldset({ legend: "fieldset", children: [ childNode ] }).element);

        const fieldset = document.querySelector("fieldset");

        expect(childNode.parentElement).toBe(fieldset);
    });
});