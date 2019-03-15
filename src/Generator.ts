import PixelData from "./PixelData.js";


export default interface IGenerator {
	name: string;

	Generate(x: number, y: number): PixelData;

	Refresh(): void;
}
