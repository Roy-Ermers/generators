import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class SandDesertBiome implements Biome {
	Moisture = new Range(0, 0.4);
	Temperature = new Range(0.6, 1);
	Roughness = 0.4;
	Rarity = 0.4;
	get Name() {
		return "Sand Desert";
	}

	color = new Color(210, 170, 109);
}