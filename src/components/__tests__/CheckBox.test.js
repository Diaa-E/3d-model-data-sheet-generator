import CheckBox from "../CheckBox";

describe("CheckBox component", () => {

    beforeEach(() => {
        
        jest.restoreAllMocks();
        cleanup();
    });

    it("Returns a checkbox input with a label", () => {

        render(CheckBox({name: "option_1", text: "value_1", value: "value_1"}));

        expect(document.querySelector("label")).not.toBeNull();
        expect(document.querySelector("input[type='checkbox']")).not.toBeNull();
    });

    it("Label uses the text from the text prop", () => {

        render(CheckBox({name: "option_1", text: "value_1", value: "value_1"}));

        expect(document.querySelector("label").textContent).toBe("value_1");
    });

    it("checkbox uses the value from the value prop", () => {

        render(CheckBox({name: "option_1", text: "value_1", value: "value_1"}));

        expect(document.querySelector("input[type='checkbox']").value).toBe("value_1");
    });

    it("checkbox uses the name from the name prop", () => {

        render(CheckBox({name: "option_1", text: "value_1", value: "value_1"}));

        expect(document.querySelector("input[type='checkbox']").name).toBe("option_1");
    });

    it("Checks checkbox when checked prop is true", () => {

        render(CheckBox({name: "option_1", text: "value_1", value: "value_1", checked: true}));

        expect(document.querySelector("input[type='checkbox']").checked).toBe(true);
    });

    it("Unchecks checkbox when checked prop is true", () => {

        render(CheckBox({name: "option_1", text: "value_1", value: "value_1", checked: false}));

        expect(document.querySelector("input[type='checkbox']").checked).toBe(false);
    });

    it("Checkbox is checked when label is clicked", () => {

        render(CheckBox({name: "option_1", text: "value_1", value: "value_1"}));

        const checkBox = document.querySelector("input[type='checkbox']");
        const label = document.querySelector("label");

        expect(checkBox.checked).toBe(false);

        label.click();

        expect(checkBox.checked).toBe(true);
    });

    it("Calls onChange function when checkbox is checked", () => {

        const onChange = jest.fn();

        render(CheckBox({name: "option_1", text: "value_1", value: "value_1", onChange: onChange}));

        const checkBox = document.querySelector("input[type='checkbox']");
        checkBox.click();

        expect(onChange.mock.calls).toHaveLength(1);
    });

    it("Calls onChange function when checkbox is unchecked", () => {

        const onChange = jest.fn();

        render(CheckBox({name: "option_1", text: "value_1", value: "value_1", onChange: onChange}));

        const checkBox = document.querySelector("input[type='checkbox']");
        checkBox.click();
        checkBox.click();

        expect(onChange.mock.calls).toHaveLength(2);
    });
});