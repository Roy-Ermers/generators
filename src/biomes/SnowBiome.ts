import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";


export default class SnowBiome implements Biome {

	Moisture = new Range(0, .5);
	Temperature = new Range(0, 0.25);
	Name: string = "Snow";
	Roughness = 0.1;
	color = new Color(255, 255, 255);
	Rarity = 0.1;

}