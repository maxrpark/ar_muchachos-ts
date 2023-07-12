import * as THREE from "three";
//@ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//@ts-ignore
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { MindARThree } from "mindar-image-three";
import guiDebugger from "./utils/GUIDebugger.js";
// import { mockWithImage } from "./utils/helperFunctions.js";

const listener = new THREE.AudioListener();
const audio = new THREE.PositionalAudio(listener);

const debugActive = window.location.hash === "#debug";

const loader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

let model: THREE.Mesh | null = null;
let environmentMap: any | null = null;

const AR_BUTTON = document.createElement("button");
AR_BUTTON.textContent = "Start EXPERIENCE";
document.body.appendChild(AR_BUTTON);
AR_BUTTON.style.display = "none";
AR_BUTTON.addEventListener("click", () => start());

rgbeLoader.load("./bg_map.hdr", (eMap: any) => {
  eMap.mapping = THREE.EquirectangularReflectionMapping;
  environmentMap = eMap;
});

loader.load("model/scene.gltf", (gltf: { scene: THREE.Mesh }) => {
  model = gltf.scene;
  AR_BUTTON.style.display = "block";
});

const start = async () => {
  if (!model || !environmentMap) return;
  // mockWithImage("./muchachos.png");
  AR_BUTTON.style.display = "none";
  const mindarThree = new MindARThree({
    container: document.body,
    imageTargetSrc: "./target.mind",
  });

  const { renderer, scene, camera } = mindarThree;

  // create a global audio source
  const sound = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load("./muchachos.mp3", function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
  });

  // RENDERER
  renderer.outputColorSpace;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // SCENE
  scene.environment = environmentMap;

  /// LIGHTS

  // AMBIENT_LIGHT
  const ambienLight = new THREE.AmbientLight("#2630ba", 1.02);

  // DIRECTIONAL_LIGHT
  const directionalLight = new THREE.DirectionalLight("#fffcf0", 4.223);
  directionalLight.position.set(3.038, 3.038, 8.692);

  scene.add(directionalLight, ambienLight);
  // DEBUGER
  if (debugActive)
    guiDebugger({
      ambienLight,
      directionalLight,
      renderer,
    });

  // MODEL INITIAL POSITION AND ANI
  model.scale.set(0, 0, 0);
  model.position.y = 0.5;
  model!.rotation.y = -2.5;

  const anchor = mindarThree.addAnchor(0);
  anchor.group.add(model);

  // AUDIO
  camera.add(listener);
  anchor.group.add(audio);

  audio.setRefDistance(100);

  anchor.onTargetFound = () => {
    sound.offset = 18;
    sound.play();
    //@ts-ignore
    let tl = gsap.timeline({ ease: "none" });
    tl.to(model!.scale, {
      x: 0.002,
      y: 0.002,
      z: 0.002,
      duration: 3,
    }).to(model!.position, { y: -0.3, duration: 2 }, 0);
  };
  anchor.onTargetLost = () => {
    sound.stop();
    model!.scale.set(0, 0, 0);
    model!.position.y = 0.5;
    model!.rotation.y = -3;
  };

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    model!.rotation.y += 0.01;
    renderer.render(scene, camera);
  });
};
