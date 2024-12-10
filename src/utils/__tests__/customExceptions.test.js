import { customExceptionFActory } from "../customExceptions";

describe("Custom Exceptions Factory Function", () => {

    it("Returns message passed as arguemnt", () => {

        const newException = customExceptionFActory("testException");

        expect((new newException("testMessage")).message).toBe("testMessage");
    });

    it("Returns name passed as arguemnt", () => {

        const newException = customExceptionFActory("testException");

        expect((new newException("testMessage")).name).toBe("testException");
    });

    it("Assigns the stack key", () => {

        const newException = customExceptionFActory("testException");

        expect((new newException("testMessage")).stack).not.toBeFalsy();
    });

    it("instanceof seperates exceptions created by the factory", () => {

        const exception1 = customExceptionFActory("testException1");
        const exception2 = customExceptionFActory("testException2");

        expect((new exception1("testMessage1")) instanceof exception2).toBe(false);
        expect((new exception2("testMessage2")) instanceof exception1).toBe(false);
    });
});