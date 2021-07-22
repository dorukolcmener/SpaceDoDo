import {
  MeshPhongMaterial,
  SphereGeometry,
  Mesh,
  MeshBasicMaterial,
} from "three";

export default class Planet {
  constructor({
    color = "white",
    dithering = true,
    map = false,
    name = "planet",
    radius = 50,
    res = 50,
    emissive = false,
    sun = false,
  }) {
    this.color = color;
    this.dithering = dithering;
    this.map = map;
    this.name = name;
    this.planetGeometry = new SphereGeometry(radius, res, res);
    this.planetMaterial = !sun
      ? new MeshPhongMaterial({
          color,
          dithering,
          map,
          emissive,
        })
      : new MeshBasicMaterial({
          color,
          dithering,
          map,
          emissive,
        });
    this.planet = new Mesh(this.planetGeometry, this.planetMaterial);
  }
  move({ n, r1, r2, time, relative = null }) {
    let x =
      (relative ? relative.planet.position.x : 0) + r1 * Math.cos(rps(n, time));
    let z =
      (relative ? relative.planet.position.z : 0) + r2 * Math.sin(rps(n, time));
    this.planet.position.set(x, 0, z);
  }
  rotate({ n, time }) {
    this.planet.rotation.y = -rps(n, time);
  }
}

// Round Per Second
function rps(n, totalTime) {
  return 2 * Math.PI * n * totalTime;
}
