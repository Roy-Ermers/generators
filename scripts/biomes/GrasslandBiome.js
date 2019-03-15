import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class GrasslandBiome {
    constructor() {
        this.Moisture = new Range(0.1, 0.8);
        this.Temperature = new Range(0.3, 0.8);
        this.Name = "Grassland";
        this.Roughness = 0.2;
        this.Rarity = 0.8;
        this.color = new Color(85, 174, 0);
    }
}
