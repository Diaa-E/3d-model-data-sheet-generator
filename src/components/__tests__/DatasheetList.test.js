import DatasheetList from "../DatasheetList";

jest.mock("../../utils/formattingTokens.js", () => ({
    __esModule: true,
    formattingTokens : {
        target1: {
            heading: "h1",
            bold: "b1",
            ul: "ul1",
            ol: "ol1",
            break: "br1",
        },
        target2: {
            heading: "h2",
            bold: "b2",
            ul: "ul2",
            ol: "ol2",
            break: "br2",
        },
    }
}));

import { formattingTokens } from "../../utils/formattingTokens";

describe("Datasheet List Component", () => {

    beforeEach(() => {
        
        jest.resetAllMocks();
        cleanup();
    });

    const targets = ["target1", "target2"];

    it("Returns an ordered list when ordered prop is true", () => {

        render(
            DatasheetList({
                ordered: true,
                list: ["test1", "test2"],
                targetSite: targets[0]
            }).element
        );

        const orderedList = document.querySelector("ol");

        expect(orderedList).not.toBeNull();
    });

    it("Returns an unordered list when ordered prop is false", () => {

        render(
            DatasheetList({
                ordered: false,
                list: ["test1", "test2"],
                targetSite: targets[0]
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
                list: list,
                targetSite: targets[0]
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
                list: list,
                targetSite: targets[0]
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
                list: list,
                targetSite: targets[0]
            }).element
        );

        const orderedList = document.querySelector("ol");
        const listItems = orderedList.querySelectorAll("li");

        expect(listItems[0].textContent).toMatch(/a/i);
        expect(listItems[1].textContent).toMatch(/b/i);
        expect(listItems[2].textContent).toMatch(/c/i);
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
                list: list,
                targetSite: targets[0]
            }).element
        );

        const orderedList = document.querySelector("ul");
        const listItems = orderedList.querySelectorAll("li");

        expect(listItems[0].textContent).toMatch(/b/i);
        expect(listItems[1].textContent).toMatch(/c/i);
        expect(listItems[2].textContent).toMatch(/a/i);
    });

    it("Throws when passed a non-array list", () => {

        expect(() => {

            DatasheetList({
                ordered: false,
                list: "array",
                targetSite: targets[0]
            })
        }).toThrow(/invalid\slist/i);
    });

    it("Adds a single N/A item to the ordered list if the list prop is empty", () => {

        render(
            DatasheetList({
                ordered: true,
                list: [],
                targetSite: targets[0]
            }).element
        );

        const orderedList = document.querySelector("ol");
        const listItems = orderedList.querySelectorAll("li");

        expect(listItems).toHaveLength(1);
        expect(listItems[0].textContent).toMatch(/N\/A/i);
    });

    it("Adds a single N/A item to the unordered list if the list prop is empty", () => {

        render(
            DatasheetList({
                ordered: false,
                list: [],
                targetSite: targets[0]
            }).element
        );

        const unorderedList = document.querySelector("ul");
        const listItems = unorderedList.querySelectorAll("li");

        expect(listItems).toHaveLength(1);
        expect(listItems[0].textContent).toMatch(/N\/A/i);
    });

    it("Adds ul tokens for unordered list", () => {

        const list = [
            "b",
            "c",
            "a",
        ];

        render(
            DatasheetList({
                ordered: false,
                list: list,
                targetSite: targets[0]
            }).element
        );

        const orderedList = document.querySelector("ul");
        const listItems = orderedList.querySelectorAll("li");

        expect(listItems[0].textContent).toContain(formattingTokens[targets[0]].ul);
        expect(listItems[1].textContent).toContain(formattingTokens[targets[0]].ul);
        expect(listItems[2].textContent).toContain(formattingTokens[targets[0]].ul);
    });

    it("Adds ol tokens for ordered list", () => {

        const list = [
            "b",
            "c",
            "a",
        ];

        render(
            DatasheetList({
                ordered: true,
                list: list,
                targetSite: targets[0]
            }).element
        );

        const orderedList = document.querySelector("ol");
        const listItems = orderedList.querySelectorAll("li");

        expect(listItems[0].textContent).toContain(formattingTokens[targets[0]].ol);
        expect(listItems[1].textContent).toContain(formattingTokens[targets[0]].ol);
        expect(listItems[2].textContent).toContain(formattingTokens[targets[0]].ol);
    });
});