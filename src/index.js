"use strict";

import { startApp } from "./components";

startApp();

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
            rigged: false,
        },
        polyCount: {
            tris: null,
            verts: null
        },
        materials: [],
        textures: {
            format: [],
            workflow: "",
            normals: "",
            Uv: "",
            maps: [],
        },
        ...modelData
    };
};