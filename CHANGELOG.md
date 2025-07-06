# <img src="./src/assets/logo/logo.svg" width="70px"> 3D Model Data Sheet Generator

## Change log

- ➕: Feature
- 🛠️: Fix
- ⚙️: Code change with no impact on user experience

### **2.1.1 (unreleased)**

- 🛠️ Fixed checkbox fieldset reset function not working properly.

### **2.1.0 (16 May, 2025)** 

- ➕ Added a reset button to each fieldset.
- 🛠️ Fixed error popup displaying a "scroll to field" link when the user copies nothing to the clipboard.
- 🛠️ Fixed resetting form repeating some fieldset items due to a bug in the removeAllButtons function.
- ⚙️ Removed unnecessary visibility toggling when opening/closing popups.
- ⚙️ Moved popup CSS classes to its own CSS module instead of the common module.
- ⚙️ Removed redundant isOpen flag from popup component.

### **2.0.2 (15 May, 2025)**

- 🛠️ Fixed page titles not working properly.
- 🛠️ Fixed checkbox taking space on screen while hidden, this bug was caused by changing checkbox returnto a div instead of a fragment.
- 🛠️ Fixed broken footer home link.
- ⚙️ Removed redundant HTML templates, now using index.html as template for all pages.
- ⚙️ CreateElement utility function now handles CSS variables, they can be passed directly as a prop instead of using element.style.setProperty() on returned object.
- ⚙️ Button UI component now returns an object instead of the element directly.
- ⚙️ Checkbox UI component now returns an object instead of the element directly.
- ⚙️ FieldsContainer UI component now returns an object instead of the element directly.
- ⚙️ ItemCheckbox UI component now returns an object instead of the a fragment.
- ⚙️ Radio UI component now returns an object instead of fragment.
- ⚙️ Unified checkbox naming (sometimes it was "checkbox" and others it was "checkBox").
- ⚙️ Replaced syntax error throw when datasheet set.data is not an array with a type error throw.
- ⚙️ Improved fieldset component's default legend text.
- ⚙️ Removed unused element in the footer component.
- ⚙️ Removed unused component file and its unit tests.
- ⚙️ Removed "required" key from number input and text input props, the form validates using JS not the environment, required attributes are not needed.
- ⚙️ Removed close function from the returned object of Popup component, popup is closed/destroyed from within, no need to expose this function.
- ⚙️ RadioGroup's remove funciton now iterates over children removing them one at a time instead of using innerHTML.
- ⚙️ RadioGroup's asddButton funciton now accepts rest of arguments instead of cheching for argument type whether it's an array or not.

### **2.0.1 (8 May, 2025)**

- 🛠️ Fix broken home link (again).
- 🛠️ Fixed nav bar not highlighting active page.
- ⚙️ Configured CSS-loader for modules in production mode, this is why the :global() was not working in production.
- ⚙️ Replaced custom popup events with creating new instances of the popup element.

### **2.0.0 (8 May, 2025)**

- ➕ Added an about page with source links and latest release notes.
- ➕ Items added by user are now checked for invalid characters that break the target site's formatting (example: a "- " will unexpectedly create a new unordered list on CGTrader).
- ➕ All actions that remove data now show a confirmation dialog to avoid unfortunate accidents.
- ➕ Added a nav menu that replaces the nav bar when using a small screen.
- ➕ Empty lists now show text indicating it has no items.
- ➕ Replaced edge splitting options with industry standard ones.
- ➕ Form can now be reset to default values by clicking a button.
- ➕ Added a hint text to some fieldsets.
- ➕ Required fieldsets are now flagged with an (*).
- ➕ Added dark mode.
- ➕ Improved keyboard accessibility for all controls.
- ➕ Improved buttons accessibility.
- ➕ Buttons now have readable text on wider screens.
- ➕ Overhauled the entire color palette.
- ➕ Polygon and vertex counts (generated sheet) are now comma-separated for better readability.
- ➕ Missing optional fields are highlighted in red on the sheet in case the user forgot to fill them.
- ➕ Generated sheet is now displayed as a part of the document with titles and lists instead of a read-only text area.
- ➕ Selected options are labeled by a check mark.
- ➕ Added an icon to the app's tab.
- ➕ Added "animation" option to the rigging fieldset.
- ➕ Added "Non-uniform polygons" option to mesh type fieldset.
- ➕ Added "Mid-poly" option to model tier fieldset.
- ➕ Aligned page content more towards the center and added a max width for wide screens.
- ➕ Softened element shadows.
- ➕ Added a model title field.
- ➕ Improved accessibility for multiple components.
- ➕ Added more descriptive options to the UV fieldset.
- ➕ Model contents are now a single field and the user can freely enter all the related info like the item count.
- ➕ Texture sets are now a single field and the user can freely enter all the related info like the resolution if applicable.
- ➕ User can now scroll to invalid form fields using a link in the error notification instead of manually scrolling up.
- ➕ Successfully completed actions are now displayed in a small notification popup at the bottom of the screen.
- ➕ Errors are now displayed in a small notification popup at the bottom of the screen.
- ➕ Removed the "scaled to real world dimensions" fieldset.
- ➕ Document state is now saved to session storage to persist through reloads.
- ➕ Users can now add their own options to some fieldsets.
- ➕ Redesigned the logo.
- ➕ Added extra options to the target site options.
- ➕ Added feature to generate unformatted text (selecting none in the target site fieldset).
- ➕ Changed app structure to include a home page, a page for each form (currently only 3D model is available) and an about page.
- ⚙️ Reduced reliance on media queries.
- ⚙️ Added all icons to a barrel file.
- ⚙️ Added proper metadata.
- ⚙️ Switched from global scope CSS to CSS modules.
- ⚙️ Implemented unit tests for some components.
- ⚙️ Components are now created using a utility function based on React's JSX.
- ⚙️ Extracted each component in the ```components.js``` file into its own file.
- ⚙️ Extracted each component in the ```elements.js``` file into its own file.

### **1.0.2 (20 Mar, 2023)**

- ➕ Added "packed height + normal" to texture maps options.
- ➕ Added "none" to edge split options.
- ➕ Added "non-PBR" to workflow options.
- ➕ Added "thickness" to overlapping UVs option.

### **1.0.1 (11 Jan, 2023)**

- ➕ Added different normal map formats to texture maps options.
- ➕ Texture maps options are now sorted alphabetically.
- 🛠️ Fixed grid templates not wrking properly on different screens
- 🛠️ Lebels are now more descriptive.
- 🛠️ Improved text fields on narrow screens.
- 🛠️ Fixed item font size on narrow screens.
- 🛠️ Placeholder text color is now darker and more readable.

### **1.0.0 (8 Jan, 2023)** 

- 🚀 First Build.