import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class VoidBiome implements Biome {
	Moisture = new Range(0, 0);
	Temperature = new Range(0, 0);
	Roughness = 0;
	Rarity = 0;
	get Name() {
		return "Void";
	}

	color = new Color(255, 0, 255);


}