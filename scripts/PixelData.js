export default class PixelData {
    get color() {
        if (!this.overlayColor)
            return this.biome.color;
        else
            return this.overlayColor;
    }
    constructor(biome, height, moisture, temperature, overlay) {
        this.biome = biome;
        this.height = height;
        this.overlayColor = overlay;
        this.moisture = moisture;
        this.temperature = temperature;
    }
    toString() {
        return `Biome: ${this.biome.Name}<br>
		Moisture: ${this.moisture.toFixed(1)}<br>
		Temperature: ${this.temperature.toFixed(1)}<br>
		Rarity: ${this.biome.Rarity}<br>
		Height: ${Math.round(this.height)}`;
    }
}
