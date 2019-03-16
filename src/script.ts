import IGenerator from "./Generator.js";
import PixelData from "./PixelData.js";
import WorldGenerator from "./generators/WorldGenerator.js";
let dropdown: HTMLSelectElement = document.querySelector("select") as HTMLSelectElement;
let canvas = document.querySelector("canvas") as HTMLCanvasElement;
let button = document.querySelector("button") as HTMLButtonElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;


const Generators: IGenerator[] = [new WorldGenerator()];
const PreformanceTesting = true;
const PixelSize = 4;


Generators.forEach(generator => {
	let elem = document.createElement("option");
	elem.value = Generators.indexOf(generator).toString();
	elem.textContent = generator.name;
	if (dropdown)
		dropdown.appendChild(elem);
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
			//@ts-ignore
			document.querySelector(".info").innerHTML = pixel.toString() + `<br>X: ${x / PixelSize}<br>Y: ${y / PixelSize}<br>Candidates: ${PickCandidates(pixel.moisture, pixel.temperature).map(x => `${x.Name} (${x.Rarity * 100}%)`).join(", ") || "(none)"}`;
		}
	})
	dropdown.addEventListener("change", () => {
		Generate(Generators[parseInt((dropdown.querySelector("option:checked") as HTMLOptionElement).value)] || false, canvas);
	});
	button.addEventListener("click", () => {

		Generate(Generators[parseInt((dropdown.querySelector("option:checked") as HTMLOptionElement).value)] || false, canvas);
	})
}

function Generate(generator: IGenerator | false, canvas: HTMLCanvasElement) {
	if (!generator) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		return;
	}
	generator.Refresh();
	if (PreformanceTesting) {
		let timing = performance.now();
		(<IGenerator>generator).Generate(0,0);

		let endtime = performance.now();
		if (endtime - timing < 25)
			console.log("One pixel speed test: " + (endtime - timing) + "ms");
		else
			console.warn("One pixel speed test took too long (" + (endtime - timing) + "ms). Please optimize your code.");
	}
	console.log("Starting generation using " + generator.name);
	console.time("generation time");
	for (let x = 0; x < canvas.width / PixelSize; x++)
		for (let y = 0; y < canvas.width / PixelSize; y++) {
			let biome = (<IGenerator>generator).Generate(x / PixelSize, y / PixelSize) as PixelData;
			if (biome.height != 0)
				ctx.fillStyle = biome.color.darken(1 - (biome.height / 512)).toString();
			else ctx.fillStyle = biome.color.toString();
			ctx.fillRect(x * PixelSize, y * PixelSize, PixelSize, PixelSize);
		}
	console.timeEnd("generation time");
}

let x = 0;
let offsetX = canvas.width / PixelSize;
let offsetY = canvas.width / PixelSize;
function Scroll() {
	let generator = Generators[parseInt((dropdown.querySelector("option:checked") as HTMLOptionElement).value)];
	ctx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), PixelSize, PixelSize);
	for (let y = 0; y < canvas.width / PixelSize; y++) {
		let biome = (<IGenerator>generator).Generate((canvas.width + offsetX) / PixelSize, (y / PixelSize) + offsetY) as PixelData;
		if (biome.height != 0)
			ctx.fillStyle = biome.color.darken(1 - (biome.height / 512)).toString();
		else ctx.fillStyle = biome.color.toString();
		ctx.fillRect(0, y * PixelSize, PixelSize, PixelSize);
	}
	offsetX++;
	offsetY++;
	requestAnimationFrame(Scroll);
}
//@ts-ignore
window.Scroll = Scroll;