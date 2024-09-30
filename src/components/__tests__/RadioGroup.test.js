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
            legend: "test 1",
            buttons: [button],
        });
        render(radioGroupComponent.element);

        const div = document.querySelector("div");

        expect(button.parentElement).toBe(div);
    });

    it("addButton function appends passed element to the div", () => {

        const button = document.createElement("button");

        const radioGroupComponent = RadioGroup({
            legend: "test 1",
            buttons: [button],
        });
        render(radioGroupComponent.element);
        radioGroupComponent.addButton(button);

        const div = document.querySelector("div");

        expect(button.parentElement).toBe(div);
    });
});