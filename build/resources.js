import { Loader } from "./utils/resourcesLoader.js";
export const sources = [
    {
        type: Loader.GLTF_LOADER,
        path: "./model/scene.gltf",
        name: "model",
    },
    { type: Loader.RGBE_LOADER, name: "environmentMap", path: "./bg_map_2.hdr" },
];
//# sourceMappingURL=resources.js.map