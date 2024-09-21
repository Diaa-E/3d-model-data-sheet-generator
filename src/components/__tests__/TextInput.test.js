import TextInput from "../TextInput";

describe("Text Input Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
    });

    it("Renders a text input with a label", () => {

        const textInputComponent = TextInput({
            autocomplete: "off",
            name: "text_1",
            onInput: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1"
        });

        render(textInputComponent.element);

        const textInput = document.querySelector("input[type='text']");
        const label = document.querySelector("label");

        expect(textInput).not.toBeNull();
        expect(label).not.toBeNull();
    });

    it("Renders label text from the text prop", () => {

        const textInputComponent = TextInput({
            autocomplete: "off",
            name: "text_1",
            onInput: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1"
        });

        render(textInputComponent.element);

        const label = document.querySelector("label");

        expect(label.textContent).toBe("text_1");   
    });

    it("Uses placeholder from placeholder prop", () => {

        const textInputComponent = TextInput({
            autocomplete: "off",
            name: "text_1",
            onInput: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1"
        });

        render(textInputComponent.element);

        const textInput = document.querySelector("input[type='text']");

        expect(textInput.placeholder).toBe("text_1");
    });

    it("Adds required attribute when required prop is true", () => {

        const textInputComponent = TextInput({
            autocomplete: "off",
            name: "text_1",
            onInput: () => {},
            placeholder: "text_1",
            required: true,
            text: "text_1"
        });

        render(textInputComponent.element);

        const textInput = document.querySelector("input[type='text']");

        expect(textInput.required).toBeTruthy();
    });

    it("Removes required attribute when required prop is false", () => {

        const textInputComponent = TextInput({
            autocomplete: "off",
            name: "text_1",
            onInput: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1"
        });

        render(textInputComponent.element);

        const textInput = document.querySelector("input[type='text']");

        expect(textInput.required).toBeFalsy();
    });

    it("Uses value from value prop", () => {

        const textInputComponent = TextInput({
            autocomplete: "off",
            name: "text_1",
            onInput: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1",
            value: "some value"
        });

        render(textInputComponent.element);

        const textInput = document.querySelector("input[type='text']");

        expect(textInput.value).toBe("some value");
    });

    it("Value getter returns current value", () => {

        const textInputComponent = TextInput({
            autocomplete: "off",
            name: "text_1",
            onInput: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1",
            value: "some value"
        });

        render(textInputComponent.element);

        expect(textInputComponent.getValue()).toBe("some value");

        const textInput = document.querySelector("input[type='text']");
        textInput.value = "new value";

        expect(textInputComponent.getValue()).toBe("new value");
    });

    it("Clear function sets the input's value to an empty string", () => {

        const textInputComponent = TextInput({
            autocomplete: "off",
            name: "text_1",
            onInput: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1",
            value: "some value"
        });

        render(textInputComponent.element);

        const textInput = document.querySelector("input[type='text']");
        
        expect(textInput.value).toBe("some value");

        textInputComponent.clear();

        expect(textInput.value).toBe("");
    });

    it("Calls onInput function when text value is changed", () => {

        const onInput = jest.fn();
        const textInputComponent = TextInput({
            autocomplete: "off",
            name: "text_1",
            onInput: onInput,
            placeholder: "text_1",
            required: false,
            text: "text_1"
        });

        render(textInputComponent.element);

        const textInput = document.querySelector("input[type='text']");
        changeElementValue(textInput, "some text");

        expect(onInput.mock.calls).toHaveLength(1);
        expect(textInput.value).toBe("some text");
    });
});