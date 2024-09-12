import TextInput from "../TextInput";

describe("Text Input Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
    });

    it("Renders a text input with a label", () => {

        render(TextInput({
            autocomplete: "off",
            name: "text_1",
            onChange: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1"
        }));

        const textInput = document.querySelector("input[type='text']");
        const label = document.querySelector("label");

        expect(textInput).not.toBeNull();
        expect(label).not.toBeNull();
    });

    it("Renders label text from the text prop", () => {

        render(TextInput({
            autocomplete: "off",
            name: "text_1",
            onChange: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1"
        }));

        const label = document.querySelector("label");

        expect(label.textContent).toBe("text_1");   
    });

    it("Uses placeholder from placeholder prop", () => {

        render(TextInput({
            autocomplete: "off",
            name: "text_1",
            onChange: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1"
        }));

        const textInput = document.querySelector("input[type='text']");

        expect(textInput.placeholder).toBe("text_1");
    });

    it("Adds required attribute when required prop is true", () => {

        render(TextInput({
            autocomplete: "off",
            name: "text_1",
            onChange: () => {},
            placeholder: "text_1",
            required: true,
            text: "text_1"
        }));

        const textInput = document.querySelector("input[type='text']");

        expect(textInput.required).toBeTruthy();
    });

    it("Removes required attribute when required prop is false", () => {

        render(TextInput({
            autocomplete: "off",
            name: "text_1",
            onChange: () => {},
            placeholder: "text_1",
            required: false,
            text: "text_1"
        }));

        const textInput = document.querySelector("input[type='text']");

        expect(textInput.required).toBeFalsy();
    });

    it("Calls onChange function when text value is changed", () => {

        const onChange = jest.fn();

        render(TextInput({
            autocomplete: "off",
            name: "text_1",
            onChange: onChange,
            placeholder: "text_1",
            required: false,
            text: "text_1"
        }));

        const textInput = document.querySelector("input[type='text']");
        changeElementValue(textInput, "some text");

        expect(onChange.mock.calls).toHaveLength(1);
        expect(textInput.value).toBe("some text");
    });
});