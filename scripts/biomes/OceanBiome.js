import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class OceanBiome {
    constructor() {
        this.Moisture = new Range(0, 0);
        this.Temperature = new Range(0.5, 0);
        this.Roughness = 0;
        this.color = new Color(10, 20, 200);
    }
    get Name() {
        return "Ocean";
    }
}
