import { Range } from "../Utils.js";
import Color from "../Color.js";
export default class TundraBiome {
    constructor() {
        this.Moisture = new Range(0, .4);
        this.Temperature = new Range(0, 0.2);
        this.Name = "Tundra";
        this.Roughness = 0.1;
        this.Rarity = 0.2;
        this.color = new Color(214, 122, 29);
    }
}
