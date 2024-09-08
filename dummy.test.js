import * as j from "@jest/globals";

j.describe("Jest runs", () => {

    j.it("truth is truthy", () => {

        j.expect(true).toBeTruthy();
    });
});