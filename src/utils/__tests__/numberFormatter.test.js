import formatNumberComma from "../numberFormatter";

describe("Number formatter utility function", () => {

    it("Formats numbers shorter than 4 digits", () => {

        expect(formatNumberComma("1")).toBe("1");
        expect(formatNumberComma("10")).toBe("10");
        expect(formatNumberComma("100")).toBe("100");
    });

    it("Formats numbers of 4-6 digits", () => {

        expect(formatNumberComma("1000")).toBe("1,000");
        expect(formatNumberComma("10000")).toBe("10,000");
        expect(formatNumberComma("100000")).toBe("100,000");
    });

    it("Formats numbers requiring more than 1 comma", () => {

        expect(formatNumberComma("1000000")).toBe("1,000,000");
        expect(formatNumberComma("1000000000")).toBe("1,000,000,000");
        expect(formatNumberComma("1000000000000000")).toBe("1,000,000,000,000,000");
    });
});