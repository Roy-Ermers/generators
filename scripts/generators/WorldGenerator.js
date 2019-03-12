import PolarBiome from "../biomes/PolarBiome.js";
import { PixelData } from "../Generator.js";
import { Noise } from "../Utils.js";
import GrasslandBiome from "../biomes/GrasslandBiome.js";
import OceanBiome from "../biomes/OceanBiome.js";
export default class WorldGenerator {
    Generate(x, y) {
        let moisture = Noise.get(x / 25, y / 25);
        let temperature = Noise.get(x / 25 * 2, y / 25 * 2);
        let value = Noise.get(x, y);
        let biome = this.FindBiome(moisture, temperature, value);
        let height = Noise.get(x / 50 * biome.Roughness, y / 50 * biome.Roughness);
        return new PixelData(biome, height /*,new Color(255*temperature,255*moisture,0)*/);
    }
    FindBiome(moisture, temperature, value) {
        let candidates = [];
        WorldGenerator.Biomes.forEach(biome => {
            if (biome.Moisture.Check(moisture) && biome.Temperature.Check(temperature))
                candidates.push(biome);
        });
        let biome;
        if (candidates.length > 0)
            biome = candidates[candidates.length * value | 0];
        else
            biome = WorldGenerator.VoidBiome;
        return biome;
    }
    get name() {
        return "World Generator";
    }
}
WorldGenerator.Biomes = [
    new PolarBiome(),
    new GrasslandBiome()
];
WorldGenerator.VoidBiome = new OceanBiome();
