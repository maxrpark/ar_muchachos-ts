var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { MindARThree } from "mindar-image-three";
import guiDebugger from "./utils/GUIDebugger.js";
const listener = new THREE.AudioListener();
const audio = new THREE.PositionalAudio(listener);
const debugActive = window.location.hash === "#debug";
const loader = new GLTFLoader();
const rgbeLoader = new RGBELoader();
let model = null;
let environmentMap = null;
const AR_BUTTON = document.createElement("button");
AR_BUTTON.textContent = "Start EXPERIENCE";
document.body.appendChild(AR_BUTTON);
AR_BUTTON.style.display = "none";
AR_BUTTON.addEventListener("click", () => start());
rgbeLoader.load("./bg_map_2.hdr", (eMap) => {
    eMap.mapping = THREE.EquirectangularReflectionMapping;
    environmentMap = eMap;
});
loader.load("model/scene.gltf", (gltf) => {
    model = gltf.scene;
    AR_BUTTON.style.display = "block";
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!model || !environmentMap)
        return;
    AR_BUTTON.style.display = "none";
    const mindarThree = new MindARThree({
        container: document.body,
        imageTargetSrc: "./target.mind",
    });
    const { renderer, scene, camera } = mindarThree;
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("./muchachos.mp3", function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
    });
    renderer.outputColorSpace;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene.environment = environmentMap;
    const ambienLight = new THREE.AmbientLight("#2630ba", 1.02);
    const directionalLight = new THREE.DirectionalLight("#fffcf0", 4.223);
    directionalLight.position.set(3.038, 3.038, 8.692);
    scene.add(directionalLight, ambienLight);
    if (debugActive)
        guiDebugger({
            ambienLight,
            directionalLight,
            renderer,
        });
    model.scale.set(0, 0, 0);
    model.position.y = 0.5;
    model.rotation.y = -2.5;
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(model);
    camera.add(listener);
    anchor.group.add(audio);
    audio.setRefDistance(100);
    anchor.onTargetFound = () => {
        sound.offset = 18;
        sound.play();
        let tl = gsap.timeline({ ease: "none" });
        tl.to(model.scale, {
            x: 0.002,
            y: 0.002,
            z: 0.002,
            duration: 3,
        }).to(model.position, { y: -0.3, duration: 2 }, 0);
    };
    anchor.onTargetLost = () => {
        sound.stop();
        model.scale.set(0, 0, 0);
        model.position.y = 0.5;
        model.rotation.y = -3;
    };
    yield mindarThree.start();
    renderer.setAnimationLoop(() => {
        model.rotation.y += 0.01;
        renderer.render(scene, camera);
    });
});
//# sourceMappingURL=main.js.map