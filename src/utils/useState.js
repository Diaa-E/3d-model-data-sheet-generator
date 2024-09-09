// stolen from https://dev.to/miki-digital/creating-a-usestate-hook-from-scratch-b39

let state = [];
let index = 0;

export default function useState(initialState)
{
    const localIndex = index;

    if (typeof state[localIndex] === "undefined")
    {
        state[localIndex] = initialState;
    }

    index++;

    return [state[localIndex], (newState) => state[localIndex] = newState];
}