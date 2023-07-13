import * as THREE from "three";
var guiDebugger = function (_a) {
    var ambienLight = _a.ambienLight, directionalLight = _a.directionalLight, renderer = _a.renderer;
    var GUI = lil.GUI;
    var gui = new GUI();
    var RENDERER = gui.addFolder("Renderer");
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
    var GUI_AMBIENT_LIGHT = gui.addFolder("Ambient Light");
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
    var GUI_DIRECTIONAL_LIGHT = gui.addFolder("Directional Light");
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