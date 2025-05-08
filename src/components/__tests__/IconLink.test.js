import IconLink from "../IconLink";

describe("Icon Link Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
    });

    it("Returns a link element", () => {

        const link = IconLink();

        render(link.element);

        expect(document.querySelector("a")).not.toBeNull();
    });

    it("Uses text from props", () => {

        const link = IconLink({
            text: "test1"
        });

        render(link.element);

        expect(document.querySelector("a").textContent).toBe("test1");
    });

    it("Uses href from props", () => {

        const link = IconLink({
            href: "http://test1.com/"
        });

        render(link.element);

        expect(document.querySelector("a").href).toBe("http://test1.com/");
    });

    it("Adds icon when show icon prop is true", () => {

        const linkComponent = IconLink({
            showIcon: true
        });

        render(linkComponent.element);

        const link = document.querySelector("a");

        expect(link.querySelector("div")).not.toBeNull();
        expect(link.querySelector("div").className).toMatch(/icon/i);
    });

    it("Removes icon when show icon prop is false", () => {

        const linkComponent = IconLink({
            showIcon: false
        });

        render(linkComponent.element);

        const link = document.querySelector("a");

        expect(link.querySelector("div")).toBeNull();
    });

    it("Uses icon path from props", () => {

        const linkComponent = IconLink({
            showIcon: true,
            iconPath: "icon1"
        });

        render(linkComponent.element);

        const link = document.querySelector("a");

        expect(link.querySelector("div")).not.toBeNull();
        expect(link.style.getPropertyValue("--icon")).toMatch(/icon1/i)
    });

    it("Sets target to new tab when new tab prop is true", () => {

        const linkComponent = IconLink({
            newTab: true
        });

        render(linkComponent.element);

        expect(document.querySelector("a").target).toBe("_blank");
    });

    it("Sets target to current when new tab prop is false", () => {

        const linkComponent = IconLink({
            newTab:false
        });

        render(linkComponent.element);

        expect(document.querySelector("a").target).toBe("");
    });
});