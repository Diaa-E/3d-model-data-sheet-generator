"use strict";

import domUtility from "./dom.utility";
import { createModelDetails } from "./components";

const form = document.querySelector("#content");
form.append(createModelDetails());

const datasheetFactory = (modelData) => {

    const model = {

        details : "",
        items : "",
        mesh: {
            meshType: "",
            polyTier : "",
            gameReady: true,
            subdivision: false,
            edgeSplit: "",
            realWorldScale: true,
            polygons: null,
            polygonType: "",
            vertices: null,
        },
        rig: {
            rigged: false,
            rigNotes: "",
        },
        materials: [],
        textures: {
            format: "",
            workflow: "",
            normals: "",
            idMap: false,
            packedRgb: true,
            Uv: "",
            maps: [],
        },
        render: {
            thumb: {
                engine: "",
                software: "",
                version: null,
            },
            preview: {
                engine: "",
                software: "",
                version: null,
            }
        },
        ...modelData
    };
};