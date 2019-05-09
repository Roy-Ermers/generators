import PixelData from "./PixelData.js";


export default interface IGenerator {
	name: string;
	Dimension: "3D" | "2D";
	Generate(x: number, y: number): PixelData;

	Refresh(): void;
}
