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
import PixelData from "../PixelData.js";
import { Noise } from "../Utils.js";
export const WorldSettings = {
    SeaLevel: 106,
    LandSize: 1,
    BuildHeight: 256,
    MaxTerrainHeight: 64
};
export default class WorldGenerator {
    constructor() {
        this.Dimension = "2D";
        // @ts-ignore
        window.PickCandidates = this.PickCandidates;
    }
    Generate(x, y) {
        let Maps = WorldGenerator.Maps;
        x = x / WorldSettings.LandSize;
        y = y / WorldSettings.LandSize;
        let biome;
        let IsOcean = false;
        let moisture = .6 * Maps.MoistureMap.get(x / 17.5, y / 17.5)
            + .3 * Maps.MoistureMap2.get(x / 15, y / 15)
            + .1 * Maps.MoistureMap3.get(x / 10, y / 10);
        let temperature = (Maps.TemperatureMap.get(x / 20, y / 20) * .7
            + Maps.TemperatureMap2.get(x / 4, y / 4) * .3);
        let value = Maps.Height1Map.get(x / 500, y / 500);
        let height = .6 * Maps.Height1Map.get(x / 17.5, y / 17.5)
            + .3 * Maps.Height2Map.get(x / 15, y / 15)
            + .1 * Maps.Height3Map.get(x / 10, y / 10) * (WorldSettings.MaxTerrainHeight);
        let Ocean = Maps.OceanMap.get(x / WorldSettings.SeaLevel, y / WorldSettings.SeaLevel) * .6
            + Maps.OceanMap2.get(x / WorldSettings.SeaLevel * 10, y / WorldSettings.SeaLevel * 10) * .3
            + Maps.OceanMap3.get(x / WorldSettings.SeaLevel * 15, y / WorldSettings.SeaLevel * 15) * .1;
        if (Ocean < WorldSettings.SeaLevel / 256) {
            biome = WorldGenerator.SeaBiomes[Math.floor(WorldGenerator.SeaBiomes.length * 1 - LinearToExpontial(temperature * 0.8 + Maps.TemperatureMap3.get(x * .1, y * .1) * .2))];
            moisture = 1;
            IsOcean = true;
            if (biome.Roughness > 0)
                height = height * .8 + .2 * (Maps.Height1Map.get(x * biome.Roughness, y * biome.Roughness)) * WorldSettings.SeaLevel;
            else
                height = WorldSettings.SeaLevel;
        }
        else {
            biome = this.FindBiome(moisture, temperature, value);
            if (WorldGenerator.SeaBiomes.findIndex((obj) => obj == biome) >= 0)
                moisture = 1;
            height = (height * .9 +
                .1 * Maps.Height1Map.get(x * biome.Roughness, y * biome.Roughness))
                * LinearToExpontial(Ocean) * WorldSettings.MaxTerrainHeight;
        }
        return new PixelData(biome, Math.round(height), moisture, temperature, 
        // , new Color(255 * moisture,0,0)
        undefined, IsOcean);
    }
    Refresh() {
        Object.keys(WorldGenerator.Maps).forEach(x => WorldGenerator.Maps[x].Seed(Math.random()));
    }
    /**
     * Find the most suitable biome.
     * @param moisture the moisture to use
     * @param temperature the temperature to use
     * @param value the value (used to determine the biome)
     */
    FindBiome(moisture, temperature, value) {
        let candidates = this.PickCandidates(moisture, temperature);
        let biome = candidates[(candidates.length - 1) * value | 0];
        if (!biome) {
            biome = WorldGenerator.SeaBiomes[Math.floor(WorldGenerator.SeaBiomes.length * temperature)];
        }
        return biome;
    }
    PickCandidates(moisture, temperature) {
        let candidates = [];
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
// a large collection of all biomes.
WorldGenerator.Biomes = [
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
WorldGenerator.SeaBiomes = [
    new IceOceanBiome(),
    new OceanBiome()
];
// use this if there is absolutely no fit.
WorldGenerator.VoidBiome = new VoidBiome();
// use multiple noisemaps
WorldGenerator.Maps = {
    MoistureMap: new Noise(),
    MoistureMap2: new Noise(),
    MoistureMap3: new Noise(),
    TemperatureMap: new Noise(),
    TemperatureMap2: new Noise(),
    TemperatureMap3: new Noise(),
    Height1Map: new Noise(),
    Height2Map: new Noise(),
    Height3Map: new Noise(),
    OceanMap: new Noise(),
    OceanMap2: new Noise(),
    OceanMap3: new Noise(),
};
function LinearToExpontial(value) {
    // keep the value between 0 and 1. if the number is 1.2 then the result of the folowing will be 0.2.
    value = value % 1;
    return Math.pow(value, 3);
}
