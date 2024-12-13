export default function formatNumberComma(number)
{
    if (isNaN(number))
    {
        throw new TypeError(`Invalid number "${number}"`);
    }

    // stolen from https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
    // The regex uses 2 lookahead assertions:
    // a positive one to look for any point in the string that has a multiple of 3 digits in a row after it,
    // a negative assertion to make sure that point only has exactly a multiple of 3 digits. The replacement
    // expression puts a comma there.
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}