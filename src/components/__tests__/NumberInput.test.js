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
            required: false
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
            required: false
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
            required: false
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
            required: false
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
            required: false
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.min).toBe("0");
    });

    it("Adds required attribute when required prop is true", () => {

        const numberInputComponent = NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "",
            required: true
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.required).toBeTruthy();
    });

    it("Removes required attribute when required prop is false", () => {

        const numberInputComponent = NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "",
            required: false
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.required).toBeFalsy();
    });

    it("Uses value from value prop", () => {

        const numberInputComponent = NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onInput: () => {},
            placeholder: "50",
            text: "",
            required: false,
            value: "24"
        });

        render(numberInputComponent.element);

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.value).toBe("24");
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
            required: false
        });

        render(numberInputComponent.element);
        const numberInput = document.querySelector("input[type='number']");
        changeElementValue(numberInput, 100);

        expect(onInput.mock.calls).toHaveLength(1);
        expect(numberInput.value).toBe("100");
    });
});