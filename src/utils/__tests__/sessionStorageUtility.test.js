import mockSessionStorage from "../../../__mocks__/sessionStorageMock";
import { getFromStorage, saveToStorage } from "../sesionStorageUtility";

beforeEach(() => {

    jest.resetAllMocks();
    mockSessionStorage();
});

describe("Get From Storage Utility Function", () => {

    it("Returns default value argument if key does not exist in storage", () => {
        
        const data = getFromStorage(
            "data1",
            "some data"
        );

        expect(data).toBe("some data");
    });

    it("Returns stored item if the key exists in storage", () => {

        window.sessionStorage.setItem("data2", JSON.stringify("old data"));

        const data = getFromStorage(
            "data2",
            "new data"
        );

        expect(data).toBe("old data");
    });
});

describe("Save To Storage Utility Function", () => {

    it("Saves item to session storage", () => {

        saveToStorage("data3", "new data");

        expect(JSON.parse(window.sessionStorage.getItem("data3"))).toBe("new data");
    });
});