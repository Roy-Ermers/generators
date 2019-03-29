import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class SandDesertBiome {
    constructor() {
        this.Moisture = new Range(0, 0.4);
        this.Temperature = new Range(0.6, 1);
        this.Roughness = 0.4;
        this.Rarity = 0.4;
        this.color = new Color(210, 170, 109);
    }
    get Name() {
        return "Sand Desert";
    }
}
