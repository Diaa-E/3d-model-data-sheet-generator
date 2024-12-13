# <img src="./src/assets/logo/logo.svg" width="70px"> 3d Model Data Sheet Generator

## Change log

- ➕: Feature
- 🛠️: Fix
- ⚙️: Code change with ni impact on user experience

### **2.0.0 (unreleased)**

- ➕ Missing optional fields are highlighted in red on the sheet in case the user forgot to fill them.
- ➕ Generated sheet is now displayed as a part of the document with titles and lists instead of a read-only text area.
- ➕ Selected options are labeld by a check mark.
- ➕ Add favicon.
- ➕ Added an extra option for animation.
- ➕ Added "Non-uniform polygons" option to mesh type fieldset.
- ➕ Added "Mid-poly" option to model tier fieldset.
- ➕ Aligned page content more towards the center and added a max width for wide screens.
- ➕ Softened element shadows.
- ➕ Added a model title field.
- ➕ Improved accessibility for multiple compoenents.
- ➕ Added more descriptive options to the UV fieldset.
- ➕ Model contents are now a single field an the user can freely enter all the related info like the item count.
- ➕ Texture sets are now a single field and the user can freely enter all the related info like the resolution if applicable.
- ➕ Errors are now displayed in a small notification popup at the bottom of the screen.
- ➕ Removed the "scaled to real world dimensions" fieldset.
- ➕ Document state is now saved to session storage to persist through reloads.
- ➕ Users can now add their own options to some fieldsets.
- ➕ Redesigned the logo.
- ➕ Added extra options to the target site options.
- ➕ Added feature to generate unformatted text (selecting none in the target site fieldset).
- ⚙️ Reduced reliance on media queries.
- ⚙️ Added all icons to a barrel file.
- ⚙️ Added proper metadata.
- ⚙️ Switched from global scope CSS to CSS modules.
- ⚙️ Wrote unit tests for components.
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