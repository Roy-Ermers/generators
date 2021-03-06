import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class ForestBiome {
    constructor() {
        this.Moisture = new Range(0.1, 0.9);
        this.Temperature = new Range(0.4, 0.7);
        this.Roughness = 0.3;
        this.Rarity = 0.8;
        this.Name = "Forest";
        this.color = new Color(34, 139, 34);
    }
}
