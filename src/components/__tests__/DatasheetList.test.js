import DatasheetList from "../DatasheetList";

describe("Datasheet List Component", () => {

    beforeEach(() => {
        
        jest.resetAllMocks();
        cleanup();
    });

    it("Returns an ordered list when ordered prop is true", () => {

        render(
            DatasheetList({
                ordered: true,
                list: ["test1", "test2"]
            }).element
        );

        const orderedList = document.querySelector("ol");

        expect(orderedList).not.toBeNull();
    });

    it("Returns an unordered list when ordered prop is false", () => {

        render(
            DatasheetList({
                ordered: false,
                list: ["test1", "test2"]
            }).element
        );

        const unorderedList = document.querySelector("ul");

        expect(unorderedList).not.toBeNull();
    });

    it("Adds list item to the ordered list from the list prop", () => {

        const list = [
            "test1",
            "test2"
        ];

        render(
            DatasheetList({
                ordered: true,
                list: list
            }).element
        );

        const orderedList = document.querySelector("ol");
        const listItems = orderedList.querySelectorAll("li");

        expect(listItems.length).toBe(list.length);

        for (const item of listItems)
        {
            expect(list.includes(item.textContent))
        }
    });

    it("Adds list item to the unordered list from the list prop", () => {

        const list = [
            "test1",
            "test2"
        ];

        render(
            DatasheetList({
                ordered: false,
                list: list
            }).element
        );

        const unorderedList = document.querySelector("ul");
        const listItems = unorderedList.querySelectorAll("li");

        expect(listItems.length).toBe(list.length);
        
        for (const item of listItems)
        {
            expect(list.includes(item.textContent))
        }
    });

    it("Sorts items in ascending order when ordered prop is true", () => {

        const list = [
            "b",
            "c",
            "a",
        ];

        render(
            DatasheetList({
                ordered: true,
                list: list
            }).element
        );

        const orderedList = document.querySelector("ol");
        const listItems = orderedList.querySelectorAll("li");

        expect(listItems[0].textContent).toBe("a");
        expect(listItems[1].textContent).toBe("b");
        expect(listItems[2].textContent).toBe("c");
    });

    it("Does not Sort items  when ordered prop is false", () => {

        const list = [
            "b",
            "c",
            "a",
        ];

        render(
            DatasheetList({
                ordered: false,
                list: list
            }).element
        );

        const orderedList = document.querySelector("ul");
        const listItems = orderedList.querySelectorAll("li");

        expect(listItems[0].textContent).toBe("b");
        expect(listItems[1].textContent).toBe("c");
        expect(listItems[2].textContent).toBe("a");
    });
});