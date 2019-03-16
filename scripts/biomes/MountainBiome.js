import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class MountainBiome {
    constructor() {
        this.Moisture = new Range(0, .3);
        this.Temperature = new Range(0, 0.5);
        this.Roughness = 1;
        this.Rarity = 0.4;
        this.color = new Color(134, 126, 112);
    }
    get Name() {
        return "Mountain";
    }
}
