import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";


export default class GrasslandBiome implements Biome {
	Moisture = new Range(0.1, 0.8);
	Temperature = new Range(0.3, 0.8);
	Name: string = "Grassland";
	Roughness = 0.2;
	Rarity = 0.8;
	color = new Color(85, 174, 0);
}