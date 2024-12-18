import DatasheetForm from "../DatasheetForm";

describe("Datasheet Form Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
    });

    it("Renders a form", () => {

        render(
            DatasheetForm({
                fieldsets: [],
                formTitle: "test form",
                onSubmit: () => {}
            }).element
        );

        const form = document.querySelector("form");

        expect(form).not.toBeNull();
    });

    it("Renders a title from the title prop", () => {

        render(
            DatasheetForm({
                fieldsets: [],
                formTitle: "test form",
                onSubmit: () => {}
            }).element
        );

        const form = document.querySelector("form");
        const title = form.querySelector("h1");

        expect(title).not.toBeNull();
        expect(title.textContent).toBe("test form");
    });

    it("Renders elements passed in the fieldsets prop", () => {

        const fieldsets = ["child1", "child2", "child3"].map(child => {

            const element = document.createElement("div");
            element.textContent = child;
            
            return element;
        });

        expect.assertions(fieldsets.length)

        render(
            DatasheetForm({
                fieldsets: fieldsets,
                formTitle: "test form",
                onSubmit: () => {}
            }).element
        );

        const form = document.querySelector("form");
        const children = form.querySelectorAll("div");

        for (let i = 0; i <= fieldsets.length - 1; i++)
        {
            expect(children[i]).toBe(fieldsets[i]);
        }
    });

    it("Calls onSumbit function when form is submitted", () => {

        const onSubmit = jest.fn();

        render(
            DatasheetForm({
                fieldsets: [],
                formTitle: "test form",
                onSubmit: onSubmit
            }).element
        );

        const form = document.querySelector("form");
        form.submit();

        expect(onSubmit).toHaveBeenCalledTimes(1);
    })
});