import FieldsContainer from "../FieldsContainer";

describe("Fields Container Component", () => {

    beforeEach(() => {
        
        cleanup();
        jest.resetAllMocks();
    })

    it("Renders a div container", () => {

        render(FieldsContainer({children: []}).element);
        const divCotnainer = document.querySelector("div");

        expect(divCotnainer).not.toBeNull();
    });

    it("Adds childrens from props to the container div", () => {

        const p = document.createElement("p");
        p.textContent = "some text";

        render(FieldsContainer({children: [p]}).element);
        const divCotnainer = document.querySelector("div");
        const paragraph = document.querySelector("p");

        expect(paragraph).not.toBeNull();
        expect(paragraph.textContent).toBe("some text");
        expect(paragraph.parentElement).toBe(divCotnainer);
    });
});