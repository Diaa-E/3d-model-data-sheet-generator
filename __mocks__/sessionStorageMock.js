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

    window.sessionStorage.getItem = mockGetItem;
    window.sessionStorage.setItem = mockSetItem;
    window.sessionStorage.clear = clear;
}