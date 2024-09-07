"use strict";

import addIcon from "./icons/add.svg";
import deleteIcon from "./icons/delete.svg";
import generateIcon from "./icons/bolt.svg";
import copyIcon from "./icons/copy.svg";
import logo from "./logo/logo.svg";
import {inputNumber, inputText, div, p, select, radio} from "./elements";
import label from "./components/label";
import textArea from "./components/textArea";
import iconButton from "./components/iconButton";
import domUtility from "./dom.utility";

export function App()
{
    const logoHeader = LogoHeader();
    const modelDetails = ModelDetails();
    const modelContents = ModelContents();
    const meshDetails = MeshDetails();
    const polyCount = PolyCount();
    const materials = Materials();
    const textureDetails = TextureDetails();
    const targetSite = TargetSite();
    const dataSheet = Datasheet();

    function start()
    {
        const form = document.querySelector("#content");
        document.body.insertBefore(logoHeader.logo, form);
        document.body.insertBefore(logoHeader.header, form);
        document.body.insertBefore(logoHeader.slogan, form);
        form.append(
            modelDetails.component,
            modelContents.component,
            meshDetails.component,
            polyCount.component,
            materials.component,
            textureDetails.component,
            targetSite.component,
            dataSheet.component,
        );

        //using a submit event to have access to
        //components without having to pass anything to button events
        form.addEventListener("submit", (e) => {

            e.preventDefault();

            let modelData;
            if (validateForm())
            {
                modelData = ModelData();
                generateSheet(SpecialCharacters(), ModelData());
            }
            else
            {
                return
            }
        });
    }

    function generateSheet(chars, data)
    {
        let sheet = "";
        const SEPERATOR = ", ";

        //model Details
        sheet += `${chars.boldOpen}${data.details}${chars.boldClose}\n`;

        //Model Contents
        sheet += `\n${chars.boldOpen}Model Contents:${chars.boldClose}\n\n`;
        data.items.forEach(item => {
            sheet += `${chars.list}${item}\n`;
        });

        //Mesh
        sheet += `\n${chars.boldOpen}Mesh:${chars.boldClose}\n\n`;
        sheet += `${chars.list}Mesh Type: ${data.mesh.meshType}\n`;
        sheet += `${chars.list}Tier: ${data.mesh.polyTier}\n`;
        sheet += `${chars.list}Model is Game-ready: ${data.mesh.gameReady}\n`;
        sheet += `${chars.list}Model is Subdivision-ready: ${data.mesh.subdivision}\n`;
        sheet += `${chars.list}Edge Split: ${data.mesh.edgeSplit}\n`;
        sheet += `${chars.list}Model is Scaled to Real World Scale: ${data.mesh.realWorldScale}\n`;
        sheet += `${chars.list}Model is Rigged: ${data.mesh.rigged}\n`;

        //Polycount
        sheet += `\n${chars.boldOpen}PolyCount:${chars.boldClose}\n\n`;
        sheet += `${chars.list}Triangles: ${data.polyCount.tris}\n`;
        sheet += `${chars.list}Vertices: ${data.polyCount.verts}\n`;

        //Materials
        sheet += `\n${chars.boldOpen}Materials:${chars.boldClose}\n\n`;
        data.materials.forEach(material => {
            sheet += `${chars.list}${material}\n`;
        });

        //Textures
        sheet += `\n${chars.boldOpen}Textures:${chars.boldClose}\n\n`;
        sheet += `${chars.list}Texture File Format(s): ${data.textures.format.join(SEPERATOR)}\n`;
        sheet += `${chars.list}Texture Workflow(s): ${data.textures.workflow.join(SEPERATOR)}\n`;
        sheet += `${chars.list}UV Mapping: ${data.textures.uv.join(SEPERATOR)}\n`;

        //Maps
        sheet += `\n${chars.boldOpen}Texture Maps:${chars.boldClose}\n\n`;
        data.textures.maps.forEach(map => {
            sheet += `${chars.list}${map}\n`;
        })

        dataSheet.writeSheet(sheet);
    }

    function SpecialCharacters()
    {
        const specialChars = {
            boldOpen: "",
            boldClose: "",
            italicOpen: "",
            italicClose: "",
            list: "", 
        }
        switch (targetSite.getData().target)
        {
            case "Sketchfab": 
                specialChars.boldOpen = "**";
                specialChars.boldClose = "**";
                specialChars.list = "* ";
                specialChars.italicOpen = "*";
                specialChars.italicClose = "*";
                break;
            case "CGTrader":
                specialChars.boldOpen = "**";
                specialChars.boldClose = "**";
                specialChars.list = "- ";
                specialChars.italicOpen = "_";
                specialChars.italicClose = "_";
                break;
        }

        return specialChars;
    }

    function validateForm()
    {
        const SUBMIT_ERROR = "There is an error at:";

        if (!modelContents.getData().items.length > 0)
        {
            modelContents.showError("A model must include at least 1 item")
            dataSheet.showError(`${SUBMIT_ERROR} model contents`)
        }
        else if (polyCount.getData().tris === "" || polyCount.getData().verts === "")
        {
            polyCount.showError("Any model must have a polygon and vertex count");
            dataSheet.showError(`${SUBMIT_ERROR} polycount`)
        }
        else
        {
            modelContents.clearError();
            polyCount.clearError();
            dataSheet.clearError();
            
            return true
        }

        return false
    }

    function ModelData()
    {
        //reduce multiple getData() calls to a single one
        const sectionDetails = modelDetails.getData();
        const sectionItems = modelContents.getData();
        const sectionMesh = meshDetails.getData();
        const sectionPolyCount = polyCount.getData();
        const sectionMaterials = materials.getData();
        const sectionTextures = textureDetails.getData();

        const NOT_AVAILABLE = "N/A";

        const model = {

            details : sectionDetails.details,
            items : sectionItems.items,
            mesh: {
                meshType: sectionMesh.meshType,
                polyTier : sectionMesh.polyTier,
                gameReady: sectionMesh.gameReady,
                subdivision: sectionMesh.subdivision,
                edgeSplit: sectionMesh.edgeSplit,
                realWorldScale: sectionMesh.realWorldScale,
                rigged: sectionMesh.rigged,
            },
            polyCount: {
                tris: sectionPolyCount.tris,
                verts: sectionPolyCount.verts,
            },
            materials: sectionMaterials.materials.length > 0 ? sectionMaterials.materials : [NOT_AVAILABLE],
            textures: {
                format: sectionMaterials.materials.length > 0 ? sectionTextures.format : [NOT_AVAILABLE],
                workflow: sectionMaterials.materials.length > 0 ? sectionTextures.workflow : [NOT_AVAILABLE],
                uv: sectionTextures.uv.length > 0 ? sectionTextures.uv : [NOT_AVAILABLE],
                maps: sectionMaterials.materials.length > 0 ? sectionTextures.maps : [NOT_AVAILABLE],
            },
        };

        return model;
    }

    return {start}
}

