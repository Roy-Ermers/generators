import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class VulcanBiome implements Biome {
	Moisture = new Range(0, 1);
	Temperature = new Range(0.7, 1);
	Roughness = 0.01;
	Rarity = 0.0001;
	get Name() {
		return "Vulcano";
	}

	color = new Color(207, 16, 32);
}