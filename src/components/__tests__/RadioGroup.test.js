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

    it("Removes all children when removeAllButtons funciton is called", () => {

        const button1 = document.createElement("button");
        const button2 = document.createElement("button");
        const button3 = document.createElement("button");

        const radioGroupComponent = RadioGroup({
            buttons: [button1, button2, button3],
        });

        render(radioGroupComponent.element);

        expect(document.querySelectorAll("button")).toHaveLength(3);

        radioGroupComponent.removeAllButtons();

        expect(document.querySelectorAll("button")).toHaveLength(0);
    });

    it("Removes element with matching label text", () => {

        const label1 = document.createElement("label");
        label1.textContent = "remove1";

        const label2 = document.createElement("label");
        label2.textContent = "keep2";

        const label3 = document.createElement("label");
        label3.textContent = "keep3";

        const radioGroupComponent = RadioGroup({
            buttons: [label1, label2, label3],
        });

        render(radioGroupComponent.element);

        expect(document.querySelectorAll("label")).toHaveLength(3);

        radioGroupComponent.removeButton("remove1");

        expect(document.querySelectorAll("label")).toHaveLength(2);

        expect(document.querySelectorAll("label")[0].textContent).toBe("keep2");
        expect(document.querySelectorAll("label")[1].textContent).toBe("keep3");
    });
});