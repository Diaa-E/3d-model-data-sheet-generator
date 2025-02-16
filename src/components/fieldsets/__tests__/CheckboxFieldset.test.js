import CheckboxFieldset from "../CheckboxFieldset";
import mockSessionStorage from "../../../../__mocks__/sessionStorageMock";

describe("Checkbox Fieldset Component", () => {

    beforeEach(() => {

        jest.resetAllMocks();
        mockSessionStorage();
        cleanup();
    });

    afterEach(() => {

        sessionStorage.clear();
    });

    it("Renders the main fieldset", () => {

        render(CheckboxFieldset({

            legend: "test 1",
            options: [],
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        expect(document.querySelector("fieldset")).not.toBeNull();
    });

    it("Renders a legend for the main fieldset with text from props", () => {

        render(CheckboxFieldset({

            legend: "test 1",
            options: [],
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldset = document.querySelectorAll("fieldset")[0];

        expect(fieldset.querySelector("legend")).not.toBeNull();
        expect(fieldset.querySelector("legend").textContent).toBe("test 1");
    });

    it("Renders a checkbox for each option in props", () => {

        const options = ["testOption1", "testOption2"];

        render(CheckboxFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        for (let i = 0; i < options.length; i++)
        {
            expect(checkboxes[i].value).toBe(options[i]);
        }
    });

    it("Each checkbox has the name attribute set to storageKey prop", () => {

        const options = ["testOption1", "testOption2"];

        render(CheckboxFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        for (let i = 0; i < options.length; i++)
        {
            expect(checkboxes[i].name).toBe("test1");
        }
    });

    it("All checkboxes are unchecked by default if the session storage has no selected options", () => {

        const options = ["testOption1", "testOption2"];

        render(CheckboxFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        for (let i = 0; i < options.length; i++)
        {
            expect(checkboxes[i].checked).toBe(false);
        }
    });

    it("Adds checked checkbox to session storage", () => {

        const options = ["testOption1", "testOption2"];

        render(CheckboxFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        checkboxes[0].click();

        expect(JSON.parse(sessionStorage.getItem("test1"))).toContain(options[0]);
    });

    it("Removes unchecked checkbox from session storage", () => {

        const options = ["testOption1", "testOption2"];

        render(CheckboxFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        checkboxes[0].click();

        expect(JSON.parse(sessionStorage.getItem("test1"))).toContain(options[0]);

        checkboxes[0].click()

        expect(JSON.parse(sessionStorage.getItem("test1"))).not.toContain(options[0]);
    });

    it("Uses saved values in session storage to check matching checkboxes", () => {

        const options = ["testOption1", "testOption2"];
        sessionStorage.setItem("test1", JSON.stringify(options[1]));

        render(CheckboxFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: false,
            userOptionLegend: "",
            userOptionPlaceholder: ""
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        expect(checkboxes[1].checked).toBe(true);
        expect(checkboxes[0].checked).toBe(false);
    });

    it("Renders a fieldset for adding a new option when enableUserOptions prop is true", () => {

        const options = ["testOption1", "testOption2"];

        render(CheckboxFieldset({

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

        render(CheckboxFieldset({

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

        render(CheckboxFieldset({

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

        render(CheckboxFieldset({

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

        render(CheckboxFieldset({

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

    it("Adds a new checkbox to the checkbox group when the add new option button is clicked", () => {

        const options = ["testOption1", "testOption2"];

        render(CheckboxFieldset({

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

        expect(fieldSet.querySelectorAll("input[type='checkbox']").length).toBe(3);
        expect(fieldSet.querySelectorAll("input[type='checkbox']")[2].value).toBe("testUserOption1");
    });

    it("Saves new user option to session storage when add option button is clicked", () => {

        const options = ["testOption1", "testOption2"];

        render(CheckboxFieldset({

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

        render(CheckboxFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const radioButtons = fieldSet.querySelectorAll("input[type='checkbox']");

        for (let i = 0; i < allOptions.length; i++)
        {
            expect(radioButtons[i].value).toBe(allOptions[i]);
        }
    });

    it("Resets selected options and user options to empty arrays when reset function is called", () => {

        const userOptions = ["testUserOption1"];
        const options = ["testOption1", "testOption2"];
        const selectedOptions = ["testOption1"];

        sessionStorage.setItem("test1_user", JSON.stringify(userOptions));
        sessionStorage.setItem("test1", JSON.stringify(selectedOptions));

        const fieldset = CheckboxFieldset({

            legend: "test 1",
            options: options,
            storageKey: "test1",
            enableUserOptions: true,
            userOptionLegend: "add a new test option",
            userOptionPlaceholder: "new test option"
        });

        render(fieldset.element);

        expect(JSON.parse(sessionStorage.getItem("test1_user"))).toEqual(userOptions);
        expect(JSON.parse(sessionStorage.getItem("test1"))).toEqual(selectedOptions);

        fieldset.reset();

        expect(JSON.parse(sessionStorage.getItem("test1_user"))).toEqual([]);
        expect(JSON.parse(sessionStorage.getItem("test1"))).toEqual([]);
    });
});