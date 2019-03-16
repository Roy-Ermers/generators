import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class BeachBiome {
    constructor() {
        this.Moisture = new Range(0.7, 1);
        this.Temperature = new Range(0.4, 1);
        this.Name = "Beach";
        this.Roughness = 0;
        this.Rarity = 0.2;
        this.color = new Color(255, 238, 173);
    }
}
