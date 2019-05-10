import IGenerator from "./Generator.js";
import PixelData from "./PixelData.js";
import WorldGenerator, { WorldSettings } from "./generators/WorldGenerator.js";
import Color from "./Color.js";
let dropdown: HTMLSelectElement = document.querySelector("select") as HTMLSelectElement;
let canvas = document.querySelector("canvas") as HTMLCanvasElement;
let button = document.querySelector("button") as HTMLButtonElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;


const Generators: IGenerator[] = [new WorldGenerator()];
const PreformanceTesting = true;
const PixelSize = 6;

Generators.forEach(generator => {
	let elem = document.createElement("option");
	elem.value = Generators.indexOf(generator).toString();
	elem.textContent = generator.name;
	if (dropdown) {
		dropdown.appendChild(elem);
	}
});


if (canvas && ctx && dropdown) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.imageSmoothingEnabled = false;
	ctx.imageSmoothingQuality = "low";
	canvas.addEventListener("mousemove", (e) => {
		let generator = Generators[parseInt((dropdown.querySelector("option:checked") as HTMLOptionElement).value)];
		if (generator) {
			let x = (e.clientX - canvas.getBoundingClientRect().left) / PixelSize;
			let y = (e.clientY - canvas.getBoundingClientRect().top) / PixelSize;
			let pixel = generator.Generate(x / PixelSize, y / PixelSize);
			// @ts-ignore
			document.querySelector(".info").innerHTML = pixel.toString() + `<br>X: ${x / PixelSize}<br>Y: ${y / PixelSize}<br>Candidates: ${PickCandidates(pixel.moisture, pixel.temperature).map(x => `${x.Name} (${x.Rarity * 100}%)`).join(", ") || "(none)"}`;
		}
	});
	dropdown.addEventListener("change", () => {
		Generate(Generators[parseInt((dropdown.querySelector("option:checked") as HTMLOptionElement).value)] || false, canvas);
	});
	button.addEventListener("click", () => {

		Generate(Generators[parseInt((dropdown.querySelector("option:checked") as HTMLOptionElement).value)] || false, canvas);
	});
}

function Generate(generator: IGenerator | false, canvas: HTMLCanvasElement) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (!generator)
		return;
	generator.Refresh();
	console.log("%cStarting generation using " + generator.name, "font-size: 18px; background-color: blue; color: lightblue; font-weight: bold;");
	let time = 0;
	let estimatedTime = 0;
	if (PreformanceTesting) {
		let timing = performance.now();
		(<IGenerator>generator).Generate(0, 0);

		let endtime = performance.now();
		if (endtime - timing < 25) {
			console.group("Preformance");
			console.log("One pixel speed test: " + (endtime - timing) + "ms");
			console.log("amount of pixels in 1 second: " + 1000 / (endtime - timing) + "px");
			console.log("Estimated generation time: " + Math.pow(canvas.width / PixelSize, 2) * (endtime - timing) + "ms (" + Math.ceil((canvas.width / PixelSize * canvas.width / PixelSize) * (endtime - timing) / 1000) + "s)");
			console.groupEnd();

			estimatedTime = Math.pow(canvas.width / PixelSize, 2) * (endtime - timing);
		}
		else {
			console.warn("One pixel speed test took too long (" + (endtime - timing) + "ms). Please optimize your code.");
			return;
		}

		time = performance.now();
	}
	if (generator.Dimension == "2D")
		for (let x = 0; x < canvas.width / PixelSize; x++) {
			for (let y = 0; y < canvas.width / PixelSize; y++) {
				let biome = (<IGenerator>generator).Generate(x, y) as PixelData;
				if (biome.height !== 0) {
					ctx.fillStyle = biome.color.darken(1 - (biome.height / 512)).toString();
				} else { ctx.fillStyle = biome.color.toString(); }
				ctx.fillRect(x * PixelSize, y * PixelSize, PixelSize, PixelSize);
			}
		}
	else
		for (let z = 0; z < canvas.width / PixelSize; z++) {
			for (let x = 0; x < canvas.width / PixelSize; x++) {
				let biome = (<IGenerator>generator).Generate(x, z) as PixelData;
				let X = z % 2 == 0 ? x * (PixelSize * 2) : x * (PixelSize * 2) + PixelSize;
				let Y = z % 2 == 0 ? z * PixelSize : z * PixelSize;// % 2 == 0 ? z * (PixelSize * 1.5) : z * PixelSize;
				if (biome.moisture < 1)
					drawCube(X, Y, PixelSize, PixelSize, biome.height * PixelSize || PixelSize, biome.color, false);
				else
					drawCube(X, Y, PixelSize, PixelSize, PixelSize, biome.color, false, false);

			}
		}
	if (PreformanceTesting) {
		let FinishTime = performance.now() - time;
		console.log(`Generating took ${Math.round(FinishTime)}ms (${Math.round(FinishTime / 1000)}s)`);
		if (FinishTime < estimatedTime)
			console.log(`Generation ran ${Math.round(100 / estimatedTime * FinishTime)}% faster as expected!🎉🎉`);
		else console.log(`Generation ran ${100 - 100 / FinishTime * estimatedTime}% slower as expected.`);
	}
}

function drawCube(x: number, y: number, wx: number, wy: number, h: number, color: Color, drawLines: boolean = true, shade: boolean = true) {
	ctx.beginPath();
	ctx.fillStyle = ctx.strokeStyle = color.toString();
	ctx.moveTo(x, y);
	ctx.lineTo(x - wx, y - wx * 0.5);
	ctx.lineTo(x - wx, y - h - wx * 0.5);
	ctx.lineTo(x, y - h * 1);
	ctx.closePath();
	if (shade)
		ctx.fillStyle = color.darken(0.8).toString();
	if (drawLines)
		ctx.strokeStyle = color.toString();
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + wy, y - wy * 0.5);
	ctx.lineTo(x + wy, y - h - wy * 0.5);
	ctx.lineTo(x, y - h * 1);
	ctx.closePath();
	if (shade)
		ctx.fillStyle = color.darken(1.1).toString();
	if (!(!shade || !drawLines))
		ctx.strokeStyle = color.darken(1.5).toString();
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x, y - h);
	ctx.lineTo(x - wx, y - h - wx * 0.5);
	ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
	ctx.lineTo(x + wy, y - h - wy * 0.5);
	ctx.closePath();
	if (shade)
		ctx.fillStyle = color.darken(1.2).toString();
	if (!(!shade || !drawLines))
		ctx.strokeStyle = color.darken(1.6).toString();
	ctx.stroke();
	ctx.fill();

}