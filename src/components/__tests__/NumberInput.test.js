import NumberInput from "../NumberInput";

describe("Number Input Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
    });

    it("Renders a number input with a label", () => {

        const numberInputComponent = NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "",
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");
        const label = document.querySelector("label");

        expect(numberInput).not.toBeNull();
        expect(label).not.toBeNull();
    });

    it("Renders label text from the text prop", () => {

        const numberInputComponent = NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "number_1",
        });

        render(numberInputComponent.element);

        const label = document.querySelector("label");

        expect(label.textContent).toBe("number_1");
    });

    it("Uses placeholder from placeholder prop", () => {

        const numberInputComponent = NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "",
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.placeholder).toBe("50");
    });

    it ("Uses max value from props", () => {

        const numberInputComponent = NumberInput({
            max: "100",
            min: "",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "",
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.max).toBe("100");
    });

    it("Uses min value from props", () => {

        const numberInputComponent = NumberInput({
            max: "",
            min: "0",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "",
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.min).toBe("0");
    });

    it("Uses value from value prop", () => {

        const numberInputComponent = NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "",
            value: "24"
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.value).toBe("24");
    });

    it("Value getter returns current value", () => {

        const numberInputComponent = NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "",
            value: "24"
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInputComponent.getValue()).toBe("24");

        numberInput.value = "53";

        expect(numberInputComponent.getValue()).toBe("53");
    });

    it("Clear function sets the input's value to an empty string", () => {

        const numberInputComponent = NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "",
            value: "24"
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.value).toBe("24");

        numberInputComponent.clear();

        expect(numberInput.value).toBe("");
    });

    it("Calls onInput function when value is changed", () => {

        const onInput = jest.fn();

        const numberInputComponent = NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onInput: onInput,
            placeholder: "50",
            text: "",
        });

        render(numberInputComponent.element);
        const numberInput = document.querySelector("input[type='number']");
        changeElementValue(numberInput, 100);

        expect(onInput.mock.calls).toHaveLength(1);
        expect(numberInput.value).toBe("100");
    });
});