import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class VulcanBiome {
    constructor() {
        this.Moisture = new Range(0, 1);
        this.Temperature = new Range(0.7, 1);
        this.Roughness = 0.01;
        this.Rarity = 0.0001;
        this.color = new Color(207, 16, 32);
    }
    get Name() {
        return "Vulcan";
    }
}
