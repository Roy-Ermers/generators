import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";


export default class PolarBiome implements Biome {

	Moisture = new Range(0, 0.5);
	Temperature = new Range(0, 0.16);
	Name: string = "Polar Biome";
	Roughness = 0;
	color = new Color(255, 255, 255);


}