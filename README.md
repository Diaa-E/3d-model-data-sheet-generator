# <img src="./src/assets/logo/logo.svg" width="70px"> 3D Model Data Sheet Generator v2.1.0

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
1. [Assets](#assets)
1. [UI Components]()
1. [Fieldsets]()
1. [Testing]()

---------------

### Tools

The tools used in building the latest version.

| Functionality | Tools |
|----|-----|
| Bundling / Building | Webpack |
| Styling | CSS / CSS Modules |
| Scripting | JavaScript |
| Testing | Jest |

-------------

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

1. #### createFragment

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

-------------

### Assets

Assets file structure and usage.

1. #### Fonts
    
    - Path: ```./src/assets/fonts/```.
    - Fonts are imported to the ```./src/globals.css/``` and are assigned to variables in the ```:root```.

1. #### Logo

    - Path: ```./src/assets/logo/```.
    - The application's logo and any variants of it are kept in the same location.
    - Logo is imported directly when needed.

1. #### Icons

    - Path: ```./src/assets/icons/```.
    - All icons are bundled and exported inside the default export ```icons``` object from the barrel file ```./src/barrels/iconsBarrel.js```.
    - icons object structure: ```icons.<iconName>```.

-------------

### UI Components

Simple UI components and their usage. Components take a props object where all the customization options are passed.

1. #### AddCheckbox

    - Default export from ```./src/components/AddCheckbox.js```.
    - Returns a fieldset with text input for adding items to a parent fieldset component.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | legend | string | "Add a new checkbox" | Text to be assigned the fieldset legend (title).|
    |placeholder | string | "new checkbox" | Placeholder text for the text input in the fieldset. |
    | onAdd | function | () => { } | Function executed when the add button is clicked, use this to add new items to the parent fieldset. |
    |id | string | UUID v4 output | Id used to assign a label to the textbox.| 


    | Return object key | Type | Details |
    |----|---|----|
    |element |HTML element | Component's HTML element. |
    | clear | function | Clears input box. |
    | getValue | function | Gets input box value. |

1. #### Button

    - Default export from ```./src/components/Button.js```.
    - Returns a button with text and an icon.
    - Text disappears on narrow screens leaving only the icon.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    |type | string | "button" | Sets button's type attribute.|
    | onClick | function | () => { } | Function to be executed when the button is clicked. |
    | iconPath | string | icons.defaultIcon from [Icons Barrel](#icons) | Path to button's icon. |
    | text | string | "click here"| Text displayed on the button, text disappears when using narrow screens. |
    | color | string | "primary" | Sets cutton color scheme, options are: "primary", "secondary" or "danger".|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element|

1. #### CheckBox

    - Default export from ```./src/components/Checkbox.js```.
    - Returns a labeled checkbox.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | name | string | "checkbox" | Sets name attribute for checkbox input |
    | text | string | "checkbox" | Sets checkbox label text |
    | value | string | "checkbox" | Sets value for checkbox input |
    | onChange | function | () => { } | Function to be executed on checkbox checked state change |
    | checked | boolean | false | Sets checkbox checked state, true checkss the box |
    | userOption | bolean | false | True flags the checkbox as user-added.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### DarkModeButton

    - Default export from ```./src/components/DarkModeButton.js```.
    - Returns an animated button for setting application theme.
    - Application theme is saved to local storage.
    - Multiple instances of this component don't sync unless re-initialized.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | - | - | - | - |

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### Datasheet

    - Default export from ```./src/components/Datasheet.js```.
    - Returns the generated formatted text for preview.
    - Throws a ```TypeError``` if title is not a string.
    - Throws a ```TypeError``` if sets is not an array.
    - Throws an ```Error``` if sets has no items.
    - Throws a ```TypeError``` if set.title is not a string.
    - Throws a ```SyntaxError``` if set.type is not included in the set types array.
    - Throws a ```TypeError``` if set.data is not an array.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | title | string | "" | 3D asset name. |
    | targetSite | string | "" | Target site to generate text for.|
    | sets | array | [{ title: "title1", type: "orderedList", data: ["value1", "value2"] }] | Datasheet sections.|

    | Prop | Type | Details |
    |----|-----|---|
    |sets.title | string | Section title.|
    | sets.type | string | Type of section, can be either "text", "orderedList" or "unorderedList".|
    | sets.data | array | Data to be written into the section. |

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### DatasheetControls

    - Default export from ```./src/components/DatasheetControls.js```.
    - Returns form buttons.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | onCopy | function | () => { }| Function executed when copy to clipboard button is clicked. Used to pass copying functionality. |
    | onReset | function | () => { }| Funciton executed when reset form button is clicked. Used to pass resetting fields functionality.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. ####  DatasheetForm

    - Default export from ```./src/components/DatasheetForm.js```.
    - Returns main form element.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | onSubmit | function | () => { } | Function to be executed when the form is submitted. Used to pass submition functionality, preventDefault is called by the form then the function from props. |
    | fieldsets | array | [ ]| Child Fieldset elements to be appended to this form.|
    | formTtitle | string | Datasheet Title | Form title. |

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### DatasheetList 

    - Default export from ```./src/components/DatasheetList.js```.
    - Returns a list section for a datasheet.
    - Throws a ```TypeError``` when list is not an array.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | ordered | boolean | false | Generated an ordered list when true, an unordered one when false.|
    | list | array | [ ]| Array of list items to be included in the list element. |
    | targetSite | string | "" | Target site to generate text for. |

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### DatasheetSetTitle

    - Default export from ```./src/components/DatasheetSetTitle.js```.
    - Returns a heading for a datasheet section.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    |title | string | "Set Ttitle| Section title |
    | emptySet | boolean | false | Highlights the section in red if true, meant to warn the user that they haven't submitted anything to an optional fieldset.|
    | targetSite | string | "" | Target site to generate text for.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### Dialog

    - Default export from ```./src/components/Dialog.js```.
    - Returns a dialog box with a prompt, confirm and cancel buttons.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | onConfirm | function | () => { } | Function executed when confirm button is clicked.|
    | prompt | string | "Default prompt" | Prompt text shown in the dialog box.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |
    | open | function | Creates a new instance of the Dialog component and mounts it to the document's body. Cancel button destroys the instance by default.|

1. #### FieldsContainer

    - Default export from ```./src/components/Dialog.js```.
    - Returns a two-column grid container for input fields.
    - Converts into a two-row grid on narrow screens.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | children | array | [ ]| Input fields to be appended to the fields container.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### Fieldset

    - Default export from ```./src/components/Fieldset.js```.
    - Returns a fieldset element.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | legend | string | "Fieldset Title"| Text for fieldset's legend element. |
    | children | array | [ ]| HTML elements to be appended to the fieldset.|
    | required | boolean | false | Marks the fieldset as required when true.|
    | hint | string | "" | A tip/hint text for the user on how to fill in the fieldset.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |
    | setInvalid | function | Marks the fieldset as invalid when passed true, removes the marking when passed false.|

1. #### Footer

    - Default export from ```./src/components/Footer.js```.
    - Returns a footer element.
    - Contains a link to homepage, copyright info and a link to source repo.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | - | - | - | - |

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### Header

    - Default export from ```./src/components/Header.js```.
    - Returns a header element.
    - Contains a link to homepage, navigation bar/menu and a dark mode button.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | - | - | - | - |

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### Hero
    - Default export from ```./src/components/Hero.js```.
    - Returns a hero element for the home page.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | - | - | - | - |

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### IconLink

    - Default export from ```./src/components/IconLink.js```.
    - Returns a link with text and an icon.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    |href | string | "" | Address to link to.|
    |iconPath | string | icons.defaultIcon [Icons Barrel](#icons)| Path to icon asset. |
    | text | string | "default text" | Text to display on the link.|
    |newTab | boolean | true | Opens link in a new tab when true.|
    | showIcon | boolean | true | Renders the icon when true.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### ItemCheckbox

    - Default export from ```./src/components/ItemCheckbox.js```.
    - Returns a labeled checkbox with an icon.
    - Same as regular [Checkbox](#checkbox) but is used for lists items not just options.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | name | string | "item" | Checkbox's name attribute.|
    |text| string | "item" | Checkbox label text.|
    |value | string | "item" | Checkbox value attribute.|
    | onChange | function | () => { } | Funciton to be executed on checkbox's checked state change.|
    | checked | boolean | false | Sets the checkbox to checked if true.|
    | itemIcon | string | icons.defaultIcon [Icons Barrel](#icons) | Path to icon.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### NavBar

    - Default export from ```./src/components/NavBar.js```.
    - Returns a navigation bar element.
    - Renders an instance of [DarkModeButton](#darkmodebutton).
    - Visible on wide screens to replace [NavMenu](#navmenu).

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | pages | array | [ ] | Array of page links to add to the navigation.|

    | Prop | Type | Details |
    |----|---|---|
    |page.title | string | Text to show on navigation link. |
    | page.path | string | Path to page.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### NavMenu

    - Default export from ```./src/components/NavMenu.js```.
    - Returns a nav menu button that opens a navigation menu when clicked.
    - Renders an instance of [DarkModeButton](#darkmodebutton).
    - Visible on narrow screens to replace [NavBar](#navbar).

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | pages | array | [ ] | Array of page links to add to the navigation.|

    | Prop | Type | Details |
    |----|---|---|
    |page.title | string | Text to show on navigation link. |
    | page.path | string | Path to page.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element |

1. #### NumberInput

    - Default export from ```./src/components/NumberInput.js```.
    - Returns a labeled number input.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | text | string | "number" | Number input label text.|
    | palceholder | string | "number" | Number input plaeholder text|
    | onInput | function | () => { } | Function to execute when the number input value is changed.|
    | name | string | "number" | Number input's name attribute.|
    | max | string | "" | Maximum value. |
    | min | string | "" | Minimum value. |
    | value | string | "" | Number input value.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element. |
    | getValue | function | Gets number input's value.|
    | clear | function | Clears number input's value (set to "").|

1. #### Popup

    - Default export from ```./src/components/Popup.js```.
    - Returns a popup message element.
    - Popup automatically disappears after a set time inside the component.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    |msg | string | "default message" | Text shown in the popup.|
    | lasFocusedElement | HTML element | null | Element to focus and scroll to when the "scroll to field" option is on.|
    | error | boolean | false | Renders a success popup when false, renders an error message when true.|
    | showScrollToField | boolean | false | Shows a "scroll to field" button, used to scroll to invalid element on form submition.|

    
    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element. |
    | open | function | Creates a new instance of the popup element and mounts it to the document's body. Element is destroyed after a set period of time.|
    
1. #### Radio

    - Default export from ```./src/components/Radio.js```.
    - Returns a labeled radio button element.
    - onChange event only triggers when a radio button is checked, being unchecked by the checking of another radio input in the same group does not trigger the event (default radio input behavior).

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    |name | string | "radioGroup" | Radio input name attribute |
    | onChange | funciton | () => { } | Funciton to be executed on radio button checked state change. |
    | text | string | Radio | Radio input label text.|
    | value | string | "radio" | Radio input value. |
    | checked | boolean | false | Sets the radio input as checked if true.|
    | userOption | boolean | false | Flags the radio input as a user-added option when true.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element. |

1. #### RadioGroup

    - Default export from ```./src/components/RadioGroup.js```.
    - Returns the passed radio/checkbox input wrapped as a group.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    |button | array | [ ] | The radio/checkbox inputs to group together.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element. |
    |addButton | function | Adds one or more buttons to the group. Arguments are passed as rest of arguments.| 
    | remobeButton | funciton | Removes a button from the group with a matching label to the passed string.|
    | removeAllButtons | funciton | Removes all button from the group.|

1. #### TextArea

    - Default export from ```./src/components/TextArea.js```.
    - Returns a labeled text area.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | text | string | "text area" | Text area label text.|
    | placeholder | string | "text area" | Text area placeholder text.|
    | rows | number | 10 | Number of rows in the text area.|
    | cols | number | 30 | Number of columns in the text area.|
    | onInput | function | () => { } | Function to be executed on text area value change.|
    | value | string | "" | Text area contents.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element. |
    | clear | function | Clears text area's contents.|

1. #### TextInput

    - Default export from ```./src/components/TextInput.js```.
    - Returns a labeled text input.

    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    |text | string | "text" | Text input's label text.|
    | placeholder | string | "text" | Text input's placeholder text.|
    | name | string | "text" | Text input's name attribute.|
    |onInput | function | () => { } | Funciton to be executed on text input's value change.|
    | autocomplete | string | "off" | Text input's autocomplete attribute.|
    | value | string | "" | Text input's contents.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element. |
    |getValue | function | Returns text input's contents.|
    | clear | function | Clears text input's contents. |

1. #### ResetFieldsetButton

    - Default export from ```./src/components/ResetFieldsetButton.js```.
    - Returns an icon button with no text for resetting individual fieldsets.
    
    | Prop | Type | Default Value | Details |
    |----|----|---|---|
    | fieldsetName | string | "reset fieldset" | The name of the fieldset the button resets.|
    | onReset | function | () => { }| Funciton to be executed on button click. This component open a confirm dialog first before executing onReset.|

    | Return object key | Type | Details |
    |----|---|----|
    | element | HTML element | Component's HTML element. |