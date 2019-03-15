import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class ForestBiome {
    constructor() {
        this.Moisture = new Range(0.3, 0.9);
        this.Temperature = new Range(0.2, 0.7);
        this.Roughness = 0.3;
        this.Rarity = 0.9;
        this.color = new Color(34, 139, 34);
    }
    get Name() {
        return "Forest";
    }
}
