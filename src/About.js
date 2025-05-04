import styles from "./About.module.css";
import IconLink from "./components/IconLink";
import icons from "./barrels/icons.barrel";
import { createElement } from "./utils/createElement";

export default function About()
{
    const appTitle = createElement(
        "h1",
        {
            class: styles["app-title"]
        },
        [
            "3D Model Datasheet Generator"
        ]
    );

    const appVersion = createElement(
        "h2",
        {
            class: styles["app-version"]
        },
        [
            "Version 2.0.0"
        ]
    );

    const sourceLink = IconLink({

        href: "https://github.com/Diaa-E/3d-model-data-sheet-generator",
        iconPath: icons.githubIcon,
        text: "Source Code"
    });

    const changeLogLink = IconLink({

        href: "https://github.com/Diaa-E/3d-model-data-sheet-generator/blob/main/CHANGELOG.md",
        iconPath: icons.changelogIcon,
        text: "Full Change Log",
    })

    const linksWrapper = createElement(
        "div",
        {
            class: styles["links-wrapper"]
        },
        [
            sourceLink.element,
            changeLogLink.element
        ]
    );

    const changesTitle = createElement(
        "h2",
        {
            class: styles["changes-title"]
        },
        [
            "What's new in this version?"
        ]
    );

    const changesList = [
        `Items added by user are now checked for invalid characters that break the target site's formatting.`,
        `All actions that remove data now show a confirmation dialog to avoid unfortunate accidents.`,
        `Added a nav menu that replaces the nav bar when using a small screen.`,
        `Empty lists now show text indicating it has no items.`,
        `Replaced edge splitting options with industry standard ones.`,
        `Form can now be reset to default values by clicking a button.`,
        `Added a hint text to some fieldsets.`,
        `Required fieldsets are now flagged with an (*).`,
        `Added dark mode.`,
        `Improved keyboard accessibility for all controls.`,
        `Improved buttons accessibility.`,
        `Buttons now have readable text on wider screens.`,
        `Overhauled the entire color palette.`,
        `Polygon and vertex counts (generated sheet) are now comma-seperated for better readibility.`,
        `Missing optional fields are highlighted in red on the sheet in case the user forgot to fill them.`,
        `Generated sheet is now displayed as a part of the document with titles and lists instead of a read-only text area.`,
        `Selected options are labeld by a check mark.`,
        `Added an icon to the app's tab.`,
        `Added "animation" option to the rigging fieldset.`,
        `Added "Non-uniform polygons" option to mesh type fieldset.`,
        `Added "Mid-poly" option to model tier fieldset.`,
        `Aligned page content more towards the center and added a max width for wide screens.`,
        `Softened element shadows.`,
        `Added a model title field.`,
        `Improved accessibility for multiple compoenents.`,
        `Added more descriptive options to the UV fieldset.`,
        `Model contents are now a single field an the user can freely enter all the related info like the item count.`,
        `Texture sets are now a single field and the user can freely enter all the related info like the resolution if applicable.`,
        `User can now scroll to invalid form fields using a link in the error notification instead of manually scrolling up.`,
        `Successfully completed actions are now displayed in a small notification popup at the bottom of the screen.`,
        `Errors are now displayed in a small notification popup at the bottom of the screen.`,
        `Removed the "scaled to real world dimensions" fieldset.`,
        `Document state is now saved to session storage to persist through reloads.`,
        `Users can now add their own options to some fieldsets.`,
        `Redesigned the logo.`,
        `Added extra options to the target site options.`,
        `Added feature to generate unformatted text (selecting none in the target site fieldset).`,
        `Changed app structure to include a home page, a page for each form (currently only 3D model is available) and an about page.`,
    ];

    const changeListItems = changesList.map(item => {

        return createElement(
            "li",
            {
                class: styles["change-list-item"]
            },
            [
                item
            ]
        );
    });

    const changeUnorderedList = createElement(
        "ul",
        {
            class: styles["change-list"]
        },
        changeListItems,
    )

    const contentDiv = createElement(
        "div",
        {
            id: "content"
        },
        [
            appTitle,
            appVersion,
            linksWrapper,
            changesTitle,
            changeUnorderedList
        ]
    );

    return [ contentDiv ];
}