import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class OceanBiome {
    constructor() {
        this.Moisture = new Range(1);
        this.Temperature = new Range(0.25, 1);
        this.Roughness = 0.2;
        this.Rarity = 0.4;
        this.color = new Color(28, 107, 160, .7);
    }
    get Name() {
        return "Ocean";
    }
}
