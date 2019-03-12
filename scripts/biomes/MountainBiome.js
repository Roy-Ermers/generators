import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class MountainBiome {
    constructor() {
        this.Moisture = new Range(0, .5);
        this.Temperature = new Range(0.5, 1);
        this.Roughness = 1;
        this.color = new Color(36, 40, 41);
    }
    get Name() {
        return "IceOcean";
    }
}
