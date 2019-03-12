import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class PolarBiome {
    constructor() {
        this.Moisture = new Range(0, 0.5);
        this.Temperature = new Range(0, 0.16);
        this.Name = "Polar Biome";
        this.Roughness = 0.1;
        this.color = new Color(255, 255, 255);
    }
}
