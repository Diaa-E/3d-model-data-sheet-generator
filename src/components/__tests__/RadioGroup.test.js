import RadioGroup from "../RadioGroup";

describe("Radio Group Component", () => {

    beforeEach(() => {

        cleanup();
        jest.restoreAllMocks();
    });

    it("Returns a div", () => {

        const radioGroupComponent = RadioGroup({});
        render(radioGroupComponent.element);

        const div = document.querySelector("div");

        expect(div).not.toBeNull();
    });

    it("Appends children from children prop", () => {

        const button = document.createElement("button");

        const radioGroupComponent = RadioGroup({
            buttons: [button],
        });
        render(radioGroupComponent.element);

        const div = document.querySelector("div");

        expect(button.parentElement).toBe(div);
    });

    it("addButton function appends passed element to the div", () => {

        const button = document.createElement("button");

        const radioGroupComponent = RadioGroup({
            buttons: [button],
        });
        render(radioGroupComponent.element);
        radioGroupComponent.addButton(button);

        const div = document.querySelector("div");

        expect(button.parentElement).toBe(div);
    });

    it("Displays empty section text when buttons prop is an empty array", () => {

        const radioGroupComponent = RadioGroup({
            buttons: [],
        });
        render(radioGroupComponent.element);

        const div = document.querySelector("div");

        expect(div.textContent).toMatch(/no\sitems/i);
    });

    it("Removes empty section text when a button is added", () => {

        const radioGroupComponent = RadioGroup({
            buttons: [],
        });
        render(radioGroupComponent.element);

        const div = document.querySelector("div");

        expect(div.textContent).toMatch(/no\sitems/i);

        radioGroupComponent.addButton(document.createElement("button"));

        expect(div.textContent).not.toMatch(/no\sitems/i);
    });
});