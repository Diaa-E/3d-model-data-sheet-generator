import NumberInput from "../NumberInput";

describe("Number Input Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
    });

    it("Renders a number input with a label", () => {

        render(NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onChange: () => {},
            placeholder: "50",
            text: "",
            required: false
        }));

        const numberInput = document.querySelector("input[type='number']");
        const label = document.querySelector("label");

        expect(numberInput).not.toBeNull();
        expect(label).not.toBeNull();
    });

    it("Renders label text from the text prop", () => {

        render(NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onChange: () => {},
            placeholder: "50",
            text: "number_1",
            required: false
        }));

        const label = document.querySelector("label");

        expect(label.textContent).toBe("number_1");
    });

    it("Uses placeholder from placeholder prop", () => {

        render(NumberInput({
            max: "",
            min: "",
            name: "number_1",
            onChange: () => {},
            placeholder: "50",
            text: "",
            required: false
        }));

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.placeholder).toBe("50");
    });

    it ("Uses max value from props", () => {

        render(NumberInput({
            max: "100",
            min: "",
            name: "number_1",
            onChange: () => {},
            placeholder: "50",
            text: "",
            required: false
        }));

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.max).toBe("100");
    });

    it("Uses min value from props", () => {

        render(NumberInput({
            max: "",
            min: "0",
            name: "number_1",
            onChange: () => {},
            placeholder: "50",
            text: "",
            required: false
        }));

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.min).toBe("0");
    });

    it("Adds required attribute when required prop is true", () => {

        render(NumberInput({
            max: "",
            min: "0",
            name: "number_1",
            onChange: () => {},
            placeholder: "50",
            text: "",
            required: true
        }));

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.required).toBeTruthy();
    });

    it("Removes required attribute when required prop is false", () => {

        render(NumberInput({
            max: "",
            min: "0",
            name: "number_1",
            onChange: () => {},
            placeholder: "50",
            text: "",
            required: false
        }));

        const numberInput = document.querySelector("input[type='number']");

        expect(numberInput.required).toBeFalsy();
    });

    it("Calls onChange function when value is changed", () => {

        const onChange = jest.fn();

        render(NumberInput({
            max: "",
            min: "0",
            name: "number_1",
            onChange: onChange,
            placeholder: "50",
            text: "",
            required: false
        }));

        const numberInput = document.querySelector("input[type='number']");
        changeElementValue(numberInput, 100);

        expect(onChange.mock.calls).toHaveLength(1);
        expect(numberInput.value).toBe("100");
    });
});