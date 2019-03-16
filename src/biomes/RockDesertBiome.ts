import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class RockDesertBiome implements Biome {
	Moisture = new Range(0, 0.3);
	Temperature = new Range(0.4, 1);
	Roughness = 0.5;
	Rarity = 0.1;
	get Name() {
		return "Rock Desert";
	}

	color = new Color(156, 160, 161);


}