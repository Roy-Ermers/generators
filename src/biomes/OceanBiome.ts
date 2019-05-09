import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class OceanBiome implements Biome {
	Moisture = new Range(1);
	Temperature = new Range(0.25, 1);
	Roughness = 0.2;
	Rarity = 0.4;
	get Name() {
		return "Ocean";
	}

	color = new Color(28, 107, 160, .7);


}