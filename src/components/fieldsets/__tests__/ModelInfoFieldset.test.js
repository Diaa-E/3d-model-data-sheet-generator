import mockSessionStorage from "../../../../__mocks__/sessionStorageMock";
import ModelInfoFieldset from "../ModelInfoFieldset";

describe("Model Info Fieldset Component", () => {

    beforeEach(() => {

        jest.resetAllMocks();
        mockSessionStorage();
        cleanup();
    });

    afterEach(() => {

        sessionStorage.clear();
    });

    it("Renders a fieldset", () => {

        render(ModelInfoFieldset({
            storageKey: "test1"
        }).element);

        expect(document.querySelector("fieldset")).not.toBeNull();
    });

    it("Renders a legend with correct text", () => {

        render(ModelInfoFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");

        expect(fieldset.querySelector("legend")).not.toBeNull();
        expect(fieldset.querySelector("legend").textContent).toMatch(/model\sinformation/i);
    });

    it("Renders a labeled text input for model title", () => {

        render(ModelInfoFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const titleInput = fieldset.querySelector("input[type='text']");
        const titleInputLabel = fieldset.querySelector(`label[for='${titleInput.id}']`);

        expect(titleInput).not.toBeNull();
        expect(titleInput.placeholder).toMatch(/title/i);
        expect(titleInputLabel).not.toBeNull();
        expect(titleInputLabel.textContent).toMatch(/title/i);
    });

    it("Renders a labeled text area for model desciprtion", () => {

        render(ModelInfoFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const descTextarea = fieldset.querySelector("textarea");
        const descTextareaLabel = fieldset.querySelector(`label[for="${descTextarea.id}"]`);

        expect(descTextarea).not.toBeNull();
        expect(descTextarea.placeholder).toMatch(/description/i);
        expect(descTextareaLabel).not.toBeNull();
        expect(descTextareaLabel.textContent).toMatch(/description/i);
    });

    it("Saves title to session storage when title field receives input", () => {

        render(ModelInfoFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const titleInput = fieldset.querySelector("input[type='text']");
        changeElementValue(titleInput, "test text");

        expect(JSON.parse(sessionStorage.getItem("test1")).title).toBe("test text");
    });

    it("Saves description to session storage when description field receives inpu", () => {

        render(ModelInfoFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const descTextarea = fieldset.querySelector("textarea");
        changeElementValue(descTextarea, "test text");

        expect(JSON.parse(sessionStorage.getItem("test1")).description).toBe("test text");
    });

    it("Populates title field with value saved in session storage", () => {

        sessionStorage.setItem("test1", JSON.stringify({title: "test text", description: ""}));

        render(ModelInfoFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const titleInput = fieldset.querySelector("input[type='text']");

        expect(titleInput.value).toBe("test text");
    });

    it("Populates description field with value saved in session storage", () => {

        sessionStorage.setItem("test1", JSON.stringify({title: "", description: "test text"}));

        render(ModelInfoFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const descTextarea = fieldset.querySelector("textarea");

        expect(descTextarea.value).toBe("test text");
    });

    it("Validating throws when title field is empty", () => {

        const modelInfoComponent = ModelInfoFieldset({
            storageKey: "test1"
        });

        render(modelInfoComponent.element);

        const fieldset = document.querySelector("fieldset");
        const titleInput = fieldset.querySelector("input[type='text']");
        changeElementValue(titleInput, "");

        expect(() => modelInfoComponent.validate()).toThrow(/title/i);
    });

    it("Validating throws when description field is empty", () => {

        const modelInfoComponent = ModelInfoFieldset({
            storageKey: "test1"
        });

        render(modelInfoComponent.element);

        const fieldset = document.querySelector("fieldset");
        const descTextarea = fieldset.querySelector("textarea");
        const titleInput = fieldset.querySelector("input[type='text']");
        changeElementValue(titleInput, "some value");
        changeElementValue(descTextarea, "");

        expect(() => modelInfoComponent.validate()).toThrow(/description/i)
    });

    it("Resets state to initial value when rest funciton is called", () => {

        sessionStorage.setItem("test1", JSON.stringify({title: "test title", description: "test text"}));

        const fieldset = ModelInfoFieldset({
            storageKey: "test1"
        });

        render(fieldset.element);

        expect(JSON.parse(sessionStorage.getItem("test1"))).toEqual({title: "test title", description: "test text"});

        fieldset.reset();

        expect(JSON.parse(sessionStorage.getItem("test1"))).toEqual({title: "", description: ""});
    });
});