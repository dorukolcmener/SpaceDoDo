import { camera, renderer, scene } from "./initialize";
import { PointLight, TextureLoader, Clock } from "three";
import Planet from "./components/Planet";

const earth = new Planet({
  radius: 5,
  map: new TextureLoader().load("./assets/earth-11048_1280.jpg"),
});
scene.add(earth.planet);

const moon = new Planet({
  radius: 1,
  map: new TextureLoader().load("./assets/map-4818828_1280.jpg"),
});
scene.add(moon.planet);

const sun = new Planet({
  radius: 30,
  map: new TextureLoader().load("./assets/map-4818824_1280.jpg"),
  sun: true,
});
sun.planet.position.set(0, 0, 0);
scene.add(sun.planet);

const light = new PointLight("#fdfbd3", 2, 1000);
light.position.set(0, 0, 0);
scene.add(light);

camera.rotation.z = Math.PI / 15;

let ts = new Clock(true);
let slowMo = 0.1;
function animate() {
  let totalTime = ts.getElapsedTime();
  totalTime *= slowMo;
  //Rotate Earth
  earth.planet.rotation.y = -totalTime * 15;
  //Move Earth
  let earthR1 = 150;
  let earthR2 = earthR1 * 1.5;
  earth.planet.position.set(
    earthR1 * Math.cos(totalTime),
    0,
    earthR2 * Math.sin(totalTime)
  );
  //Move Moon
  let moonR1 = 15;
  let moonR2 = moonR1 * 1.5;
  moon.planet.position.set(
    earth.planet.position.x + moonR1 * Math.cos(totalTime * 5),
    0,
    earth.planet.position.z + moonR2 * Math.sin(totalTime * 5)
  );
  //Rotate Sun
  sun.planet.rotation.y = -totalTime;
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
