import RadioFieldset from "../RadioFieldSet";
import mockSessionStorage from "../../../../__mocks__/sessionStorageMock";

describe("Radio Fieldset Component", () => {

    beforeEach(() => {

        jest.resetAllMocks();
        mockSessionStorage();
        cleanup();
    });

    afterEach(() => {

        sessionStorage.clear();
    });

    it("Renders the main fieldset", () => {

        render(RadioFieldset({

            legend: "test 1",
            options: ["option1"],
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        expect(document.querySelector("fieldset")).not.toBeNull();
    });

    it("Renders a legend for the main fieldset with text from props", () => {

        render(RadioFieldset({

            legend: "test 1",
            options: ["option1"],
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];

        expect(fieldSet.querySelector("legend")).not.toBeNull();
        expect(fieldSet.querySelector("legend").textContent).toBe("test 1");
    });

    it("Renders a radio button for each option in props", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const radioButtons = fieldSet.querySelectorAll("input[type='radio']");

        for (let i = 0; i < options.length; i++)
        {
            expect(radioButtons[i].value).toBe(options[i]);
        }
    });

    it("Throws if options array is empty", () => {

        expect(() => RadioFieldset({

            legend: "test 1",
            options: [],
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        })).toThrow(/options/i);
    });

    it("Throws if options array is not an array", () => {

        expect(() => RadioFieldset({

            legend: "test 1",
            options: "text",
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        })).toThrow(/options/i);
    });

    it("Each radio button has the name attribute set to storageKey prop", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const radioButtons = fieldSet.querySelectorAll("input[type='radio']");

        for (let i = 0; i < options.length; i++)
        {
            expect(radioButtons[i].name).toBe("test1");
        }
    });

    it("First radio button is selected by default if the session storage has no selected options", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const radioButtons = fieldSet.querySelectorAll("input[type='radio']");

        expect(radioButtons[0].checked).toBeTruthy();
    });

    it("Checking a radio button unchecks other radio buttons", () => {

        const options = ["testOption1", "testOption2", "testOption3"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const radioButtons = fieldSet.querySelectorAll("input[type='radio']");

        radioButtons[2].click();

        expect(radioButtons[2].checked).toBeTruthy();
        expect(radioButtons[1].checked).toBeFalsy();
        expect(radioButtons[0].checked).toBeFalsy();
    });


    it("Saves selected option to session storage when a new radio button is checked", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const radioButtons = fieldSet.querySelectorAll("input[type='radio']");

        radioButtons[1].click();

        expect(radioButtons[1].checked).toBeTruthy();
        expect(JSON.parse(sessionStorage.getItem("test1"))).toBe(options[1]);
    });

    it("Uses saved value in session storage to check matching radio button", () => {

        const options = ["testOption1", "testOption2"];
        sessionStorage.setItem("test1", JSON.stringify(options[1]));

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const radioButtons = fieldSet.querySelectorAll("input[type='radio']");

        expect(radioButtons[1].checked).toBeTruthy();
    });

    it("Renders a fieldset for adding a new option when enableUserOptions prop is true", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];

        expect(fieldSet.querySelector("fieldset")).not.toBeNull();
    });

    it("Renders a legend with the text from props for the add option fieldset", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");

        expect(addOptionFieldset.querySelector("legend")).not.toBeNull();
        expect(addOptionFieldset.querySelector("legend").textContent).toBe("add a new test option");
    });

    it("Renders a text input inside the add option fieldset", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");

        expect(addOptionFieldset.querySelector("input[type='text']")).not.toBeNull();
    });

    it("Add option text input uses placeholder from props", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");

        expect(addOptionFieldset.querySelector("input[type='text']").placeholder).toBe("new test option");
    });

    it("Renders an add option button inside the add option fieldset", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");

        expect(addOptionFieldset.querySelector("button")).not.toBeNull();
        expect(addOptionFieldset.querySelector("button").textContent.toLowerCase()).toContain("add");
    });

    it("Adds a new radio button to the radio group when the add new option button is clicked", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");
        const newOptionInput = addOptionFieldset.querySelector("input[type='text']");
        const addOptionButton = addOptionFieldset.querySelector("button");

        newOptionInput.value = "testUserOption1";
        addOptionButton.click();

        expect(fieldSet.querySelectorAll("input[type='radio']").length).toBe(3);
        expect(fieldSet.querySelectorAll("input[type='radio']")[2].value).toBe("testUserOption1");
    });

    it("Saves new user option to session storage when add option button is clicked", () => {

        const options = ["testOption1", "testOption2"];

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");
        const newOptionInput = addOptionFieldset.querySelector("input[type='text']");
        const addOptionButton = addOptionFieldset.querySelector("button");

        newOptionInput.value = "testUserOption1";
        addOptionButton.click();

        expect(JSON.parse(sessionStorage.getItem("test1_user"))).toEqual(["testUserOption1"]);
    });

    it("Renders hardcoded options and user options if they exist in the session storage", () => {

        const userOptions = ["testUserOption1"];
        const options = ["testOption1", "testOption2"];
        const allOptions = [...options, ...userOptions];
        
        sessionStorage.setItem("test1_user", JSON.stringify(userOptions));

        render(RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const radioButtons = fieldSet.querySelectorAll("input[type='radio']");

        for (let i = 0; i < allOptions.length; i++)
        {
            expect(radioButtons[i].value).toBe(allOptions[i]);
        }
    });

    it("Resets selected option to firest option and user options to empty array when reset function is called", () => {

        const userOptions = ["testUserOption1"];
        const options = ["testOption1", "testOption2"];
        const selectedOption = "testOption2";

        sessionStorage.setItem("test1_user", JSON.stringify(userOptions));
        sessionStorage.setItem("test1", JSON.stringify(selectedOption));

        const fieldset = RadioFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        });

        render(fieldset.element);

        expect(JSON.parse(sessionStorage.getItem("test1_user"))).toEqual(userOptions);
        expect(JSON.parse(sessionStorage.getItem("test1"))).toEqual(selectedOption);

        fieldset.reset();

        expect(JSON.parse(sessionStorage.getItem("test1_user"))).toEqual([]);
        expect(JSON.parse(sessionStorage.getItem("test1"))).toEqual(options[0]);
    });
});