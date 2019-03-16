import Biome from "../Biome.js";
import BeachBiome from "../biomes/BeachBiome.js";
import ForestBiome from "../biomes/ForestBiome.js";
import GrasslandBiome from "../biomes/GrasslandBiome.js";
import IceOceanBiome from "../biomes/IceOcean.js";
import JungleBiome from "../biomes/JungleBiome.js";
import MountainBiome from "../biomes/MountainBiome.js";
import OceanBiome from "../biomes/OceanBiome.js";
import RockDesertBiome from "../biomes/RockDesertBiome.js";
import SandDesertBiome from "../biomes/SandDesertBiome.js";
import SnowBiome from "../biomes/SnowBiome.js";
import TundraBiome from "../biomes/TundraBiome.js";
import VoidBiome from "../biomes/VoidBiome.js";
import IGenerator from "../Generator.js";
import PixelData from "../PixelData.js";
import { Noise } from "../Utils.js";
import Color from "../Color.js";

export default class WorldGenerator implements IGenerator {
	//a large collection of all biomes.
	static Biomes: Biome[] = [
		new ForestBiome(),
		new IceOceanBiome(),
		new SnowBiome(),
		new GrasslandBiome(),
		new OceanBiome(),
		new RockDesertBiome(),
		new SandDesertBiome(),
		new JungleBiome(),
		new MountainBiome(),
		// new VulcanBiome(),
		new TundraBiome(),
		new BeachBiome()
	]

	//use this if there is absolutely no fit.
	static VoidBiome: Biome = new OceanBiome();


	//use multiple noisemaps
	static MoistureNoise = new Noise();
	static TemperatureNoise = new Noise();
	static noise = new Noise();

	constructor() {
		//@ts-ignore
		window.PickCandidates = this.PickCandidates;
	}
	Generate(x: number, y: number): PixelData {
		let islandSize = 1;

		x = x / islandSize;
		y = y / islandSize;
		let moisture = (WorldGenerator.MoistureNoise.get(x / 10, y / 10) + 0.2 * WorldGenerator.MoistureNoise.get(x / 100, y / 100)) / 1.2;
		let temperature = (WorldGenerator.TemperatureNoise.get(x / 20, y / 20));
		let value = WorldGenerator.noise.get(x / 500, y / 500);

		let biome = this.FindBiome(moisture, temperature, value);
		let height
			= 64 + WorldGenerator.noise.get(x * biome.Roughness, y * biome.Roughness) * 192;
		if (height < 64) {
			biome = this.FindBiome(1, temperature, value);
			height = value * 128;
		}
		return new PixelData(biome, height, moisture, temperature
			// , new Color(255 * temperature, 255 * value, 255 * moisture)
		);
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
		let candidates: Biome[] = this.PickCandidates(moisture, temperature);
		let biome = candidates[(candidates.length - 1) * value | 0];
		return biome || WorldGenerator.VoidBiome;
	}
	private PickCandidates(moisture: number, temperature: number) {
		let candidates: Biome[] = [];
		WorldGenerator.Biomes.forEach(biome => {
			if (biome.Moisture.Check(moisture) && biome.Temperature.Check(temperature)) {
				candidates.push(biome);
			}
		});
		candidates = candidates.sort((a, b) => 1 - a.Rarity - b.Rarity);
		return candidates;
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
