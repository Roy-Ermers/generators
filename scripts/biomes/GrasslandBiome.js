import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class GrasslandBiome {
    constructor() {
        this.Moisture = new Range(0, 0.5);
        this.Temperature = new Range(0.16, 0.5);
        this.Name = "Grassland";
        this.Roughness = 0.2;
        this.color = new Color(25, 232, 25);
    }
}
