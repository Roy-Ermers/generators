import Biome from "../Biome.js";
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
	// a large collection of all biomes.
	static Biomes: Biome[] = [
		new ForestBiome(),
		new SnowBiome(),
		new GrasslandBiome(),
		new RockDesertBiome(),
		new SandDesertBiome(),
		new JungleBiome(),
		new MountainBiome(),
		// new VulcanBiome(),
		new TundraBiome()
		];

	static SeaBiomes = [
		new IceOceanBiome(),
		new OceanBiome()
	];
	// use this if there is absolutely no fit.
	static VoidBiome: Biome = new VoidBiome();


	// use multiple noisemaps
	static Maps: { [key: string]: Noise } = {
		MoistureNoise: new Noise(),
		TemperatureMap: new Noise(),
		TemperatureMap2: new Noise(),
		TemperatureMap3: new Noise(),
		HeightMap: new Noise(),
		OceanMap: new Noise(),
		OceanMap2: new Noise(),
		OceanMap3: new Noise(),
	}
	constructor() {
		// @ts-ignore
		window.PickCandidates = this.PickCandidates;
	}
	Generate(x: number, y: number): PixelData {
		let Maps = WorldGenerator.Maps;
		let islandSize = 1;
		let seaLevel = 106;
		x = x / islandSize;
		y = y / islandSize;
		let biome: Biome;

		let moisture = .8 * Maps.MoistureNoise.get(x / 10, y / 10)
			+ .2 * Maps.MoistureNoise.get(x / 100, y / 100);

		let temperature = (Maps.TemperatureMap.get(x / 20, y / 20) * .7
			+ Maps.TemperatureMap2.get(x / 4, y / 4) * .3);

		let value = Maps.HeightMap.get(x / 500, y / 500);

		let height = Maps.HeightMap.get(x * 50, y * 50);

		let Ocean = Maps.OceanMap.get(x / seaLevel, y / seaLevel) * .6
			+ Maps.OceanMap2.get(x / seaLevel * 10, y / seaLevel * 10) * .3
			+ Maps.OceanMap3.get(x / seaLevel * 15, y / seaLevel * 15) * .1;

		if (Ocean < seaLevel / 256) {
			biome = WorldGenerator.SeaBiomes[Math.floor(WorldGenerator.SeaBiomes.length * 1 - LinearToExpontial(temperature * 0.8 + Maps.TemperatureMap3.get(x * .1, y * .1) * .2))];
			height *= (Maps.HeightMap.get(x * biome.Roughness, y * biome.Roughness)) * seaLevel;
		} else {
			biome = this.FindBiome(moisture, temperature, value);
			height *= Maps.HeightMap.get(x * biome.Roughness, y * biome.Roughness) * 204.8;

		}
		return new PixelData(biome, height, moisture, temperature
			// , new Color(255 * temperature,0,0)
		);
	}
	Refresh(): void {
		Object.keys(WorldGenerator.Maps).forEach(x => WorldGenerator.Maps[x].Seed(Math.random()))
	}
	/**
	 * Find the most suitable biome.
	 * @param moisture the moisture to use
	 * @param temperature the temperature to use
	 * @param value the value (used to determine the biome)
	 */
	FindBiome(moisture: number, temperature: number, value: number): Biome {
		let candidates: Biome[] = this.PickCandidates(moisture, temperature);
		let biome = candidates[(candidates.length - 1) * value | 0];
		return biome || WorldGenerator.SeaBiomes[Math.floor(WorldGenerator.SeaBiomes.length * temperature)];
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


	get name() {
		return "World Generator";
	}
}

function LinearToExpontial(value: number) {
	// keep the value between 0 and 1. if the number is 1.2 then the result of the folowing will be 0.2.
	value = value % 1;

	return value ** 3;
}