import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class OceanBiome implements Biome {
	Moisture = new Range(0.5, 1);
	Temperature = new Range(0, 0.75);
	Roughness = 0;
	Rarity = 0.01;
	get Name() {
		return "Ocean";
	}

	color = new Color(28, 107, 160);


}