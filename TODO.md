# <img src="./src/assets/logo/logo.svg" width="70px"> 3D Model Data Sheet Generator

## To do list

### Pending 🕝

1. Add reset field button.
1. Check for illegal characters.
1. Add mobile display to footer.
1. Create a dialog box for confirming action.
1. sort selected options before generating sheet.
1. Add feature to edit user added options and items.
1. Add feature to remove user added options and items.

### Completed ✅

1. Add mobile display to header.
1. emphasize empty list text.
1. Change edge split fieldset options to "UV split", "Smoothing split", "All edges".
1. Add reset form button. ~~(It's a wacky solution that requires page reload, but definitely easier than resetting fieldsets manually, one more reason to use React)~~ NVM, I figured it out
1. Fix Fab.com Formatting, might be fixed by replacing heading tags with strong tags. -> Strong tags fixed the problem, but a better solution is matching Fab's tag order: h4 for editor's h1 and h5 for editor's h2.
1. Add tip/hint text to each fieldset.
1. Show empty list text in empty item lists.
1. Add descriptive icons to popup messages.
1. create a success notification popup.
1. Add option to scroll to each error field.
1. Unmount error popup from the DOM after closing.
1. Set newly addded items to checked.
1. Add dark mode.
1. Use text button for generation.
1. Make options keyboard focusable.
1. Show button text + icon on wider screens.
1. Revisit color palette.
1. Seperate polygon and vertex count by comma.
1. Highlight error fields.
1. Lighten shadows.
1. Move content more towards the center instead of stretching across the page.
1. Improve accessibility.
1. Revisit logo.
1. Write unit tests for components.
1. Extract each component into its own module.
1. Feature: Add preset and custom resolution for texture sets.
1. Feature: custom texture workflow can be added by user
1. Feature: Add user specified texture map.
1. Add proper metadata.
1. Switch to CSS modules.

### Cancelled ❌

1. Add "Available 3D formats" fieldset. -> Redundant: All websites provide this info by default.
1. Add option to insert links to images. -> Not all sites support this feature.
1. Add texture type UDIM or single image to each texture map. -> Redundant: Can be added as a custom texture map.
1. Add an extra field to model info for disclaimers. -> Redundant: can be added in the description field.
1. add animation for errorpopup text update. -> New messages create a new popup and stack on top of each other instead.
1. Set the default of real world scale to yes. -> Removed the entire field.