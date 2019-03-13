import Color from "./Color.js";
import { Range } from "./Utils.js";
export default interface Biome {
	/**
	 * in which moistures can this biome appear.
	 */
	Moisture: Range;
	/**
	 *  in what temperature can this biome be found.
	 */
	Temperature: Range;

	/**
	 * How rough is the biome?
	 */
	Roughness: number;

	/**
	 * the higher the number the more the biome will occur.
	 */
	Rarity: number;

	/**
	 * The color to use.
	 */
	color: Color;

	/**
	 * The name of the biome
	 */
	Name: string;
}