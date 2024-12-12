import ItemCheckBoxFieldset from "../ItemCheckBoxFieldset";
import mockSessionStorage from "../../../../__mocks__/sessionStorageMock";

describe("Item Checkbox Fieldset Component", () => {

    beforeEach(() => {

        jest.resetAllMocks();
        mockSessionStorage();
        cleanup();
    });

    afterEach(() => {

        sessionStorage.clear();
    });

    it("Renders the main fieldset", () => {

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "",
            addItemPlaceholder: "",
            itemIcon: "",
        }).element);

        expect(document.querySelector("fieldset")).not.toBeNull();
    });

    it("Renders a legend for the main fieldset with text from props", () => {

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "",
            addItemPlaceholder: "",
            itemIcon: "",
        }).element);

        const fieldset = document.querySelectorAll("fieldset")[0];

        expect(fieldset.querySelector("legend")).not.toBeNull();
        expect(fieldset.querySelector("legend").textContent).toBe("test 1");
    });

    it("Each checkbox has the name attribute set to storageKey prop", () => {

        const items = ["testItem1", "testItem2"];
        sessionStorage.setItem("test1_user", JSON.stringify(items));

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "",
            addItemPlaceholder: "",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        for (let i = 0; i < items.length; i++)
        {
            expect(checkboxes[i].name).toBe("test1");
        }
    });

    it("All checkboxes are unchecked by default if the session storage has no selected options", () => {

        const items = ["testItem1", "testItem2"];
        sessionStorage.setItem("test1_user", JSON.stringify(items));

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "",
            addItemPlaceholder: "",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        for (let i = 0; i < items.length; i++)
        {
            expect(checkboxes[i].checked).toBe(false);
        }
    });

    it("Adds checked checkbox to session storage", () => {

        const items = ["testItem1", "testItem2"];
        sessionStorage.setItem("test1_user", JSON.stringify(items));

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "",
            addItemPlaceholder: "",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        checkboxes[0].click();

        expect(JSON.parse(sessionStorage.getItem("test1"))).toContain(items[0]);
    });

    it("Removes unchecked checkbox from session storage", () => {

        const items = ["testItem1", "testItem2"];
        sessionStorage.setItem("test1_user", JSON.stringify(items));

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "",
            addItemPlaceholder: "",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        checkboxes[0].click();

        expect(JSON.parse(sessionStorage.getItem("test1"))).toContain(items[0]);

        checkboxes[0].click()

        expect(JSON.parse(sessionStorage.getItem("test1"))).not.toContain(items[0]);
    });

    it("Uses saved values in session storage to check matching checkboxes", () => {

        const items = ["testItem1", "testItem2"];
        sessionStorage.setItem("test1_user", JSON.stringify(items));
        sessionStorage.setItem("test1", JSON.stringify(items[1]));

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "",
            addItemPlaceholder: "",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const checkboxes = fieldSet.querySelectorAll("input[type='checkbox']");

        expect(checkboxes[1].checked).toBe(true);
        expect(checkboxes[0].checked).toBe(false);
    });

    it("Renders a fieldset for adding a new item", () => {

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "",
            addItemPlaceholder: "",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];

        expect(fieldSet.querySelector("fieldset")).not.toBeNull();
    });

    it("Renders a legend with the text from props for the add item fieldset", () => {

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "add a new test item",
            addItemPlaceholder: "",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");

        expect(addOptionFieldset.querySelector("legend")).not.toBeNull();
        expect(addOptionFieldset.querySelector("legend").textContent).toBe("add a new test item");
    });

    it("Renders a text input inside the add item fieldset", () => {

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "add a new test item",
            addItemPlaceholder: "",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");

        expect(addOptionFieldset.querySelector("input[type='text']")).not.toBeNull();
    });

    it("Add item text input uses placeholder from props", () => {

        const items = ["testItem1", "testItem2"];

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            items: items,
            storageKey: "test1",
            addItemLegend: "add a new test item",
            addItemPlaceholder: "new test item",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");

        expect(addOptionFieldset.querySelector("input[type='text']").placeholder).toBe("new test item");
    });

    it("Renders an add option button inside the add item fieldset", () => {

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "add a new test item",
            addItemPlaceholder: "new test item",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");

        expect(addOptionFieldset.querySelector("button")).not.toBeNull();
        expect(addOptionFieldset.querySelector("button").textContent.toLowerCase()).toContain("add");
    });

    it("Adds a new checkbox to the checkbox group when the add new item button is clicked", () => {

        const items = ["testItem1", "testItem2"];
        sessionStorage.setItem("test1_user", JSON.stringify(items));
        
        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "add a new test item",
            addItemPlaceholder: "new test item",
            itemIcon: "",
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

    it("Saves new item to session storage when add item button is clicked", () => {

        render(ItemCheckBoxFieldset({

            legend: "test 1",
            storageKey: "test1",
            addItemLegend: "add a new test item",
            addItemPlaceholder: "new test item",
            itemIcon: "",
        }).element);

        const fieldSet = document.querySelectorAll("fieldset")[0];
        const addOptionFieldset = fieldSet.querySelector("fieldset");
        const newOptionInput = addOptionFieldset.querySelector("input[type='text']");
        const addOptionButton = addOptionFieldset.querySelector("button");

        newOptionInput.value = "testItem3";
        addOptionButton.click();

        expect(JSON.parse(sessionStorage.getItem("test1_user"))).toEqual(["testItem3"]);
    });
});