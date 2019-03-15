import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class IceOceanBiome {
    constructor() {
        this.Moisture = new Range(0.9, 1);
        this.Temperature = new Range(0, 0.25);
        this.Roughness = 0;
        this.Rarity = 0.1;
        this.color = new Color(150, 175, 185);
    }
    get Name() {
        return "IceOcean";
    }
}
