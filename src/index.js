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
        },
        polyCount: {
            tris: null,
            verts: null
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