function ModelDetails()
{
    const lblModelDetails = label({
        for: "details",
        text: "Model Description",
        classes: ["label"]});

    const txtModelDetails = textArea({
        id: "details",
        placeholder:"Describe your model...", 
        classes: ["text-area"]});

    //parent card
    const divWrapper = div({
        id: "modelDetails",
        classes: ["card"],
        children: [lblModelDetails, txtModelDetails.element]
    })

    function getData()
    {
        return {details: txtModelDetails.getContent()};
    }

    return {component: divWrapper, getData};
}

function ModelContents()
{
    const lblModelItems = label({
        text: "Model Contents",
        classes: ["label"]});
    //item name input field
    const lblItemName = label({
        text: "Item's Name",
        classes: ["label-input"],
        for: "itemName",
    });
    const txtItemName = inputText({
        name: "itemName",
        id: "itemName",
        classes: ["text-input"],
        placeholder: "Item's name",
        required: true,
        errorMsg: "Any item must have a name",
    });

    const divItemName = div({
        classes: ["input-container"],
        children: [lblItemName, txtItemName.element]
    })

    //item count input field
    const lblItemCount = label({
        text: "Item's Count",
        classes: ["label-input"],
        for: "itemCount",
    });

    const txtItemCount = inputNumber({
        name: "itemCount",
        id: "itemCount",
        classes: ["text-input"],
        min: "1",
        placeholder: "How many of it included",
        required: true,
        errorMsg: "There has to be at least 1 of the item"
    });

    const divItemCount = div({
        classes: ["input-container"],
        children: [lblItemCount, txtItemCount.element]
    });

    //add button
    const btnAdd = iconButton({
        icon: addIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        clickFunction: addItem});

    const divError = ErrorPanel("addItemError");

    const divAddItem = div({
        children: [divItemName, divItemCount, btnAdd],
        classes: ["option", "add"],
    });

    const divWrapper = div({
        id: "modelContents",
        classes: ["card"],
        children: [lblModelItems, divError.element, divAddItem]
    });

    function addItem()
    {
        if (!txtItemName.isValid())
        {
            showError(txtItemName.getError());
        }
        else if (!txtItemCount.isValid())
        {
            showError(txtItemCount.getError());
        }
        else
        {
            divWrapper.append(ListItem(txtItemName.getContent(),
                `x ${txtItemCount.getContent()}`, "modelItem"));
            txtItemCount.clearContent();
            txtItemName.clearContent();
            clearError();
        }
    }

    function getData()
    {
        const divList = document.querySelectorAll("#modelContents>#modelItem");

        const modelItems = [];

        divList.forEach(item => {
            const pList = item.querySelectorAll("p");
            modelItems.push(`${pList[1].textContent} ${pList[0].textContent}`);
        });

        return {items: modelItems};
    }

    function showError(errorMsg)
    {
        divError.showError(errorMsg);
    }

    function clearError()
    {
        divError.clearError();
    }

    return {component: divWrapper, getData, showError, clearError};
}

