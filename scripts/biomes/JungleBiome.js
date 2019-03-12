import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class JungleBiome {
    constructor() {
        this.Moisture = new Range(0.75, 1);
        this.Temperature = new Range(0.75, 1);
        this.Roughness = 0.5;
        this.color = new Color(59, 122, 87);
    }
    get Name() {
        return "Jungle";
    }
}
