<p align="center"><img src="./src/logo/logo.svg" width="200px"></p>

# <p align="center">3d Model Data Sheet Generator v1.0.0</p>

## Generating data sheets for 3D models with a few clicks.

<ul>
    <li>
    Manually writing a data sheet for every single 3D model is a tedious process and produces inconsistent quality. I tried to solve the problem using a template text file that I fill every time with new data but it was still a time-consuming process.
    </li>
    <li>
    This project was build with scalability in mind. As I learn more techniques in 3D art, more options and categories will need to be be added to the form. Fot this prupose, the elements.Js module is used to create elements inside each component. Each element function is passed an argument object containing the required properties for the element.
    </li>
</ul>

--------

## The Concept

<ul>
    <li>
    Each 3D trading website uses a description box to format the info describing the model. Each site uses a set of special characters to mark text style, lists, etc. But formatting the description using the website's tool is a lengthy process especially if there are many details included.
    </li>
    <li>
    This application takes the information provided by the user and formats it, based on the target site setting, to be copied directly into the site's description box without the user having to do any editing.
    </li>
</ul>

-------

## Development Challenges

<ul>
    <li>
    Creating reusable components with as little code as possible meant having to find common features between the UI's elements to build the elements around them without having to carry uneeded features.
    </li>
    <li>
    Implementing a way to gather data from the form without having to query select elements from the document. This was solved by writing getter functions to each element which are invoked by a getter function in the component.
    </li>
    <li>
    Validating the form without using the HTML-based validation. Using select and radio elements removed the need to validate these elements as they always default to a meaningful value. The smaller pseudo-forms used to create items, materials, etc. are validated using javascript using event listeners. Error messages are displayed on error/info panels attached to containers that require one.
    </li>
    <li>
    Writing a documentation. I didn't even know how to write an MD file.
    </li>
</ul>

------------

## How to Use the App

<ol>
    <li>
    Fill the form to best describe your 3D model and its attachments:
        <ul>
            <li>
            Model details field is <strong>optional</strong>
            </li>
            <li>
            Model contents adds items that are included in the model's file, it must include <strong>at least 1 item</strong>
            </li>
            <li>
            Mesh Details describes the model's geometry, it is required and will get the default values set on load unless changed by the user. Each field <strong>takes 1 choice</strong>.
            </li>
            <li>
            Poly count is required, it is the number of polygons and vertices forming your model(s), the polygon unit is <strong>Triangles</strong>.
            </li>
            <li>
            Materials is <strong>optional</strong>, it contains the texture sets included with the model. If no sets were added, the materials and related fields are defaulted to a "Not available" value, which will appear in the final sheet.
            </li>
            <li>
            Texture details describes the textures included in the model (if available). <strong>UV mapping is independent</strong> of the materials field and if left empty defaults to a "Not Available" value.
            </li>
            <li>
            The target website changes the formatting symbols generated in the final sheet as they differ from site to site.
            </li>
        </ul>
    </li>
    <li>
    Click the lightning bolt button to generate a sheet, in case of an error, an error message will refer to the mistake's location in the form.
    </li>
    <li>
    After the sheet is generated, highlight and copy the text <strong>OR</strong> use the copy button to automatically copy to the clipboard.
    </li>
    <li>
    Paste the sheet into the description box of the website where the model is being uploaded, no further editing is needed.
    </li>
</ol>

-----------

## Using elements.js (For Developers)
<br></br>

    label({
        id: String, undefined ? ""
        for: String, undefined ? ""
        text: String, undefined ? "Default Text"
        classes: Array of Strings, undefined ? []
    });

<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Parameter</th>
        <th style="text-align: inherit;">Use</th>
    </tr>
    <tr>
        <td>id</td>
        <td>Set the element's id attribute</td>
    </tr>
     <tr>
        <td>for</td>
        <td>Set the element's for attribute</td>
    </tr>
    <tr>
        <td>text</td>
        <td>Set the element's text content</td>
    </tr>
    <tr>
        <td>classes</td>
        <td>Add CSS classes to the label</td>
    </tr>
