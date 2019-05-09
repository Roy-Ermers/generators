import { WorldSettings } from "./generators/WorldGenerator.js";
export default class PixelData {
    constructor(biome, height, moisture, temperature, overlay, Ocean) {
        this.Ocean = false;
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
    get color() {
        if (!this.overlayColor)
            return this.biome.color;
        else
            return this.overlayColor;
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
