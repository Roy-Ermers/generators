import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class RockDesertBiome implements Biome {
	Moisture = new Range(0, 0.3);
	Temperature = new Range(0.4, 1);
	Roughness = 0.5;
	get Name() {
		return "Rock Desert";
	}

	color = new Color(136, 140, 141);


}