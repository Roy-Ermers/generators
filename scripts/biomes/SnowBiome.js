import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class SnowBiome {
    constructor() {
        this.Moisture = new Range(0, .5);
        this.Temperature = new Range(0, 0.25);
        this.Name = "Snow";
        this.Roughness = 0.1;
        this.color = new Color(255, 255, 255);
        this.Rarity = 0.1;
    }
}
