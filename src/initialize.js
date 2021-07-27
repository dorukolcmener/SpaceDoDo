import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import sunTextureUrl from "url:./assets/map-4818824_1280.jpg";
import earthTextureUrl from "url:./assets/earth-11048_1280.jpg";
import moonTextureUrl from "url:./assets/map-4818828_1280.jpg";
import venusTextureUrl from "url:./assets/map-4818876_1280.jpg";
import marsTextureUrl from "url:./assets/map-4818850_1280.jpg";

const scene = new Scene();
const camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 350);
controls.update();
camera.rotation.set(0, 0, Math.PI / 15);

const textures = {
  sunTextureUrl,
  earthTextureUrl,
  moonTextureUrl,
  venusTextureUrl,
  marsTextureUrl,
};

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

module.exports = { camera, controls, renderer, scene, textures };
