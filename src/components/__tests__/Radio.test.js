import Radio from "../Radio";

describe("Radio component", () => {

    beforeEach(() => {
        
        cleanup();
        jest.resetAllMocks();
    }) ;

    it("Returns a radio input with a label", () => {

        render(Radio({name: "option", onChange: () => {}, text: "radio_1", value: "radio_1"}));

        const radioButton = document.querySelector('input[type="radio"]');
        const label = document.querySelector("label");

        expect(radioButton).not.toBeNull();
        expect(label).not.toBeNull();
    });

    it("Label uses the text from the text prop", () => {

        render(Radio({name: "option", onChange: () => {}, text: "radio_1", value: "radio_1"}));

        const label = document.querySelector("label");

        expect(label.textContent).toBe("radio_1");
    });

    it("Radio button uses the value from the props", () => {

        render(Radio({name: "option", onChange: () => {}, text: "radio_1", value: "radio_1"}));

        const radioButton = document.querySelector('input[type="radio"]');

        expect(radioButton.value).toBe("radio_1");
    });

    it("Radio button uses the name from the props", () => {

        render(Radio({name: "option", onChange: () => {}, text: "radio_1", value: "radio_1"}));

        const radioButton = document.querySelector('input[type="radio"]');

        expect(radioButton.name).toBe("option");
    });

    it("Radio button is checked when label is clicked", () => {

        render(Radio({name: "option", onChange: () => {}, text: "radio_1", value: "radio_1"}));

        const label = document.querySelector("label");
        const radioButton = document.querySelector('input[type="radio"]');

        expect(radioButton.checked).toBeFalsy();

        label.click();

        expect(radioButton.checked).toBeTruthy();
    });

    it("Calls onChange function when radio button is checked", () => {

        const onChange = jest.fn();

        render(Radio({name: "option", onChange: onChange, text: "radio_1", value: "radio_1"}));

        const radioButton = document.querySelector('input[type="radio"]');
        radioButton.click();

        expect(onChange.mock.calls).toHaveLength(1);
    });

    it("Does not call onChange function when radio button is unchecked", () => {

        const onChange = jest.fn();

        render(Radio({name: "option", onChange: onChange, text: "radio_1", value: "radio_1"}));
        render(Radio({name: "option", onChange: () => {}, text: "radio_2", value: "radio_2"}));

        const radioButton1 = document.querySelectorAll('input[type="radio"]')[0];
        const radioButton2 = document.querySelectorAll('input[type="radio"]')[1];
        radioButton1.click();
        radioButton2.click();

        expect(onChange.mock.calls).toHaveLength(1);
    });
});