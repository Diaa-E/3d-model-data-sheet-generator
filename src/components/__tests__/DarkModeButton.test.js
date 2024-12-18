import mockLocalStorage from "../../../__mocks__/localStorageMock";
import mockSystemTheme from "../../../__mocks__/systemThemeMock";
import DarkModeButton from "../DarkModeButton";

describe("Dark Mode Button Component", () => {

    beforeEach(() => {

        jest.resetAllMocks();
        cleanup();
        mockLocalStorage();
        mockSystemTheme(true);
    });

    afterEach(() => {

        localStorage.clear();
    });

    it("Renders a button with accessible text", () => {

        render(
            DarkModeButton().element
        );

        const button = document.querySelector("button");

        expect(button).not.toBeNull();
        expect(button.textContent).toMatch(/dark\smode/i);
        expect(button.ariaLabel).toMatch(/dark\smode/i);
    });

    it("Enables light theme if system theme is light", () => {

        mockSystemTheme(false);

        render(
            DarkModeButton().element
        );

        expect(document.body.classList.toString()).toContain("light");
    });

    it("Enables dark theme if system theme is dark", () => {

        mockSystemTheme(true);

        render(
            DarkModeButton().element
        );

        expect(document.body.classList.toString()).toContain("dark");
    });

    it("Toggles active theme on click", () => {

        mockSystemTheme(true);
        render(
            DarkModeButton().element
        );

        expect(document.body.classList.toString()).toContain("dark");

        const button = document.querySelector("button");
        button.click();

        expect(document.body.classList.toString()).toContain("light");

        button.click();

        expect(document.body.classList.toString()).toContain("dark");
    });

    it("Uses light mod if the matchMedia is unsupported and theme is not stored in local storage", () => {

        window.matchMedia = undefined;
        render(
            DarkModeButton().element
        );

        expect(document.body.classList.toString()).toContain("light");
    });

    it("It uses theme stored in the local storage", () => {

        localStorage.setItem("darkTheme", JSON.stringify(false));
        render(
            DarkModeButton().element
        );

        expect(document.body.classList.toString()).toContain("light");

        localStorage.setItem("darkTheme", JSON.stringify(true));
        render(
            DarkModeButton().element
        );

        expect(document.body.classList.toString()).toContain("dark");
    });

    it("Saves theme to loca storage", () => {

        expect(localStorage.getItem("darkTheme")).toBeNull();
        mockSystemTheme(true);
        render(
            DarkModeButton().element
        );

        expect(document.body.classList.toString()).toContain("dark");
        expect(JSON.parse(localStorage.getItem("darkTheme"))).toBe(true);
    });
});