import mockSessionStorage from "../../../../__mocks__/sessionStorageMock";
import PolyCountFieldset from "../PolyCountFieldset";

describe("Polycount Fieldset Component", () => {

    beforeEach(() => {

        jest.resetAllMocks();
        mockSessionStorage();
        cleanup();
    });

    afterEach(() => {

        sessionStorage.clear();
    });

    it("Renders a fieldset", () => {

        render(PolyCountFieldset({
            storageKey: "test1"
        }).element);

        expect(document.querySelector("fieldset")).not.toBeNull();
    });

    it("Renders a legend with correct text", () => {

        render(PolyCountFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const legend = fieldset.querySelector("legend");

        expect(legend).not.toBeNull();
        expect(legend.textContent).toMatch(/polygon\scount/i);
    });

    it("Renders a labeled number input for vertex count", () => {

        render(PolyCountFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const vertextNumberInput = fieldset.querySelector("input[name='vertices'][type='number']");
        const vertextLabel = fieldset.querySelector(`label[for="${vertextNumberInput.id}"]`);

        expect(vertextNumberInput).not.toBeNull();
        expect(vertextNumberInput.placeholder).toMatch(/vertices/i);
        expect(vertextLabel).not.toBeNull();
        expect(vertextLabel.textContent).toMatch(/vertices/i);
    });

    it("Renders a labeled number input for triangle count", () => {

        render(PolyCountFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const triangleNumberInput = fieldset.querySelector("input[name='triangles'][type='number']");
        const triangleLabel = fieldset.querySelector(`label[for="${triangleNumberInput.id}"]`);

        expect(triangleNumberInput).not.toBeNull();
        expect(triangleNumberInput.placeholder).toMatch(/triangles/i);
        expect(triangleLabel).not.toBeNull();
        expect(triangleLabel.textContent).toMatch(/triangles/i);
    });

    it("Saves vertex count to session storage when vertex field receives input", () => {

        render(PolyCountFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const vertextNumberInput = fieldset.querySelector("input[name='vertices'][type='number']");
        changeElementValue(vertextNumberInput, "15");

        expect(JSON.parse(sessionStorage.getItem("test1")).vertices).toBe("15");
    });

    it("Saves triangle count to session storage when trianlg efield receives input", () => {

        render(PolyCountFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const triangleNumberInput = fieldset.querySelector("input[name='triangles'][type='number']");
        changeElementValue(triangleNumberInput, "30");

        expect(JSON.parse(sessionStorage.getItem("test1")).triangles).toBe("30");
    });

    it("Populates vertex count field with value from session storage", () => {

        sessionStorage.setItem("test1", JSON.stringify({triangles: "", vertices: "15"}));

        render(PolyCountFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const vertextNumberInput = fieldset.querySelector("input[name='vertices'][type='number']");

        expect(vertextNumberInput.value).toBe("15");
    });

    it("Populates triangle count field with value from session storage", () => {

        sessionStorage.setItem("test1", JSON.stringify({triangles: "30", vertices: ""}));

        render(PolyCountFieldset({
            storageKey: "test1"
        }).element);

        const fieldset = document.querySelector("fieldset");
        const triangleNumberInput = fieldset.querySelector("input[name='triangles'][type='number']");

        expect(triangleNumberInput.value).toBe("30");
    });

    it("Resets state to initial values when reset function is called", () => {

        sessionStorage.setItem("test1", JSON.stringify({triangles: "30", vertices: "20"}));

        const fieldset = PolyCountFieldset({
            storageKey: "test1"
        });

        render(fieldset.element);

        expect(JSON.parse(sessionStorage.getItem("test1"))).toEqual({triangles: "30", vertices: "20"});

        fieldset.reset();

        expect(JSON.parse(sessionStorage.getItem("test1"))).toEqual({triangles: "", vertices: ""});
    });
});