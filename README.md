# <img src="./src/assets/logo/logo.svg" width="70px"> 3D Model Data Sheet Generator v2.0.1

Generate 3D asset formatted descriptions for various marketplaces by filling out a simple form.

## Contents

1. [Tutorial](#tutorial)
1. [Documentation](#documentation)

## Tutorial

This is a quick tutorial to get started using the application.

## Documentation

This sections covers the code side of the application.

### Contents

1. [Tools](#tools)
1. [Utility Functions](#utility-functions)
1. [Assets]()
1. [UI Components]()
1. [Fieldsets]()
1. [Testing]()

### Tools

The tools used in building the latest version.

| Functionality | Tools |
|----|-----|
| Bundling / Building | Webpack |
| Styling | CSS / CSS Modules |
| Scripting | JavaScript |
| Testing | Jest |

### Utility Functions

Utility functions are kept in ```./src/utils/``` and their tests are in ```./src/utils/__tests__/```.

1. #### createElement

    - Export from ```./src/utils/createElement.js```.
    - Creates HTML elements.
    - Attributes are passed in camel case.
    - Some attributes have been remapped to new names: 
        | Original | New |
        |-----|---|
        |className | class |
        | htmlFor | for |
        | aria-label | ariaLabel |
    - Event listeners must begin with an "on", example: ```"onClick"```.
    - CSS variables must begin with "--", example: ```"--icon"```.
    - Throws ```Error``` if attribute is not a property of ```HTMLElement``` Object or is not included in the handled cases.
    - Throws ```Error``` if tag is not a valid HTML tag.
    - Throws ```Error``` if a child is not an HTML element nor a string.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    | tag | string | undefined | HTML tag name |
    | props | object | undefined | Key-value pairs of element attributes|
    | children | array / rest of parameters | undefined | Children HTML elements or text |

    | Return Type | Details |
    |----|----|
    | object | Created html element as an instance of HTMLElement |

1. ### createFragment

    - Export from ```./src/utils/createElement.js```.
    - Creates a fragment.
    - Returns passed children as an array to be appended into another element.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    |children | array / rest of parameters | undefined | HTML elements to group within a fragment. |

    | Return Type | Details |
    |----|----|
    | array | Returns children from argument. |

1. #### copyToClipboard 

    - Default export from ```./src/utils/copyToClipboard.js```.
    - Copies text from an HTML element to the clipboard using ```navigator.clipboard``` & ```clipboardItem``` or ```document.execCommand``` as a fallback.
    - If rich text is not supported, only plain text is copied to the clipboard.
    - Throws ```typeError``` if element argument is not an HTML element.
    - Throws ```FeatureNotSupportedException``` (Custom exception) if the browser does not support copying to clipboard.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    | element | HTML element | undefined | Text is copied from the passed element and its children if they exist |

    | Return Type | Details |
    |----|----|
    | undefined | - |

1. #### searchCaseInsensetive

    - Export from ```./src/utils/customArraySearch.js```.
    - Searches an array of strings while ignoring letter case.
    - Throws a ```TypeError``` if value arguement is not a string.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    | array | array | undefined | Target array for search. |
    | value | string | undefined | Search target. |

    | Return Type | Details |
    |----|----|
    | boolean | Returns true if target is found, false if not. |

1. #### customExceptionFactory

    - Export from ```./src/utils/customexceptions.js```.
    - Returns an Error Object constructor.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    | name | string | "customException" | Exception name in the stack. |

    | Return Type | Details |
    |----|----|
    | function | Custom error constructor inheriting the prototype from the ```Error``` object|

1. #### customException

    - Returned from [customExceptionFactory](#customexceptionfactory).
    - Error object constructor.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    |message | string | "" | Error message. |
    | details | object | { } | Extra data to be accessed by a catch statment |

    | Return Type | Details |
    |----|----|
    | Object | Object inheriting from the ```Error``` Object |

1. #### formattingTokens

    - Export from ```./src/utils/formattingTokens.js```.
    - Object containing marketplace names and their corresponding text formatting strings.
    - Structure: ```formattingTokens.<marketplaceName>.<tokenName>```.

    | Key | Details |
    |----|----|
    | heading | Preceeds title text |
    | bold | Wraps bold Text |
    | ul | Preceeds unordered list item |
    | ol | Preceeds ordered list item |
    | break | Preceeds a line break |

1. #### getIllegalCharacters

    - Export from ```./src/utils/formattingTokens.js```.
    - Compiles a list of all formatting characters generated from the [formattingTokens](#formattingtokens) object.
    - Ignores line breaks and empty strings.
    - Compiled list is used to block the user from using formatting tokens in any items they add since they can break the text format on the target marketplace.
    - Does not repeat tokens even if they exist more than once in the passed object.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    | siteTokens | Object | [formattingTokens](#formattingtokens)| Tokens object from which the list is generated |

    | Return Type | Details |
    |----|----|
    | array | An array of illegal strings, each element is unique. |

1. #### containsIllegalCharacters

    - Export from ```./src/utils/formattingTokens.js```.
    - Checks for illegal characters in a string.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    |string | string | undefined | Target string to be searched |
    | illegalCharactersList | array | return value of [getIllegalCharacters](#getillegalcharacters) | List of blacklisted characters to search for|

    | Return Type | Details |
    |----|----|
    |boolean | True if string contains illegal characters |

1. #### getCurrentPage

    - Default Export from ```./src/utils/getCurrentPage.js```.
    - Returns the name of the active page.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    |fullPath | string | undefined | Full path of the current page |

    | Return Type | Details |
    |----|----|
    | string | Name of the current page minus the .html |

1. #### formatNumberComma

    - Default export from ```./src/utils/gnumberFormatter.js```.
    - Adds "," to numbers.
    - Throws ```TypeError``` if number argument is not a number.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    |number | number | undefined | Number to be seperated by commas. |

    | Return Type | Details |
    |----|----|
    | string | Number with added commas. |

1. #### scrollToElement

    - Default export from ```./src/utils/gnumberFormatter.js```.
    - Scrolls and focuses an element into view.
    - Throws a ```TypeError``` if element is not an HTML element.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    |element | HTML element | undefined | Page element to be scrolled into view.|

    | Return Type | Details |
    |----|----|
    |undefined| - |

1. #### getFromStorage

    - Export from ```./src/utils/sessionStorageUtility.js```.
    - Retreives an item from session storage.
    - Parses JSON before returning.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    | key | string | undefined | Storage item name. |
    | defaultValue | any | undefined | Returned if retreival is unsuccessful |

    | Return Type | Details |
    |----|----|
    | any | Item retreived from session storage or ```defaultValue``` if item was not found |

1. #### saveToStorage

    - Export from ```./src/utils/sessionStorageUtility.js```.
    - Saves an item to session storage.
    - Stringifies into JSON before saving.

    | Argument | Type | Default Value | Details |
    |----|----|---|---|
    | key | string | undefined | Item name. |
    | value | any | undefined | Item value. |

    | Return Type | Details |
    |----|----|
    |undefined | - |