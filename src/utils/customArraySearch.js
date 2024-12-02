export function searchCaseInsensitive(array, value)
{
    if (typeof value !== "string")
    {
        throw new Error("Value must be a string.")
    }

    value = value.toLowerCase();

    for (const item of array)
    {
        if (typeof item !== "string")
        {
            throw new Error("All values in the array be a string.");
        }
        else if (item.toLowerCase() === value)
        {
            return true;
        }
    }

    return false;
}