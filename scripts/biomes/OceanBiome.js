import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class OceanBiome {
    constructor() {
        this.Moisture = new Range(0, 1);
        this.Temperature = new Range(0, 0.5);
        this.Roughness = 0;
        this.Rarity = 0.01;
        this.color = new Color(0, 65, 75);
    }
    get Name() {
        return "Ocean";
    }
}
