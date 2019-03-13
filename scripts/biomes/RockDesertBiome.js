import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class RockDesertBiome {
    constructor() {
        this.Moisture = new Range(0, 0.3);
        this.Temperature = new Range(0.4, 1);
        this.Roughness = 0.5;
        this.Rarity = 0.1;
        this.color = new Color(136, 140, 141);
    }
    get Name() {
        return "Rock Desert";
    }
}
