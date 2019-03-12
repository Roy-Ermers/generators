import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class IceOceanBiome {
    constructor() {
        this.Moisture = new Range(0, 1);
        this.Temperature = new Range(0, 0.5);
        this.Roughness = 0;
        this.color = new Color(50, 75, 85);
    }
    get Name() {
        return "IceOcean";
    }
}
