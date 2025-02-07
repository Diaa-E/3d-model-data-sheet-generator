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

    it("Adds required flag when required prop is true", () => {

        render(Fieldset({ legend: "fieldset", required: true, children: [] }).element);

        const legend = document.querySelector("legend");

        expect(legend["aria-label"]).toMatch(/required/i);
    });

    it("Adds a tip text when hint props is not empty", () => {

        render(Fieldset({ legend: "fieldset", required: true, hint: "test hint", children: [] }).element);

        const hint = document.querySelector("p");

        expect(hint.textContent).toMatch(/test\shint/i);
    });

    it("Removes tip text when hint prop is empty", () => {

        render(Fieldset({ legend: "fieldset", required: true, hint: "", children: [] }).element);

        const hint = document.querySelector("p");

        expect(hint).toBeNull();
    });
});