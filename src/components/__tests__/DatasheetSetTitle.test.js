import DatasheetSetTitle from "../DatasheetSetTitle";

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

describe("Datasheet Set Title Component", () => {

    beforeEach(() => {

        jest.resetAllMocks();
        cleanup();
    });

    const targets = ["target1", "target2"];

    it("Renders an h5 element", () => {

        render(
            DatasheetSetTitle({
                title: "",
                emptySet: false,
                targetSite: targets[0]
            }).element
        );

        const title = document.querySelector("h5");

        expect(title).not.toBeNull();
    });

    it("Renders title text from props", () => {

        render(
            DatasheetSetTitle({
                title: "test1",
                emptySet: false,
                targetSite: targets[0]
            }).element
        );

        const title = document.querySelector("h5");

        expect(title.textContent).toMatch(/test1/i);
    });

    it("Adds a distinct class when emptySet prop is true", () => {

        render(
            DatasheetSetTitle({
                title: "test1",
                emptySet: true,
                targetSite: targets[0]
            }).element
        );

        const title = document.querySelector("h5");

        expect(title.classList.toString()).toMatch(/empty/i);
    });

    it("Adds bold formatting tokens to the title's text", () => {

        render(
            DatasheetSetTitle({
                title: "test1",
                emptySet: true,
                targetSite: targets[0]
            }).element
        );

        const title = document.querySelector("h5");

        expect(title.textContent).toContain(formattingTokens[targets[0]].bold);
    });
});