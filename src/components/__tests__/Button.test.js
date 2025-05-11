import Button from "../Button";

describe("Icon Button Component", () => {

    beforeEach(() => {

        cleanup();
        jest.resetAllMocks();
    });

    it("Renders a button", () => {

        render(Button({
            color: "primary",
            onClick: () => {},
            iconPath: "",
            text: "button 1",
            type: "button",
        }).element);

        const button = document.querySelector("button");

        expect(button).not.toBeNull();
    });

    it("Uses text from props", () => {

        render(Button({
            color: "primary",
            onClick: () => {},
            iconPath: "",
            text: "button 1",
            type: "button",
        }).element);

        const button = document.querySelector("button");

        expect(button.textContent).toBe("button 1");
    });

    it("Uses type from props", () => {

        render(Button({
            color: "primary",
            onClick: () => {},
            iconPath: "",
            text: "button 1",
            type: "submit",
        }).element);

        const button = document.querySelector("button");

        expect(button.type).toBe("submit");
    });

    it("Adds icon path prop to --icon property in the button's CSS", () => {

        render(Button({
            color: "primary",
            onClick: () => {},
            iconPath: "icon1",
            text: "button 1",
            type: "submit",
        }).element);

        const button = document.querySelector("button");

        expect(button.style.getPropertyValue("--icon")).toContain("icon1");
    });

    it("Calls onClick function when button is clicked", () => {

        const onClick = jest.fn();

        render(Button({
            color: "primary",
            onClick: onClick,
            iconPath: "icon1",
            text: "button 1",
            type: "submit",
        }).element);

        const button = document.querySelector("button");
        button.click();

        expect(onClick.mock.calls).toHaveLength(1);
    });

    it("Calls onClick function when icon div is clicked", () => {

        const onClick = jest.fn();

        render(Button({
            color: "primary",
            onClick: onClick,
            iconPath: "icon1",
            text: "button 1",
            type: "submit",
        }).element);

        const div = document.querySelector("div");
        div.click();

        expect(onClick.mock.calls).toHaveLength(1);
    });
})