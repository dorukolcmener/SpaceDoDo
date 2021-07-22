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

// Animation Constants
let ts = new Clock(true);
let slowMo = 1;
const earthRps = 1;
const earthR1 = 150;
const moonR1 = 15;

function animate() {
  let totalTime = ts.getElapsedTime();
  totalTime *= slowMo;

  earth.rotate({ n: earthRps, time: totalTime });
  earth.move({
    n: earthRps / 365,
    r1: earthR1,
    r2: earthR1 * 1.5,
    time: totalTime,
  });

  moon.move({
    n: earthRps / 30,
    r1: moonR1,
    r2: moonR1 * 1,
    relative: earth,
    time: totalTime,
  });

  sun.rotate({ n: earthRps / 150, time: totalTime });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
