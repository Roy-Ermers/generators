import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";


export default class BeachBiome implements Biome {

	Moisture = new Range(0.7, 1);
	Temperature = new Range(0.4, 1);
	Name: string = "Beach";
	Roughness = 0;
	Rarity = 0.2;
	color = new Color(255, 238, 173);


}