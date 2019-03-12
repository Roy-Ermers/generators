import Color from "./Color.js";
import {Range } from "./Utils.js";
export default interface Biome {
	Moisture: Range;
	Temperature: Range;
	Roughness: number;
	color: Color;
	Name: string;
}