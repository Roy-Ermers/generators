import Biome from "./Biome";
import Color from "./Color";
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
	constructor(biome: Biome, height: number, overlay?: Color) {
		this.biome = biome;
		this.height = height;
		this.overlayColor = overlay;
	}
}
