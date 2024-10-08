import { createElement, createFragment } from "../createElement";

describe("Create Element Utility Function", () => {

    it("Returns correct HTML element when passed a valid tag name", () => {

        const element = createElement(
            "div",
            {},
            [],
        );

        expect(element).toBeInstanceOf(HTMLElement);
        expect(element.tagName).toBe("DIV");
        expect(element).not.toBeInstanceOf(HTMLUnknownElement);
    });

    it("Throws an error when passed an invalid tag name", () => {

        expect(() => {

            createElement("foo");
            
        }).toThrow();
    });

    it("Adds attributes to element when passed attributes are valid", () => {

        const element = createElement(
            "div",
            {
                id: "testId"
            },
            []
        );

        expect(element.id).toBe("testId");
    });

    it("Handles IDL attributes with different property names", () => {

        const element = createElement(
            "div",
            {
                id: "testId",
                class: "test-class",
                for: "someId"
            },
            []
        );

        expect(element.getAttribute("class")).toBe("test-class");
        expect(element.getAttribute("for")).toBe("someId");
    });

    it("Throws an error when passed an attribute that does not exist", () => {

        expect(() => {

            createElement(
                "div",
                {
                    foo: "testId"
                },
                []
            );
        }).toThrow();
    });

    it("Throws an error when passed in invalid attribute syntax", () => {

        expect(() => {

            createElement(
                "div",
                {
                    "-adf": "testId"
                },
                []
            );
        }).toThrow();
    });

    it("Appends HTML elements from children argument", () => {

        const child1 = document.createElement("div");
        const child2 = document.createElement("div");

        const element = createElement(
            "div",
            {
                id: "testId"
            },
            [
                child1,
                child2
            ]
        );

        expect(child1.parentElement).toBe(element);
        expect(child2.parentElement).toBe(element);
    });

    it("Appends strings from the children argument as a text node", () => {

        const element = createElement(
            "div",
            {
                id: "testId"
            },
            [
                "some text"
            ]
        );

        expect(element.textContent).toBe("some text");
    });

    it("Throws an error when passed a child that is not an DOM element or a string", () => {

        expect(() => {
            createElement(
                "div",
                {
                },
                [
                    12
                ]
            );
        }).toThrow();
    });
});