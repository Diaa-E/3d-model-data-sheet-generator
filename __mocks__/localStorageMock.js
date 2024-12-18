export default function mockLocalStorage()
{
    let LocalStore = {};

    const mockGetItem = jest.fn((key) => {

        key in LocalStore ? LocalStore[key] : null;
    });

    const mockSetItem = jest.fn((key, value) => {

        LocalStore[key] = String(value);
    });

    const clear = jest.fn(() => {

        LocalStore = []
    })

    localStorage.getItem = mockGetItem;
    localStorage.setItem = mockSetItem;
    localStorage.clear = clear;
}