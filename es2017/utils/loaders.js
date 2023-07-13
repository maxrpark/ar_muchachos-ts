import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
var loader = new GLTFLoader();
var rgbeLoader = new RGBELoader();
export var model = null;
export var environmentMap = null;
rgbeLoader.load("./bg_map_2.hdr", function (eMap) {
    eMap.mapping = THREE.EquirectangularReflectionMapping;
    environmentMap = eMap;
});
loader.load("model/scene.gltf", function (gltf) {
    model = gltf.scene;
});
export var LoadAssets = new Promise(function (resolve) {
    var max = "hello";
    return max;
});
//# sourceMappingURL=loaders.js.map