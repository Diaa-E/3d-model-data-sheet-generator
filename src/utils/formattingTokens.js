export const formattingTokens = {
    None: {
        heading: "",
        bold: "",
        ul: "",
        ol: "",
        break: "",
    },
    CGTrader: {
        heading: "",
        bold: "**",
        ul: "- ",
        ol: "1. ",
        break: "\n",
    },
    Fab: {
        heading: "",
        bold: "",
        ul: "",
        ol: "",
        break: "",
    },
    Sketchfab: {
        heading: "#",
        bold: "**",
        ul: "* ",
        ol: "1. ",
        break: "\n\n",
    }
};

export function getIllegalCharacters(siteTokens = formattingTokens)
{
    const illegalCharacters = [];

    for (const [siteKey, siteValue] of Object.entries(siteTokens))
    {
        for (const [tokenKey, tokenValue] of Object.entries(siteValue))
        {
            if (illegalCharacters.indexOf(tokenValue) < 0 && tokenValue !== "" && !tokenValue.includes("\n"))
            {
                illegalCharacters.push(tokenValue);
            }
        }
    }
    
    return illegalCharacters;
}

export function containsIllegalCharacters(string, illegalCharactersList = getIllegalCharacters())
{
    for (const illegalCharacter of illegalCharactersList)
    {
        if (string.includes(illegalCharacter))
        {
            return {status: true, character: illegalCharacter};
        }
    }

    return {status: false, character: null};
}