import mockSessionStorage from "../../../../__mocks__/sessionStorageMock";
import ModelContentsFieldset from "../ModelContentsFieldset";

describe("Model Contents Component", () => {

    beforeEach(() => {

        jest.resetAllMocks();
        mockSessionStorage();
        cleanup();
    });

    afterEach(() => {

        sessionStorage.clear();
    });

    it("Renders a fieldset", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        expect(document.querySelector("fieldset")).not.toBeNull();
    });

    it("Renders a legend with correct text", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const legend = fieldset.querySelector("legend");

        expect(legend).not.toBeNull();
        expect(legend.textContent).toMatch(/model\scontents/i);
    });

    it("Renders a second fieldset for adding new items", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");

        expect(addItemFieldset).not.toBeNull();
    });

    it("Renders a legend for second fieldset with correct text", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const legend = addItemFieldset.querySelector("legend");

        expect(legend).not.toBeNull();
        expect(legend.textContent).toMatch(/add\sa\snew/i);
    });

    it("Renders a labeled text input for item's name", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");
        const nameInputLabel = addItemFieldset.querySelector(`label[for='${nameInput.id}']`);

        expect(nameInput).not.toBeNull();
        expect(nameInput.placeholder).toMatch(/name/i);
        expect(nameInputLabel).not.toBeNull();
        expect(nameInputLabel.textContent).toMatch(/name/i);
    });

    it("Renders a labeled number input for item's count", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const countInputLabel = addItemFieldset.querySelector(`label[for='${countInput.id}']`);

        expect(countInput).not.toBeNull();
        expect(countInput.placeholder).toMatch(/count/i);
        expect(countInputLabel).not.toBeNull();
        expect(countInputLabel.textContent).toMatch(/count/i);
    });

    it("Renders an add item button", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");

        expect(addItemButton).not.toBeNull();
        expect(addItemButton.textContent).toMatch(/add/i);
    });

    it("Renders an unordered list", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const ul = fieldset.querySelector("ul");

        expect(ul).not.toBeNull();
    });

    it("Unordered list renders an empty list text when it has no list items", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const ul = fieldset.querySelector("ul");

        expect(ul.textContent).toMatch(/no\sitems/i);
    });

    it("Adds a list item to the unordered list with the correct name and count when add item button is clicked", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");
        const ul = fieldset.querySelector("ul");

        expect(ul.querySelectorAll("li")).toHaveLength(0);

        countInput.value = "5";
        nameInput.value = "testItem";
        addItemButton.click();

        expect(ul.querySelectorAll("li")).toHaveLength(1);
        expect(ul.querySelectorAll("li")[0].textContent).toContain("testItem");
        expect(ul.querySelectorAll("li")[0].textContent).toContain("5");
    });

    it("Clears input fields after a new item is added", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");
        const ul = fieldset.querySelector("ul");

        expect(ul.querySelectorAll("li")).toHaveLength(0);

        countInput.value = "5";
        nameInput.value = "testItem";
        addItemButton.click();

        expect(ul.querySelectorAll("li")).toHaveLength(1);
        expect(countInput.value).toBe("");
        expect(nameInput.value).toBe("");
    });

    it("Deletes correct item from list when delete button is clicked (first item)", () => {

        const items = [];

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");
        const ul = fieldset.querySelector("ul");

        for (let i = 0; i < 5; i++)
        {
            items.push({name: `item${i}`, count: `${i}`});

            countInput.value = items[i].count;
            nameInput.value = items[i].name;
            addItemButton.click();
        }

        const listItems = ul.querySelectorAll("li");
        const deleteItemButton = Array.from(listItems[0].querySelectorAll("button"))
        .find(button => /delete/i.test(button.textContent));
        deleteItemButton.click();

        const updateListItems = ul.querySelectorAll("li");

        expect(updateListItems).toHaveLength(4);
        
        updateListItems.forEach(item => {

            expect(item.textContent).not.toContain(items[0].name);
        });
    });

    it("Deletes correct item from list when delete button is clicked (middle item)", () => {

        const items = [];

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");
        const ul = fieldset.querySelector("ul");

        for (let i = 0; i < 5; i++)
        {
            items.push({name: `item${i}`, count: `${i}`});

            countInput.value = items[i].count;
            nameInput.value = items[i].name;
            addItemButton.click();
        }

        const listItems = ul.querySelectorAll("li");
        const deleteItemButton = Array.from(listItems[2].querySelectorAll("button"))
        .find(button => /delete/i.test(button.textContent));
        deleteItemButton.click();

        const updateListItems = ul.querySelectorAll("li");

        expect(updateListItems).toHaveLength(4);
        
        updateListItems.forEach(item => {

            expect(item.textContent).not.toContain(items[2].name);
        });
    });

    it("Deletes correct item from list when delete button is clicked (last item)", () => {

        const items = [];

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");
        const ul = fieldset.querySelector("ul");

        for (let i = 0; i < 5; i++)
        {
            items.push({name: `item${i}`, count: `${i}`});

            countInput.value = items[i].count;
            nameInput.value = items[i].name;
            addItemButton.click();
        }

        const listItems = ul.querySelectorAll("li");
        const deleteItemButton = Array.from(listItems[4].querySelectorAll("button"))
        .find(button => /delete/i.test(button.textContent));
        deleteItemButton.click();

        const updateListItems = ul.querySelectorAll("li");

        expect(updateListItems).toHaveLength(4);
        
        updateListItems.forEach(item => {

            expect(item.textContent).not.toContain(items[4].name);
        });
    });

    it("Adds new item name and count to session storage", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");
        const ul = fieldset.querySelector("ul");

        expect(ul.querySelectorAll("li")).toHaveLength(0);

        countInput.value = "5";
        nameInput.value = "testItem";
        addItemButton.click();

        expect(ul.querySelectorAll("li")).toHaveLength(1);

        const storageArray = JSON.parse(sessionStorage.getItem("test1"))
        expect(storageArray).toBeInstanceOf(Array);
        expect(storageArray).toHaveLength(1);
        expect(Object.values(storageArray[0])).toContain("5");
        expect(Object.values(storageArray[0])).toContain("testItem");
    });

    it("Deletes correct item from session storage when delete button is clicked (first item)", () => {

        const items = [];

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");
        const ul = fieldset.querySelector("ul");

        for (let i = 0; i < 5; i++)
        {
            items.push({name: `item${i}`, count: `${i}`});

            countInput.value = items[i].count;
            nameInput.value = items[i].name;
            addItemButton.click();
        }

        const listItems = ul.querySelectorAll("li");
        const deleteItemButton = Array.from(listItems[0].querySelectorAll("button"))
        .find(button => /delete/i.test(button.textContent));
        deleteItemButton.click();

        const storageArray = JSON.parse(sessionStorage.getItem("test1"));

        expect(storageArray).toHaveLength(4);
        
        storageArray.forEach(item => {

            expect(Object.values(item)).not.toContain(items[0].name);
        });
    });

    it("Deletes correct item from session storage when delete button is clicked (middle item)", () => {

        const items = [];

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");
        const ul = fieldset.querySelector("ul");

        for (let i = 0; i < 5; i++)
        {
            items.push({name: `item${i}`, count: `${i}`});

            countInput.value = items[i].count;
            nameInput.value = items[i].name;
            addItemButton.click();
        }

        const listItems = ul.querySelectorAll("li");
        const deleteItemButton = Array.from(listItems[2].querySelectorAll("button"))
        .find(button => /delete/i.test(button.textContent));
        deleteItemButton.click();

        const storageArray = JSON.parse(sessionStorage.getItem("test1"));

        expect(storageArray).toHaveLength(4);
        
        storageArray.forEach(item => {

            expect(Object.values(item)).not.toContain(items[2].name);
        });
    });

    it("Deletes correct item from session storage when delete button is clicked (last item)", () => {

        const items = [];

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");
        const ul = fieldset.querySelector("ul");

        for (let i = 0; i < 5; i++)
        {
            items.push({name: `item${i}`, count: `${i}`});

            countInput.value = items[i].count;
            nameInput.value = items[i].name;
            addItemButton.click();
        }

        const listItems = ul.querySelectorAll("li");
        const deleteItemButton = Array.from(listItems[4].querySelectorAll("button"))
        .find(button => /delete/i.test(button.textContent));
        deleteItemButton.click();

        const storageArray = JSON.parse(sessionStorage.getItem("test1"));

        expect(storageArray).toHaveLength(4);
        
        storageArray.forEach(item => {

            expect(Object.values(item)).not.toContain(items[4].name);
        });
    });

    it("Adds a list item to the unordered list from session storage", () => {

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const addItemFieldset = fieldset.querySelector("fieldset");
        const addItemButton = addItemFieldset.querySelector("button");
        const countInput = addItemFieldset.querySelector("input[type='number'][name='itemCount']");
        const nameInput = addItemFieldset.querySelector("input[type='text'][name='itemName']");

        countInput.value = "5";
        nameInput.value = "testItem";
        addItemButton.click();

        cleanup();

        render(ModelContentsFieldset({
            storageKey: "test1"
        }).element);

        const ul = fieldset.querySelector("ul")

        expect(ul.querySelectorAll("li")).toHaveLength(1);
        expect(ul.querySelectorAll("li")[0].textContent).toContain("testItem");
        expect(ul.querySelectorAll("li")[0].textContent).toContain("5");
    });
});