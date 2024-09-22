import MiniFieldset from "../MiniFieldset";

describe("MiniFieldset Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
    })

    it("Returns a fieldset", () => {

        render(MiniFieldset({
            legend: "",
            children: [],
        }));

        const fieldset = document.querySelector("fieldset");

        expect(fieldset).not.toBeNull();
        expect(fieldset.tagName).toBe("FIELDSET");
    });

    it("Adds a legend with the text from the legend prop", () => {

        render(MiniFieldset({
            legend: "test 1",
            children: [],
        }));

        const fieldset = document.querySelector("fieldset");
        const legend = document.querySelector("legend");

        expect(legend).not.toBeNull();
        expect(legend.textContent).toBe("test 1");
        expect(legend.parentElement).toBe(fieldset);
    });

    it("Appends children from the children prop", () => {

        const h1 = document.createElement("h1");

        render(MiniFieldset({
            legend: "",
            children: [
                h1,
            ],
        }));

        const fieldset = document.querySelector("fieldset");

        expect(h1.parentElement).toBe(fieldset);
    });
});