</table>
<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Returns</th>
    </tr>
    <tr>
        <td>HTML label element</td>
    </tr>
</table>

<br></br>

    textArea({
        id: String, undefined ? ""
        name: String, undefined ? ""
        cols: Number, undefined ? 30
        rows: Number, undefined ? 10
        placeholder: String, undefined ? "Write text",
        classes: Array of Strings, undefined ? [],
        required: Boolean, undefined ? false
    });

<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Parameter</th>
        <th style="text-align: inherit;">Use</th>
    </tr>
    <tr>
        <td>id</td>
        <td>Set the element's id attribute</td>
    </tr>
     <tr>
        <td>name</td>
        <td>Set the element's name attribute</td>
    </tr>
    <tr>
        <td>cols</td>
        <td>Set the element's cols attribute</td>
    </tr>
    <tr>
        <td>rows</td>
        <td>Set the element's rows attribute</td>
    </tr>
    <tr>
        <td>placeholder</td>
        <td>Set the element's placeholder attribute</td>
    </tr>
    <tr>
        <td>classes</td>
        <td>Add CSS classes to the textarea</td>
    </tr>
    <tr>
        <td>required</td>
        <td>Set the element as required</td>
    </tr>
</table>
<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Returns</th>
    </tr>
    <tr>
        <td>element : HTML textarea element</td>
    </tr>
    <tr>
        <td>getContent : function to get current value</td>
    </tr>
</table>

<br></br>

    iconButton({
        id: String, undefined ? ""
        type: String, undefined ? "button"
        icon: Image object, undefined ? defaultIcon
        btnClasses: Array of Strings, undefined ? []
        iconClasses: Array of Strings, undefined ? []
        clickFunction: Function, undefined ? () => {},
    });

<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Parameter</th>
        <th style="text-align: inherit;">Use</th>
    </tr>
    <tr>
        <td>id</td>
        <td>Set the element's id attribute</td>
    </tr>
     <tr>
        <td>type</td>
        <td>Set the element's type attribute</td>
    </tr>
    <tr>
        <td>icon</td>
        <td>control the button's icon, defaultIcon is a plus icon</td>
    </tr>
    <tr>
        <td>btnClasses</td>
        <td>Add CSS classes to the button</td>
    </tr>
    <tr>
        <td>iconClasses</td>
        <td>Add CSS classes to the icon</td>
    </tr>
    <tr>
        <td>clickFunction</td>
        <td>Add a function to execute on click events</td>
    </tr>
</table>
<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Returns</th>
    </tr>
    <tr>
        <td>HTML button element</td>
    </tr>
</table>

<br></br>

    button({
        id: String, undefined ? ""
        type: String, undefined ? "button"
        classes: Array of Strings, undefined ? []
        text: String, undefined ? "click here"
        clickFunction: Function, undefined ? () => {},
    });

<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Parameter</th>
        <th style="text-align: inherit;">Use</th>
    </tr>
    <tr>
        <td>id</td>
        <td>Set the element's id attribute</td>
    </tr>
     <tr>
        <td>type</td>
        <td>Set the element's type attribute</td>
    </tr>
    <tr>
        <td>classes</td>
        <td>Add CSS classes to the button</td>
    </tr>
    <tr>
        <td>text</td>
        <td>Set the button's text content</td>
    </tr>
    <tr>
        <td>clickFunction</td>
        <td>Add a function to execute on click events</td>
    </tr>
</table>
<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Returns</th>
    </tr>
    <tr>
        <td>HTML button element</td>
    </tr>
</table>

<br></br>

    inputNumber({
        id: String, undefined ? ""
        name: String, undefined ? ""
        placeholder: String, undefined ? "",
        min: Number | String, undefined ? ""
        max: Number | String, undefined ? ""
        classes: Array of Strings, undefined ? []
        required: Boolean, undefined ? false
        errorMsg: String, undefined ? "Invalid Input"
    });

