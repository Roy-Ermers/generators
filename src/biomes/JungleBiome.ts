import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class JungleBiome implements Biome {
	Moisture = new Range(0.75, 1);
	Temperature = new Range(0.75, 1);
	Roughness = 0.5;
	Rarity = .6;
	get Name() {
		return "Jungle";
	}

	color = new Color(59, 122, 87);
}