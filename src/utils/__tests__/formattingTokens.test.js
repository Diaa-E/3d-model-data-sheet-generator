import { containsIllegalCharacters, getIllegalCharacters } from "../formattingTokens";

describe("Illegal characters list generation utility function", () => {

    it("Returns characters without repetition", () => {

        const tokens = {

            site1: {
                token1: "1",
                token2: "2",
            },
            site2: {
                token1: "1",
                token2: "2",
                token3: "3"
            }
        };

        expect(getIllegalCharacters(tokens)).toEqual(["1", "2", "3"]);
    });

    it("Ignores empty strings", () => {

        const tokens = {

            site1: {
                token1: "1",
                token2: "2",
                token3: ""
            },
            site2: {
                token1: "1",
                token2: "2",
                token3: "3",
                token4: ""
            }
        };

        expect(getIllegalCharacters(tokens)).toEqual(["1", "2", "3"]);
    });

    it("Does not trim spaces", () => {

        const tokens = {

            site1: {
                token1: "1 " ,
                token2: "2 ",
                token3: " "
            },
            site2: {
                token1: "1 ",
                token2: "2 ",
                token3: "3 ",
                token4: " "
            }
        };

        expect(getIllegalCharacters(tokens)).toEqual(["1 ", "2 ", " ", "3 "]);
    });

    it("Ignores line breaks", () => {

        const tokens = {

            site1: {
                token1: "1 " ,
                token2: "2 ",
                token3: "\n"
            },
            site2: {
                token1: "1 ",
                token2: "2 ",
                token3: "3 ",
                token4: "\n"
            }
        };

        expect(getIllegalCharacters(tokens)).toEqual(["1 ", "2 ", "3 "]);
    });
});

describe("Illegal character detection utility function", () => {

    it("Detects illegal strings at the start", () => {

        const illegalCharacters = ["13", "2"];
        const string = "13adfadfadf";
    
        expect(containsIllegalCharacters(string, illegalCharacters).status).toBe(true);
        expect(containsIllegalCharacters(string, illegalCharacters).character).toBe("13");
    });

    it("Detects illegal strings at the end", () => {

        const illegalCharacters = ["13", "2"];
        const string = "adfadfadf2";
    
        expect(containsIllegalCharacters(string, illegalCharacters).status).toBe(true);
        expect(containsIllegalCharacters(string, illegalCharacters).character).toBe("2");
    });

    it("Detects illegal strings in the middle", () => {

        const illegalCharacters = ["13", "2"];
        const string = "adfad13fadf";
    
        expect(containsIllegalCharacters(string, illegalCharacters).status).toBe(true);
        expect(containsIllegalCharacters(string, illegalCharacters).character).toBe("13");
    });

    it("Detects illegal strings with spaces at the end", () => {

        const illegalCharacters = ["13 ", "2"];
        const string = "adfadfadf13 ";
    
        expect(containsIllegalCharacters(string, illegalCharacters).status).toBe(true);
        expect(containsIllegalCharacters(string, illegalCharacters).character).toBe("13 ");
    });

    it("Detects illegal strings with spaces at the start", () => {

        const illegalCharacters = ["13 ", "2"];
        const string = "13 adfadfadf";
    
        expect(containsIllegalCharacters(string, illegalCharacters).status).toBe(true);
        expect(containsIllegalCharacters(string, illegalCharacters).character).toBe("13 ");
    });

    it("Detects illegal strings with spaces in the middle", () => {

        const illegalCharacters = ["13 ", "2"];
        const string = "adfa13 dfadf";
    
        expect(containsIllegalCharacters(string, illegalCharacters).status).toBe(true);
        expect(containsIllegalCharacters(string, illegalCharacters).character).toBe("13 ");
    });

    it("Passes clean strings", () => {

        const illegalCharacters = ["1", "2"];
        const string = "adfadfadf";

        expect(containsIllegalCharacters(string, illegalCharacters).status).toBe(false);
        expect(containsIllegalCharacters(string, illegalCharacters).character).toBe(null);
    });
});