//instead of writing a unique delete function for every type of list
//since all list items use the .option class it can be used to identify the target
//instead of the id
function removeListItem(e)
{
    let target = e.target.parentNode;
    let counter = 0;

    //keep going up in the tree until the target is found or counter expires
    //counter stops infinite loops, the number 10 is arbitrary
    while (!target.classList.contains("option") && counter < 10)
    {
        target = target.parentNode;
        counter++;
    }

    //the list's parent is always one level higher
    target.parentNode.removeChild(target);
}

function ListItem(firstField, secondField, id)
{
    const divItem = div({
        id: id,
        classes: ["option"],
        children: [
            p({
                text: firstField,
                classes: ["item-name"]
            }),
            p({
                text:secondField,
                classes: ["item-name", "item-count"]
            }),
            iconButton({
                icon: deleteIcon,
                btnClasses: ["button"],
                iconClasses: ["button-icon"],
                clickFunction: removeListItem,
            })
        ]
    });

    return divItem;
}

function ErrorPanel(id)
{
    const divError = div({
        classes: ["error"],
        id: id,
    });

    function showError(errorMsg)
    {
        domUtility.removeClasses(divError, ["info"]);
        divError.textContent = errorMsg;
    }

    function showInfo(info)
    {
        domUtility.addClasses(divError, ["info"]);
        divError.textContent = info;
    }

    function clearError()
    {
        domUtility.removeClasses(divError, ["info"]); //avoid class duplication
        divError.textContent = "";
    }

    return {element: divError, showError, clearError, showInfo};
}

