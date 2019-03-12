import Biome from "../Biome.js";
import ForestBiome from "../biomes/ForestBiome.js";
import GrasslandBiome from "../biomes/GrasslandBiome.js";
import IceOceanBiome from "../biomes/IceOcean.js";
import JungleBiome from "../biomes/JungleBiome.js";
import MountainBiome from "../biomes/MountainBiome.js";
import OceanBiome from "../biomes/OceanBiome.js";
import PolarBiome from "../biomes/PolarBiome.js";
import RockDesertBiome from "../biomes/RockDesertBiome.js";
import SandDesertBiome from "../biomes/SandDesertBiome.js";
import VoidBiome from "../biomes/VoidBiome.js";
import IGenerator, { PixelData } from "../Generator.js";
import { Noise } from "../Utils.js";
import Color from "../Color.js";

export default class WorldGenerator implements IGenerator {
	//a large collection of all biomes.
	static Biomes: Biome[] = [
		new ForestBiome(),
		// new IceOceanBiome(),
		new PolarBiome(),
		new GrasslandBiome(),
		new OceanBiome(),
		new RockDesertBiome(),
		new SandDesertBiome(),
		new JungleBiome(),
		new MountainBiome(),
	]

	//use this if there is absolutely no fit.
	static VoidBiome: Biome = new VoidBiome();
	static MoistureNoise = new Noise();
	static TemperatureNoise = new Noise();

	Generate(x: number, y: number): PixelData {
		let noise = new Noise();
		let islandSize = 50;
		let moisture = this.LinearToExpontial(WorldGenerator.MoistureNoise.get(x / islandSize, y / islandSize));
		let temperature = this.LinearToExpontial(WorldGenerator.TemperatureNoise.get(x / islandSize * 2, y / islandSize * 2));
		let value = noise.get(x / islandSize * 0.75, y / islandSize * 0.75);

		let biome = this.FindBiome(moisture, temperature, value);
		let height = noise.get(x / islandSize * biome.Roughness, y / islandSize * biome.Roughness) * 255;
		return new PixelData(biome, height/*,new Color(255*temperature,255*(moisture+temperature),0)*/);
	}

	/**
	 * Find the most suitable biome.
	 * @param moisture the moisture to use
	 * @param temperature the temperature to use
	 * @param value the value (used to determine the biome)
	 */
	FindBiome(moisture: number, temperature: number, value: number) {
		let candidates: Biome[] = [];
		WorldGenerator.Biomes.forEach(biome => {
			if (biome.Moisture.Check(moisture) && biome.Temperature.Check(temperature))
				candidates.push(biome);
		});
		let biome = candidates[candidates.length * value | 0];
		return biome || WorldGenerator.VoidBiome;
	}

	LinearToExpontial(value: number) {
		// keep the value between 0 and 1. if the number is 1.2 then the result of the folowing will be 0.2.
		value = value % 1;

		return (-Math.sin(value * Math.PI + Math.PI / 2) + 1) / 2;
	}

	get name() {
		return "World Generator";
	}
}
