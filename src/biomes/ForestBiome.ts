import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class ForestBiome implements Biome {
	Moisture = new Range(0.6, 1);
	Temperature = new Range(0.3, 0.6);
	Roughness = 0.3;
	get Name() {
		return "Forest";
	}

	color = new Color(45, 87, 44);
}