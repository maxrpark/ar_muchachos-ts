import { Loader } from "./utils/resourcesLoader.js";

export const sources = [
  {
    type: Loader.GLTF_LOADER,
    path: "../assets/models/wordCup/scene.gltf",
    name: "model",
  },
  {
    type: Loader.RGBE_LOADER,
    name: "environmentMap",
    path: "../assets/bg_map_2.hdr",
  },
];
