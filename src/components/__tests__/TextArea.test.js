import TextArea from "../TextArea";

describe("Text Area Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
    });

    it("Renders a text area with a label", () => {

        render(TextArea({
            cols: 30,
            rows: 10,
            onInput: () => {},
            placeholder: "text area",
            text: "text area"
        }));

        const textArea = document.querySelector("textarea");
        const label = document.querySelector("label");

        expect(textArea).not.toBeNull();
        expect(label).not.toBeNull();
    });

    it("Label uses text from text props", () => {

        render(TextArea({
            cols: 30,
            rows: 10,
            onInput: () => {},
            placeholder: "text area",
            text: "text area"
        }));

        const label = document.querySelector("label");

        expect(label.textContent).toBe("text area");
    });

    it("Uses cols attribute from props", () => {
        
        render(TextArea({
            cols: 50,
            rows: 10,
            onInput: () => {},
            placeholder: "text area",
            text: "text area"
        }));

        const textArea = document.querySelector("textarea");

        expect(textArea.cols).toBe(50);
    });

    it("Uses rows attribute from props", () => {

        render(TextArea({
            cols: 50,
            rows: 20,
            onInput: () => {},
            placeholder: "text area",
            text: "text area"
        }));

        const textArea = document.querySelector("textarea");

        expect(textArea.rows).toBe(20);
    });

    it("Uses placeholder from props", () => {

        render(TextArea({
            cols: 50,
            rows: 20,
            onInput: () => {},
            placeholder: "text area",
            text: "text area"
        }));

        const textArea = document.querySelector("textarea");

        expect(textArea.placeholder).toBe("text area");
    });

    it("Calls onInput function when text changes", () => {

        const onInput = jest.fn();

        render(TextArea({
            cols: 50,
            rows: 20,
            onInput: onInput,
            placeholder: "text area",
            text: "text area"
        }));

        const textArea = document.querySelector("textarea");
        changeElementValue(textArea, "some text");

        expect(onInput.mock.calls).toHaveLength(1);
        expect(textArea.value).toBe("some text");
    });
});