<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Parameter</th>
        <th style="text-align: inherit;">Use</th>
    </tr>
    <tr>
        <td>id</td>
        <td>Set the element's id attribute</td>
    </tr>
    <tr>
        <td>name</td>
        <td>Set the element's name attribute</td>
    </tr>
     <tr>
        <td>placeholder</td>
        <td>Set the element's placeholder attribute</td>
    </tr>
    <tr>
        <td>min</td>
        <td>Set the input's minimum range</td>
    </tr>
    <tr>
        <td>max</td>
        <td>Set the input's maximum range</td>
    </tr>
    <tr>
        <td>classes</td>
        <td>Add CSS classes to the element</td>
    </tr>
    <tr>
        <td>required</td>
        <td>Set the element as required</td>
    </tr>
    <tr>
        <td>errorMsg</td>
        <td>Define a custom error message for illegal input (general error message)</td>
    </tr>
</table>
<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Returns</th>
    </tr>
    <tr>
        <td>element : HTML number input element</td>
    </tr>
    <tr>
        <td>getContent : function to get current value</td>
    </tr>
    <tr>
        <td>clearContent : function to clear current value</td>
    </tr>
    <tr>
        <td>isValid : function to get validity state of the input</td>
    </tr>
    <tr>
        <td>getError : function to get the custom error message</td>
    </tr>
</table>

<br></br>

    inputText({
        id: String, undefined ? ""
        name: String, undefined ? ""
        placeholder: String, undefined ? "",
        minLength: Number | String, undefined ? ""
        maxLength: Number | String, undefined ? ""
        classes: Array of Strings, undefined ? []
        required: Boolean, undefined ? false
        errorMsg: String, undefined ? "Invalid Input"
    });

<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Parameter</th>
        <th style="text-align: inherit;">Use</th>
    </tr>
    <tr>
        <td>id</td>
        <td>Set the element's id attribute</td>
    </tr>
    <tr>
        <td>name</td>
        <td>Set the element's name attribute</td>
    </tr>
     <tr>
        <td>placeholder</td>
        <td>Set the element's placeholder attribute</td>
    </tr>
    <tr>
        <td>minLength</td>
        <td>Set the input's minimum number of characters</td>
    </tr>
    <tr>
        <td>maxLength</td>
        <td>Set the input's maximum number of characters</td>
    </tr>
    <tr>
        <td>classes</td>
        <td>Add CSS classes to the element</td>
    </tr>
    <tr>
        <td>required</td>
        <td>Set the element as required</td>
    </tr>
    <tr>
        <td>errorMsg</td>
        <td>Define a custom error message for illegal input (general error message)</td>
    </tr>
</table>
<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Returns</th>
    </tr>
    <tr>
        <td>element : HTML text input element</td>
    </tr>
    <tr>
        <td>getContent : function to get current value</td>
    </tr>
    <tr>
        <td>clearContent : function to clear current value</td>
    </tr>
    <tr>
        <td>isValid : function to get validity state of the input</td>
    </tr>
    <tr>
        <td>getError : function to get the custom error message</td>
    </tr>
</table>

<br></br>

    div({
        id: String, undefined ? ""
        classes: Array of Strings, undefined ? []
        children: Array of HTML Elements, undefined ? [],
    });

<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Parameter</th>
        <th style="text-align: inherit;">Use</th>
    </tr>
    <tr>
        <td>id</td>
        <td>Set the element's id attribute</td>
    </tr>
        <td>classes</td>
        <td>Add CSS classes to the element</td>
    </tr>
    <tr>
        <td>children</td>
        <td>HTML elements to be appended to the div element, in the same order they were passed</td>
    </tr>
</table>
<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Returns</th>
    </tr>
    <tr>
        <td>element : HTML div element</td>
    </tr>
</table>

<br></br>

    p({
        id: String, undefined ? ""
        classes: Array of Strings, undefined ? []
        text: String, undefined ? "Default text",
    });

<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Parameter</th>
        <th style="text-align: inherit;">Use</th>
    </tr>
    <tr>
        <td>id</td>
        <td>Set the element's id attribute</td>
    </tr>
        <td>classes</td>
        <td>Add CSS classes to the element</td>
    </tr>
    <tr>
        <td>text</td>
        <td>element's text content</td>
    </tr>
