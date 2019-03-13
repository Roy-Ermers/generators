import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class ForestBiome {
    constructor() {
        this.Moisture = new Range(0.3, 1);
        this.Temperature = new Range(0.3, 0.7);
        this.Roughness = 0.3;
        this.Rarity = 0.8;
        this.color = new Color(45, 87, 44);
    }
    get Name() {
        return "Forest";
    }
}
