import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";


export default class TundraBiome implements Biome {

	Moisture = new Range(0, .4);
	Temperature = new Range(0, 0.4);
	Name: string = "Tundra";
	Roughness = 0.1;
	Rarity = 0.5;
	color = new Color(214, 122, 29);
}