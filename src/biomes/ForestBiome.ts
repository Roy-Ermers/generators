import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class ForestBiome implements Biome {
	Moisture = new Range(0.1, 0.9);
	Temperature = new Range(0.2, 0.7);

	Roughness = 0.3;
	Rarity = 0.8;
	Name = "Forest";
	color = new Color(34, 139, 34);
}