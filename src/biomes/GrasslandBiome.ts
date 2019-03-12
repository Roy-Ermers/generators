import Biome from "../Biome.js";
import { Range } from "../Utils.js";
import Color from "../Color.js";


export default class GrasslandBiome implements Biome {

	Moisture = new Range(0, 0.5);
	Temperature = new Range(0.16, 0.5);
	Name: string = "Grassland";
	Roughness = 0.2;
	color = new Color(25, 232, 25);


}