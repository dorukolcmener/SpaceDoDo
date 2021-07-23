import { camera, renderer, scene } from "./initialize";
import { PointLight, TextureLoader, Clock, HemisphereLight } from "three";
import SpaceObject from "./components/SpaceObject";

const sun = new SpaceObject({
  radius: 30,
  map: new TextureLoader().load("./assets/map-4818824_1280.jpg"),
  sun: true,
});
scene.add(sun.planet);

const earth = new SpaceObject({
  radius: 5,
  map: new TextureLoader().load("./assets/earth-11048_1280.jpg"),
});
scene.add(earth.planet);

const moon = new SpaceObject({
  radius: 1,
  map: new TextureLoader().load("./assets/map-4818828_1280.jpg"),
});
scene.add(moon.planet);

const venus = new SpaceObject({
  radius: 4,
  map: new TextureLoader().load("./assets/map-4818876_1280.jpg"),
});
scene.add(venus.planet);

const mercury = new SpaceObject({
  radius: 1,
  color: "#61200e",
});
scene.add(mercury.planet);

const mars = new SpaceObject({
  radius: 3,
  color: "#BC2732",
  map: new TextureLoader().load("./assets/map-4818850_1280.jpg"),
});
scene.add(mars.planet);

const pLight = new PointLight("#fdfbd3", 2, 1000);
scene.add(pLight);

const hLight = new HemisphereLight(null, null, 0.15);
scene.add(hLight);

// Animation Constants
let ts = new Clock(true);
let slowMo = 1;
const earthRps = 1;
const earthR1 = 150;
const moonR1 = 15;

function animate() {
  let totalTime = ts.getElapsedTime() + 50;
  totalTime *= slowMo;

  sun.rotate({ n: earthRps / 150, time: totalTime });

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

  venus.move({
    n: earthRps / 250,
    r1: earthR1 * 0.75,
    r2: earthR1 * 0.75 * 1.5,
    time: totalTime + 60,
  });
  venus.rotate({ n: -earthRps / 243, time: totalTime });

  mercury.move({
    n: earthRps / 125,
    r1: earthR1 * 0.5,
    r2: earthR1 * 0.5 * 1.5,
    time: totalTime + 60,
  });

  mars.move({
    n: earthRps / 400,
    r1: earthR1 * 1.2,
    r2: earthR1 * 1.2 * 1.5,
    time: totalTime + 60,
  });
  mars.rotate({ n: (earthRps * 24.6) / 24, time: totalTime });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