</table>
<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Returns</th>
    </tr>
    <tr>
        <td>element : HTML p element</td>
    </tr>
</table>

<br></br>

    select({
        id: String, undefined ? ""
        lblText: String, undefined ? "Default text"
        Classes: Array of Strings, undefined ? []
        choiceClasses: Array of Strings, undefined ? []
        labelClasses: Array of Strings, undefined ? []
        optionClasses: Array of Strings, undefined ? []
        selectedClasses: Array of Strings, undefined ? []
        choices: Array of Strings, undefined ? ["Default option 1", "Default option 2"]
        minChoices: Number, undefined ? 0
    });

<strong>Description: </strong>A custom-made check list element. Allows multiple checks and can have a minimum number of active checks

<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Parameter</th>
        <th style="text-align: inherit;">Use</th>
    </tr>
    <tr>
        <td>id</td>
        <td>Set the container's id attribute</td>
    </tr>
    <tr>
        <td>lblText</td>
        <td>Set the check list's label text</td>
    </tr>
    <tr>
        <td>classes</td>
        <td>Add CSS classes to the container</td>
    </tr>
    <tr>
        <td>choiceClasses</td>
        <td>Add CSS classes to option buttons</td>
    </tr>
    <tr>
        <td>labelClasses</td>
        <td>Add CSS classes to the check list's label</td>
    </tr>
    <tr>
        <td>optionClasses</td>
        <td>Add CSS classes to option buttons' container</td>
    </tr>
    <tr>
        <td>selectedClasses</td>
        <td>Add CSS classes to mark checked option buttons</td>
    </tr>
    <tr>
        <td>choices</td>
        <td>Options to be added to the check list</td>
    </tr>
    <tr>
        <td>minChoices</td>
        <td>Minimum number of checked buttons at any time, 0 means no limit.</td>
    </tr>
</table>
<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Returns</th>
    </tr>
    <tr>
        <td>element : HTML div element</td>
    </tr>
    <tr>
        <td>getSelected : function to get current checked items</td>
    </tr>
</table>

<br></br>

    radio({
        id: String, undefined ? ""
        lblText: String, undefined ? "Default text"
        Classes: Array of Strings, undefined ? []
        choiceClasses: Array of Strings, undefined ? []
        labelClasses: Array of Strings, undefined ? []
        optionClasses: Array of Strings, undefined ? []
        selectedClasses: Array of Strings, undefined ? []
        choices: Array of Strings, undefined ? ["Default option 1", "Default option 2"]
        defaultChoice: Number, undefined ? 0
    });

<strong>Description: </strong>A custom-made radio button element. Looks and behaves just like the select component but allows only one choice active at any time.

<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Parameter</th>
        <th style="text-align: inherit;">Use</th>
    </tr>
    <tr>
        <td>id</td>
        <td>Set the container's id attribute</td>
    </tr>
    <tr>
        <td>lblText</td>
        <td>Set the check list's label text</td>
    </tr>
    <tr>
        <td>classes</td>
        <td>Add CSS classes to the container</td>
    </tr>
    <tr>
        <td>choiceClasses</td>
        <td>Add CSS classes to option buttons</td>
    </tr>
    <tr>
        <td>labelClasses</td>
        <td>Add CSS classes to the radio button's label</td>
    </tr>
    <tr>
        <td>optionClasses</td>
        <td>Add CSS classes to option buttons' container</td>
    </tr>
    <tr>
        <td>selectedClasses</td>
        <td>Add CSS classes to mark checked option buttons</td>
    </tr>
    <tr>
        <td>choices</td>
        <td>Options to be added to the check list</td>
    </tr>
    <tr>
        <td>defaultChoice</td>
        <td>Index of the button selected by default</td>
    </tr>
</table>
<table style="width: 100%; text-align: center;">
    <tr>
        <th style="text-align: inherit;">Returns</th>
    </tr>
    <tr>
        <td>element : HTML div element</td>
    </tr>
    <tr>
        <td>getSelected : function to get current checked button</td>
    </tr>
</table>