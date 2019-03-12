import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class VoidBiome {
    constructor() {
        this.Moisture = new Range(0, 0);
        this.Temperature = new Range(0, 0);
        this.Roughness = 0;
        this.color = new Color(20, 0, 20);
    }
    get Name() {
        return "Void";
    }
}
