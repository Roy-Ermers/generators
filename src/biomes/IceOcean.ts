import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class IceOceanBiome implements Biome {
	Moisture = new Range(1);
	Temperature = new Range(0, 0.25);
	Roughness = 0;
	Rarity = 0.3;
	get Name() {
		return "Ice ocean";
	}

	color = new Color(150, 175, 185, .8);


}