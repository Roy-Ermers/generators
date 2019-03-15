import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class JungleBiome {
    constructor() {
        this.Moisture = new Range(0.7, 1);
        this.Temperature = new Range(0.7, 1);
        this.Roughness = 0.5;
        this.Rarity = .2;
        this.color = new Color(41, 171, 135);
    }
    get Name() {
        return "Jungle";
    }
}
