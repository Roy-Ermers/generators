export class PixelData {
    get color() {
        if (!this.overlayColor)
            return this.biome.color;
        else
            return this.biome.color.difference(this.overlayColor);
    }
    constructor(biome, height, overlay) {
        this.biome = biome;
        this.height = height;
        this.overlayColor = overlay;
    }
}
