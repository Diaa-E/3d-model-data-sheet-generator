import getCurrentPage from "../getCurrentPage";

describe("Utility function for getting current active page for nav bar.", () => {

    it("Gets current page minus .html", () => {

        expect(getCurrentPage("test.com/folder/page1.html")).toBe("page1");
    });

    it("Returns empty string for home page.", () => {

        expect(getCurrentPage("test.com/folder/")).toBe("");
    });
});