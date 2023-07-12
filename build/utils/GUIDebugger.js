import * as THREE from "three";
import GUI from "../../node_modules/lil-gui/dist/lil-gui.esm.js";
const guiDebugger = ({ ambienLight, directionalLight, renderer }) => {
    const gui = new GUI();
    const RENDERER = gui.addFolder("Renderer");
    RENDERER.add(renderer, "toneMappingExposure")
        .name("toneMappingExposure")
        .min(0)
        .max(4)
        .step(0.001);
    RENDERER.add(renderer, "toneMapping", {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping,
    });
    const GUI_AMBIENT_LIGHT = gui.addFolder("Ambient Light");
    GUI_AMBIENT_LIGHT.add(ambienLight, "intensity")
        .name("intensity")
        .min(0)
        .max(10)
        .step(0.001);
    GUI_AMBIENT_LIGHT.addColor(ambienLight, "color")
        .name("color")
        .min(0)
        .max(10)
        .step(0.001);
    const GUI_DIRECTIONAL_LIGHT = gui.addFolder("Directional Light");
    GUI_DIRECTIONAL_LIGHT.add(directionalLight, "intensity")
        .name("intensity")
        .min(0)
        .max(10)
        .step(0.001);
    GUI_DIRECTIONAL_LIGHT.add(directionalLight.position, "x")
        .name("x")
        .min(0)
        .max(20)
        .step(0.001);
    GUI_DIRECTIONAL_LIGHT.add(directionalLight.position, "y")
        .name("y")
        .min(0)
        .max(20)
        .step(0.001);
    GUI_DIRECTIONAL_LIGHT.add(directionalLight.position, "z")
        .name("z")
        .min(0)
        .max(20)
        .step(0.001);
    GUI_DIRECTIONAL_LIGHT.addColor(directionalLight, "color")
        .name("color")
        .min(0)
        .max(10)
        .step(0.001);
};
export default guiDebugger;
//# sourceMappingURL=GUIDebugger.js.map