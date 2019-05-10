import Biome from "./Biome";
import Color from "./Color";
import { WorldSettings } from "./generators/WorldGenerator.js";
export default class PixelData {
	public biome: Biome;
	public get color() {
		if (!this.overlayColor)
			return this.biome.color;
		else
			return this.overlayColor;
	}
	public overlayColor?: Color;
	public height: number;

	public moisture: number;
	public temperature: number;
	public Ocean: boolean = false;
	constructor(biome: Biome, height: number, moisture: number, temperature: number, overlay?: Color, Ocean?: boolean) {
		this.biome = biome;
		this.height = height;
		this.overlayColor = overlay;
		this.moisture = moisture;
		this.temperature = temperature;
		if (Ocean) {
			this.Ocean = Ocean;
			height = WorldSettings.SeaLevel;
		}
	}

	toString() {
		return `Biome: ${this.biome.Name}<br>
		Moisture: ${this.moisture.toFixed(1)}<br>
		Temperature: ${this.temperature.toFixed(1)}<br>
		Rarity: ${this.biome.Rarity}<br>
		Height: ${Math.round(this.height)}<br>
		Ocean: ${this.Ocean}`;
	}
}
