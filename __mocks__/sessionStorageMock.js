export default function mockSessionStorage()
{
    const sessionStore = {};

    const mockGetItem = jest.fn((key) => {

        key in sessionStore ? sessionStore[key] : null;
    });

    const mockSetItem = jest.fn((key, value) => {

        sessionStore[key] = String(value);
    });

    window.sessionStorage.getItem = mockGetItem;
    window.sessionStorage.setItem = mockSetItem;
}