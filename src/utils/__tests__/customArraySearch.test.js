import { searchCaseInsensitive } from "../customArraySearch";

describe("Search Case Insensitive utility function", () => {

    beforeEach(() => {

        jest.resetAllMocks();
    });

    it("Returns true if an array value matches search value and case", () => {

        expect(searchCaseInsensitive(["test1", "test2", "test3"], "test3")).toBe(true);
    });

    it("Returns true if an array value matches search value only", () => {

        expect(searchCaseInsensitive(["test1", "test2", "test3"], "Test3")).toBe(true);
    });

    it("Returns false if value is not found in the array", () => {

        expect(searchCaseInsensitive(["test1", "test2", "test3"], "test4")).toBe(false);
    });
    
    it("Throws if the passed vlaue is not a string", () => {

        expect(() => searchCaseInsensitive(["test1", "test2", "test3"], 2)).toThrow("Value must be a string.");
    });

    it("Throws if a value in the array is not a string", () => {

        expect(() => searchCaseInsensitive(["test1", "test2", 3], "test3")).toThrow("All values in the array be a string.");
    });
});