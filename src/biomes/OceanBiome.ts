import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";

export default class OceanBiome implements Biome {
	Moisture = new Range(0,0);	
	Temperature = new Range(0.5,0);
	Roughness = 0;
	get Name() {
		return "Ocean";
	}

	color = new Color(10, 20, 200);


}