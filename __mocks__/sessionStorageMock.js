export default function mockSessionStorage()
{
    let sessionStore = {};

    const mockGetItem = jest.fn((key) => {

        key in sessionStore ? sessionStore[key] : null;
    });

    const mockSetItem = jest.fn((key, value) => {

        sessionStore[key] = String(value);
    });

    const clear = jest.fn(() => {

        sessionStore = []
    })

    sessionStorage.getItem = mockGetItem;
    sessionStorage.setItem = mockSetItem;
    sessionStorage.clear = clear;
}