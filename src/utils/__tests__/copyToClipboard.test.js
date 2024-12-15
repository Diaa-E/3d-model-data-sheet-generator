import copyToClipboard from "../copyToClipboard";
import { FeatureNotSupportedException } from "../customExceptions";

describe("Copy To Clipboard Utility Function", () => {

    function mockClipboard()
    {
        let clipboard = "";

        Object.assign(
            navigator,
            {
                clipboard: {
                    write: jest.fn().mockImplementation((data) => clipboard = data),
                    read: jest.fn().mockImplementation(() => clipboard),
                }
            }
        );

        Object.assign(
            global,
            {
                ClipboardItem: jest.fn().mockImplementation((data) => data),
            }
        );
    }

    function mockExecCommand()
    {
        Object.assign(
            global.document,
            {
                execCommand: jest.fn().mockImplementation((eventType) => dispatchEvent(new Event(eventType)))
            }
        );
    }

    afterEach(() => {

        cleanup();
        jest.resetAllMocks();
    });

    describe("Clipboard API Case", () => {
 
        beforeEach(() => {

            mockClipboard();
        });

        it("Writes to clipboard using the clipboard API", () => {

            const element = document.createElement("h1");
            element.textContent = "test";

            copyToClipboard(element);

            expect(navigator.clipboard.write).toHaveBeenCalledTimes(1);
        });

        it("Writes data in a text/HTML Blob and a text/plain Blob as a fallback", () => {

            const element = document.createElement("h1");
            element.textContent = "test";

            copyToClipboard(element);

            const data = navigator.clipboard.read()[0];

            expect(data["text/html"]).toBeDefined();
            expect(data["text/html"]).toBeInstanceOf(Blob);

            expect(data["text/plain"]).toBeDefined();
            expect(data["text/plain"]).toBeInstanceOf(Blob);
        });
    });

    // This case does not seem very testable at the moment
    describe("execCommand case", () => {

        beforeEach(() => {

            Object.assign(
                global,
                {
                    ClipboardItem: undefined
                }
            );
            
            mockExecCommand();
        });

        it("Triggers a copy event using execCommand", () => {

            const element = document.createElement("h1");
            element.textContent = "test";

            copyToClipboard(element);

            expect(document.execCommand).toHaveBeenCalledWith("copy");
        });
    });

    describe("Error handling", () => {

        it("Throws when passed in invlaid HTML element", async () => {
    
            // Async functions do not strictly throw like classes or regular functions, trying to catch
            // using a throw assertion leaves an unresolved promise and the test fails to run
            await expect(copyToClipboard(12)).rejects.toBeInstanceOf(TypeError);
        });

        it("Throws if neither copy to clipboard APIs are available", async () => {

            global.ClipboardItem = undefined;
            document.execCommand = undefined;

            const element = document.createElement("h1");
            element.textContent = "test";

            await expect(copyToClipboard(element)).rejects.toBeInstanceOf(FeatureNotSupportedException);
        });
    });
});