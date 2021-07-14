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
}
