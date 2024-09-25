import RadioGroup from "../RadioGroup";

describe("Radio Group Component", () => {

    beforeEach(() => {

        cleanup();
        jest.restoreAllMocks();
    });

    it("Returns a fieldset", () => {

        const radioGroupComponent = RadioGroup({});
        render(radioGroupComponent.element);

        const fieldset = document.querySelector("fieldset");

        expect(fieldset).not.toBeNull();
    });

    it("Adds a legend to the field set using the legend prop", () => {

        const radioGroupComponent = RadioGroup({
            legend: "test 1",
            buttons: [],
        });
        render(radioGroupComponent.element);

        const legend = document.querySelector("legend");

        expect(legend).not.toBeNull();
        expect(legend.parentElement).toBe(radioGroupComponent.element);
        expect(legend.textContent).toBe("test 1");
    });

    it("Appends children from children prop", () => {

        const button = document.createElement("button");

        const radioGroupComponent = RadioGroup({
            legend: "test 1",
            buttons: [button],
        });
        render(radioGroupComponent.element);

        const fieldset = document.querySelector("fieldset");

        expect(button.parentElement).toBe(fieldset);
    });

    it("addButton function appends passed element to the fieldset", () => {

        const button = document.createElement("button");

        const radioGroupComponent = RadioGroup({
            legend: "test 1",
            buttons: [button],
        });
        render(radioGroupComponent.element);
        radioGroupComponent.addButton(button);

        const fieldset = document.querySelector("fieldset");

        expect(button.parentElement).toBe(fieldset);
    });
});