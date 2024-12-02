"use strict";

import ErrorPopup from "./components/ErrorPopup";
import MainForm from "./components/mainForm/MainForm";

export default function App()
{

    const mainForm = MainForm();
    const errorPopup = ErrorPopup();
           
    return [ mainForm.element, errorPopup.element ];
}

// export function App()
// {
//     const logoHeader = LogoHeader();
//     const modelDetails = ModelDetails();
//     const modelContents = ModelContents();
//     const meshDetails = MeshDetails();
//     const polyCount = PolyCount();
//     const materials = Materials();
//     const textureDetails = TextureDetails();
//     const targetSite = TargetSite();
//     const dataSheet = Datasheet();

//     function start()
//     {
//         const form = document.querySelector("#content");
//         document.body.insertBefore(logoHeader.logo, form);
//         document.body.insertBefore(logoHeader.header, form);
//         document.body.insertBefore(logoHeader.slogan, form);
//         form.append(
//             modelDetails.component,
//             modelContents.component,
//             meshDetails.component,
//             polyCount.component,
//             materials.component,
//             textureDetails.component,
//             targetSite.component,
//             dataSheet.component,
//         );

//         //using a submit event to have access to
//         //components without having to pass anything to button events
//         form.addEventListener("submit", (e) => {

//             e.preventDefault();

//             let modelData;
//             if (validateForm())
//             {
//                 modelData = ModelData();
//                 generateSheet(SpecialCharacters(), ModelData());
//             }
//             else
//             {
//                 return
//             }
//         });
//     }

//     function generateSheet(chars, data)
//     {
//         let sheet = "";
//         const SEPERATOR = ", ";

//         //model Details
//         sheet += `${chars.boldOpen}${data.details}${chars.boldClose}\n`;

//         //Model Contents
//         sheet += `\n${chars.boldOpen}Model Contents:${chars.boldClose}\n\n`;
//         data.items.forEach(item => {
//             sheet += `${chars.list}${item}\n`;
//         });

//         //Mesh
//         sheet += `\n${chars.boldOpen}Mesh:${chars.boldClose}\n\n`;
//         sheet += `${chars.list}Mesh Type: ${data.mesh.meshType}\n`;
//         sheet += `${chars.list}Tier: ${data.mesh.polyTier}\n`;
//         sheet += `${chars.list}Model is Game-ready: ${data.mesh.gameReady}\n`;
//         sheet += `${chars.list}Model is Subdivision-ready: ${data.mesh.subdivision}\n`;
//         sheet += `${chars.list}Edge Split: ${data.mesh.edgeSplit}\n`;
//         sheet += `${chars.list}Model is Scaled to Real World Scale: ${data.mesh.realWorldScale}\n`;
//         sheet += `${chars.list}Model is Rigged: ${data.mesh.rigged}\n`;

//         //Polycount
//         sheet += `\n${chars.boldOpen}PolyCount:${chars.boldClose}\n\n`;
//         sheet += `${chars.list}Triangles: ${data.polyCount.tris}\n`;
//         sheet += `${chars.list}Vertices: ${data.polyCount.verts}\n`;

//         //Materials
//         sheet += `\n${chars.boldOpen}Materials:${chars.boldClose}\n\n`;
//         data.materials.forEach(material => {
//             sheet += `${chars.list}${material}\n`;
//         });

//         //Textures
//         sheet += `\n${chars.boldOpen}Textures:${chars.boldClose}\n\n`;
//         sheet += `${chars.list}Texture File Format(s): ${data.textures.format.join(SEPERATOR)}\n`;
//         sheet += `${chars.list}Texture Workflow(s): ${data.textures.workflow.join(SEPERATOR)}\n`;
//         sheet += `${chars.list}UV Mapping: ${data.textures.uv.join(SEPERATOR)}\n`;

//         //Maps
//         sheet += `\n${chars.boldOpen}Texture Maps:${chars.boldClose}\n\n`;
//         data.textures.maps.forEach(map => {
//             sheet += `${chars.list}${map}\n`;
//         })

//         dataSheet.writeSheet(sheet);
//     }

//     function SpecialCharacters()
//     {
//         const specialChars = {
//             boldOpen: "",
//             boldClose: "",
//             italicOpen: "",
//             italicClose: "",
//             list: "", 
//         }
//         switch (targetSite.getData().target)
//         {
//             case "Sketchfab": 
//                 specialChars.boldOpen = "**";
//                 specialChars.boldClose = "**";
//                 specialChars.list = "* ";
//                 specialChars.italicOpen = "*";
//                 specialChars.italicClose = "*";
//                 break;
//             case "CGTrader":
//                 specialChars.boldOpen = "**";
//                 specialChars.boldClose = "**";
//                 specialChars.list = "- ";
//                 specialChars.italicOpen = "_";
//                 specialChars.italicClose = "_";
//                 break;
//         }

//         return specialChars;
//     }

//     function validateForm()
//     {
//         const SUBMIT_ERROR = "There is an error at:";

//         if (!modelContents.getData().items.length > 0)
//         {
//             modelContents.showError("A model must include at least 1 item")
//             dataSheet.showError(`${SUBMIT_ERROR} model contents`)
//         }
//         else if (polyCount.getData().tris === "" || polyCount.getData().verts === "")
//         {
//             polyCount.showError("Any model must have a polygon and vertex count");
//             dataSheet.showError(`${SUBMIT_ERROR} polycount`)
//         }
//         else
//         {
//             modelContents.clearError();
//             polyCount.clearError();
//             dataSheet.clearError();
            
//             return true
//         }

//         return false
//     }

//     function ModelData()
//     {
//         //reduce multiple getData() calls to a single one
//         const sectionDetails = modelDetails.getData();
//         const sectionItems = modelContents.getData();
//         const sectionMesh = meshDetails.getData();
//         const sectionPolyCount = polyCount.getData();
//         const sectionMaterials = materials.getData();
//         const sectionTextures = textureDetails.getData();

//         const NOT_AVAILABLE = "N/A";

//         const model = {

//             details : sectionDetails.details,
//             items : sectionItems.items,
//             mesh: {
//                 meshType: sectionMesh.meshType,
//                 polyTier : sectionMesh.polyTier,
//                 gameReady: sectionMesh.gameReady,
//                 subdivision: sectionMesh.subdivision,
//                 edgeSplit: sectionMesh.edgeSplit,
//                 realWorldScale: sectionMesh.realWorldScale,
//                 rigged: sectionMesh.rigged,
//             },
//             polyCount: {
//                 tris: sectionPolyCount.tris,
//                 verts: sectionPolyCount.verts,
//             },
//             materials: sectionMaterials.materials.length > 0 ? sectionMaterials.materials : [NOT_AVAILABLE],
//             textures: {
//                 format: sectionMaterials.materials.length > 0 ? sectionTextures.format : [NOT_AVAILABLE],
//                 workflow: sectionMaterials.materials.length > 0 ? sectionTextures.workflow : [NOT_AVAILABLE],
//                 uv: sectionTextures.uv.length > 0 ? sectionTextures.uv : [NOT_AVAILABLE],
//                 maps: sectionMaterials.materials.length > 0 ? sectionTextures.maps : [NOT_AVAILABLE],
//             },
//         };

//         return model;
//     }

//     return {start}
// }