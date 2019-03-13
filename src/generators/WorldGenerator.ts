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
import IGenerator from "../Generator.js";
import PixelData from "../PixelData.js";
import { Noise } from "../Utils.js";
import Color from "../Color.js";
import VulcanBiome from "../biomes/VulcanBiome.js";

export default class WorldGenerator implements IGenerator {
	//a large collection of all biomes.
	static Biomes: Biome[] = [
		new ForestBiome(),
		// new IceOceanBiome(),
		// new PolarBiome(),
		new GrasslandBiome(),
		new OceanBiome(),
		new RockDesertBiome(),
		new SandDesertBiome(),
		new JungleBiome(),
		new MountainBiome(),
		new VulcanBiome()
	]

	//use this if there is absolutely no fit.
	static VoidBiome: Biome = new VoidBiome();

	static MoistureNoise = new Noise();
	static TemperatureNoise = new Noise();
	static noise = new Noise();

	Generate(x: number, y: number): PixelData {
		let islandSize = 1;
		let moisture = this.LinearToExpontial(WorldGenerator.MoistureNoise.get(x / islandSize / 5, y / islandSize / 5));
		let temperature = this.LinearToExpontial(WorldGenerator.TemperatureNoise.get(x / islandSize / 10, y / islandSize / 10));

		let biome = this.FindBiome(moisture, temperature, WorldGenerator.noise.get(x / islandSize / 100, y / islandSize / 100));
		let height = WorldGenerator.noise.get(x / islandSize * biome.Roughness, y / islandSize * biome.Roughness) * 255;
		return new PixelData(biome, height/*, new Color(128 * temperature, 128 * moisture, 0)*/);
	}
	Refresh() {
		WorldGenerator.MoistureNoise.Seed(Math.random());
		WorldGenerator.TemperatureNoise.Seed(Math.random());
		WorldGenerator.noise.Seed(Math.random());
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
			if (biome.Moisture.Check(moisture) && biome.Temperature.Check(temperature)) {
				candidates.push(biome);
			}
		});

		candidates = candidates.sort((a, b) => 1 - a.Rarity - b.Rarity);
		let biome = candidates[candidates.length * this.LinearToExpontial(value) | 0];
		return biome || WorldGenerator.VoidBiome;
	}

	LinearToExpontial(value: number) {
		// keep the value between 0 and 1. if the number is 1.2 then the result of the folowing will be 0.2.
		value = value % 1;

		return value ** 3;
	}

	get name() {
		return "World Generator";
	}
}
