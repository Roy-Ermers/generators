import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class IceOceanBiome implements Biome {
	Moisture = new Range(0, 1);
	Temperature = new Range(0, 0.5);
	Roughness = 0;
	get Name() {
		return "IceOcean";
	}

	color = new Color(50, 75, 85);


}