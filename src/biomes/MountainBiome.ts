import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class MountainBiome implements Biome {
	Moisture = new Range(0, .5);
	Temperature = new Range(0.5, 1);
	Roughness = 1;
	Rarity = 0.4;
	get Name() {
		return "Mountain";
	}

	color = new Color(134, 126, 112);


}