function MeshDetails()
{
    const lblTitle = label({
        text: "Mesh Details",
        classes: ["label"]
    });
    const meshType = radio({
        id: "meshType",
        lblText: "Mesh Type",
        choices: [
            "Polygon Mesh",
            "Triangulated Polygon Mesh",
            "Quad Mesh"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const polyTier = radio({
        id: "polyTier",
        lblText: "Polycount Tier",
        choices: [
            "Lowpoly",
            "Highpoly"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const gameReady = radio({
        id: "gameready",
        lblText: "Model is game-ready",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const subdivision = radio({
        id: "subdivision",
        lblText: "Model is subdivision-ready",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const edgeSplit = radio({
        id: "edgeSplit",
        lblText: "Edge splits",
        choices: [
            "Sharp edges only",
            "All edges",
            "Based on angle",
            "None"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const realWorldScale = radio({
        id: "realWorldScale",
        lblText: "Model is scaled to real world dimensions",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const rigged = radio({
        id: "rigged",
        lblText: "Model is rigged",
        choices: [
            "NO",
            "YES"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const divWrapper = div({
        id: "meshDetails",
        classes: ["card"],
        children: [
            lblTitle,
            meshType.element,
            polyTier.element,
            gameReady.element,
            subdivision.element,
            edgeSplit.element,
            realWorldScale.element,
            rigged.element]
    });

    function getData()
    {
        return {
            meshType: meshType.getSelected(),
            polyTier: polyTier.getSelected(),
            gameReady: gameReady.getSelected(),
            subdivision: subdivision.getSelected(),
            edgeSplit: edgeSplit.getSelected(),
            realWorldScale: realWorldScale.getSelected(),
            rigged: rigged.getSelected(),
        }
    }

    return {component: divWrapper, getData};
}

function PolyCount()
{
    const lblTitle = label({
        text: "Poly Count",
        classes: ["label"]
    });

    const lblTris = label({
        text: "Number of Triangles",
        classes: ["label-input"],
        for: "tris",
    });

    const txtTris = inputNumber({
        name: "tris",
        id: "tris",
        classes: ["text-input"],
        min: "1",
        placeholder: "How many triangles is your model?",
        required: true,
        errorMsg: "Any model must consist of at least 1 polygon",
    });

    txtTris.element.addEventListener("input", () => {

        if (!txtTris.isValid())
        {
            showError(txtTris.getError());
        }
        else
        {
            clearError();
        }
    });

    const divTris = div({
        classes: ["input-container"],
        children: [lblTris, txtTris.element]
    });

    const lblVerts = label({
        text: "Number of vertices",
        classes: ["label-input"],
        for: "verts",
    });

    const txtVerts = inputNumber({
        name: "verts",
        id: "verts",
        classes: ["text-input"],
        min: "1",
        placeholder: "How many vertices is your model?",
        required: true,
        errorMsg: "Any model must consist of at least 1 vertex",
    });

    txtVerts.element.addEventListener("input", () => {

        if (!txtVerts.isValid())
        {
            showError(txtVerts.getError());
        }
        else
        {
            clearError();
        }
    });

    const divVerts = div({
        classes: ["input-container"],
        children: [lblVerts, txtVerts.element]
    });

    const divPolyCount = div({
        children: [divTris, divVerts],
        classes: ["option", "add", "no-button"],
    });

    const divError = ErrorPanel("polycountError");

    const divWrapper = div({
        id: "polyCount",
        classes: ["card"],
        children: [
            lblTitle,
            divError.element,
            divPolyCount,
        ]
    });

    function getData()
    {
        return {
            tris: txtTris.getContent(),
            verts: txtVerts.getContent(),
        }
    }

    function showError(errorMsg)
    {
        divError.showError(errorMsg);
    }

    function clearError()
    {
        divError.clearError();
    }

    return {component: divWrapper, getData, showError, clearError};
}

function Materials()
{
    const lblTitle = label({
        text: "Materials",
        classes: ["label"]
    });

    const lblmaterialName = label({
        text: "Texture set",
        classes: ["label-input"],
        for: "materialName",
    });
    const txtMaterialName = inputText({
        name: "materialName",
        id: "materialName",
        classes: ["text-input"],
        placeholder: "Texture set's name",
        required: true,
        errorMsg: "Any texture set must have a name",
    });

    const divMaterialName = div({
        classes: ["input-container"],
        children: [lblmaterialName, txtMaterialName.element]
    });

    const lblResolution = label({
        text: "Texture Resolution",
        classes: ["label-input"],
        for: "resolution",
    });

    const txtResolution = inputNumber({
        name: "resolution",
        id: "resolution",
        classes: ["text-input"],
        min: "1",
        placeholder: "What are the texture's dimensions?",
        required: true,
        errorMsg: "The texture must be at least 1 x 1 pixels",
    });

    const divMaterialResolution = div({
        classes: ["input-container"],
        children: [lblResolution, txtResolution.element]
    });

    const btnAdd = iconButton({
        icon: addIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        clickFunction: addTextureSet});

    const divError = ErrorPanel("addMaterialError");

    const divMaterial = div({
        children: [divMaterialName, divMaterialResolution, btnAdd],
        classes: ["option", "add"],
    });

    const divWrapper = div({
        id: "materials",
        classes: ["card"],
        children: [
            lblTitle,
            divError.element,
            divMaterial
        ]
    });

    function addTextureSet()
    {
        if (!txtMaterialName.isValid())
        {
            showError(txtMaterialName.getError());
        }
        else if (!txtResolution.isValid())
        {
            showError(txtResolution.getError());
        }
        else
        {
            divWrapper.append(ListItem(
                txtMaterialName.getContent(),
                `${txtResolution.getContent()} x ${txtResolution.getContent()} Pixels`, "textureSet"));
            txtResolution.clearContent();
            txtMaterialName.clearContent();
            clearError();
        }
    }

    function getData()
    {
        const divList = document.querySelectorAll("#materials>#textureSet");

        const modelMaterials = [];

        divList.forEach(item => {
            const pList = item.querySelectorAll("p");
            modelMaterials.push(`${pList[0].textContent} (${pList[1].textContent})`);
        });

        return {materials: modelMaterials};
    }

    function showError(errorMsg)
    {
        divError.showError(errorMsg);
    }

    function clearError()
    {
        divError.clearError();
    }

    return {component: divWrapper, getData, showError, clearError};
}

function TextureDetails()
{
    const lblTitle = label({
        text: "Texture Details",
        classes: ["label"]
    });

    const textureExt = select({
        lblText: "Texture format",
        id: "textureExt",
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        choices: [".PNG", ".EXR", ".JPEG"],
        minChoices: 1,
        optionClasses: ["button-choice"]
    });

    const workflow = select({
        id: "workflow",
        lblText: "Texture Workflow",
        choices: [
            "PBR Metallic Roughness",
            "PBR Specular Gloss",
            "Non-PBR"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        minChoices: 1,
        optionClasses: ["button-choice"]
    });

    const uvMapping = select({
        id: "uvs",
        lblText: "UV Mapping",
        choices: [
            "Overlapping (Mirrored)",
            "Overlapping (Duplicate/Array/Thickness)",
            "Non-Overlapping (unique)"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const maps =  select({
        id: "maps",
        lblText: "Texture Maps",
        choices: [
            "Base Color",
            "Base Color + Alpha Opacity",
            "Normal GL",
            "Normal DX",
            "Height/Bump",
            "Opacity",
            "Metallic",
            "Glossiness",
            "Roughness",
            "Specular",
            "Ambient Occlusion",
            "Packed RGB (AO + Roughness + Metallic)",
            "ID Map",
            "Emissive",
            "Packed Normal GL + Height",
            "Packed Normal DX + Height"].sort(),
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        minChoices: 1,
        optionClasses: ["button-choice"]
    });
    
    const divWrapper = div({
        id: "textureDetails",
        classes: ["card"],
        children: [
            lblTitle,
            textureExt.element,
            workflow.element,
            uvMapping.element,
            maps.element,
        ]
    });

    function getData()
    {
        return {
            format: textureExt.getSelected(),
            workflow: workflow.getSelected(),
            uv: uvMapping.getSelected(),
            maps: maps.getSelected(),
        }
    }

    return {component: divWrapper, getData};
}

function TargetSite()
{
    const lblTitle = label({
        text: "Target Website",
        classes: ["label"]
    });

    const websites = radio({
        id: "websites",
        lblText: "Generate Sheet For",
        choices: [
            "CGTrader",
            "Sketchfab"],
        choiceClasses: ["choices-container"],
        labelClasses: ["label-input"],
        classes: ["option", "add", "select"],
        selectedClasses: ["selected"],
        optionClasses: ["button-choice"]
    });

    const divWrapper = div({
        id: "targetSite",
        classes: ["card"],
        children: [
            lblTitle,
            websites.element
        ]
    });

    function getData()
    {
        return {target: websites.getSelected()}
    }

    return {component: divWrapper, getData}
}

function Datasheet()
{
    const lblTitle = label({
        text: "Datasheet",
        classes: ["label"]});

    const divError = ErrorPanel("submitError");

    const txtSheet = textArea({
        id: "sheet",
        classes: ["text-area"],
        placeholder: "Click the bolt to generate a sheet...\nCopy the generated sheet to your target site...",
    });
    txtSheet.element.readOnly = true;

    const btnGenerate = iconButton({
        icon: generateIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        type: "submit"});
    btnGenerate.formNoValidate = true; //Avoid validating item creation empty fields

    const btnCopy = iconButton({
        icon: copyIcon,
        btnClasses: ["button"],
        iconClasses: ["button-icon"],
        clickFunction: copyToClipboard});

    const divControls = div({
        classes: ["sheet-controls"],
        children: [btnGenerate, btnCopy]
    });

    const divSheet = div({
        id: "datasheet",
        classes: ["option", "add", "data-sheet"],
        children: [
            txtSheet.element,
            divControls
        ]
    });

    const divWrapper = div({
        id: "datasheet",
        classes: ["card"],
        children: [
            lblTitle,
            divError.element,
            divSheet,
        ]
    });

    function showError(errorMsg)
    {
        divError.showError(errorMsg);
    }

    function clearError()
    {
        divError.clearError();
    }

    function writeSheet(sheet)
    {
        txtSheet.element.value = sheet;
    }

    function copyToClipboard()
    {
        if (txtSheet.getContent() === "")
        {
            divError.showError("Sheet is empty, nothing was copied to clipboard")
        }
        else
        {
            navigator.clipboard.writeText(txtSheet.getContent());
            divError.showInfo("Sheet copied to clipboard");
        }
    }

    return {component: divWrapper, showError, clearError, writeSheet}
}

function LogoHeader()
{
    const appLogo = new Image();
    appLogo.src = logo;
    domUtility.addClasses(appLogo, ["logo"]);

    const header1 = document.createElement("h1");
    header1.textContent = "3D Model Datasheet Generator";

    const header2 = document.createElement("h2");
    header2.textContent = "Your datasheet is only a few clicks away";

    return {logo: appLogo, header: header1, slogan: header2};
}