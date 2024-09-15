export function getFromStorage(key, defaultValue)
{
    return JSON.parse(sessionStorage.getItem(key)) ?? defaultValue;
}

export function saveToStorage(key, value)
{
    sessionStorage.setItem(key, JSON.stringify(value));
}