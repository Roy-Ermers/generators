import WorldGenerator from "./generators/WorldGenerator.js";
let dropdown = document.querySelector("select");
let canvas = document.querySelector("canvas");
let button = document.querySelector("button");
let ctx = canvas.getContext("2d");
const Generators = [new WorldGenerator()];
const PreformanceTesting = true;
let PixelSize = 6;
const mapSize = 1;
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
    // canvas.addEventListener("mousemove", (e) => {
    // 	let generator = Generators[parseInt((dropdown.querySelector("option:checked") as HTMLOptionElement).value)];
    // 	if (generator) {
    // 		let x = (e.clientX - canvas.getBoundingClientRect().left) / PixelSize;
    // 		let y = (e.clientY - canvas.getBoundingClientRect().top) / PixelSize;
    // 		let pixel = generator.Generate(x / PixelSize, y / PixelSize);
    // 		// @ts-ignore
    // 		document.querySelector(".info").innerHTML = pixel.toString() + `<br>X: ${x / PixelSize}<br>Y: ${y / PixelSize}<br>Candidates: ${PickCandidates(pixel.moisture, pixel.temperature).map(x => `${x.Name} (${x.Rarity * 100}%)`).join(", ") || "(none)"}`;
    // 	}
    // });
    canvas.addEventListener("wheel", ev => {
        PixelSize = Math.round(PixelSize + Math.sign(ev.deltaY));
    }, { passive: true });
    dropdown.addEventListener("change", () => {
        Generate(Generators[parseInt(dropdown.querySelector("option:checked").value)] || false, canvas);
    });
    button.addEventListener("click", () => {
        Generate(Generators[parseInt(dropdown.querySelector("option:checked").value)] || false, canvas);
    });
}
let cubes = [];
let dimension = "2D";
function Generate(generator, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!generator)
        return;
    generator.Refresh();
    dimension = generator.Dimension;
    console.log("%cStarting generation using " + generator.name, "font-size: 18px; background-color: blue; color: lightblue; font-weight: bold;");
    let time = 0;
    let estimatedTime = 0;
    if (PreformanceTesting) {
        let timing = performance.now();
        generator.Generate(0, 0);
        let endtime = performance.now();
        if (endtime - timing < 25) {
            console.group("Preformance");
            console.log("One pixel speed test: " + (endtime - timing) + "ms");
            console.log("amount of pixels in 1 second: " + 1000 / (endtime - timing) + "px");
            console.log("Estimated generation time: " + Math.pow(canvas.width / PixelSize, 2) * (endtime - timing) + "ms (" + Math.ceil((canvas.width / PixelSize * canvas.width / PixelSize) * (endtime - timing) / 1000) + "s)");
            console.groupEnd();
            estimatedTime = Math.pow(canvas.width / PixelSize, 2) * (endtime - timing);
            for (let x = 0; x < mapSize; x++)
                for (let y = 0; y < mapSize; y++) {
                    cubes.push({ x, y, biome: generator.Generate(x, y) });
                }
        }
        else {
            console.warn("One pixel speed test took too long (" + (endtime - timing) + "ms). Please optimize your code.");
            return;
        }
        time = performance.now();
    }
    if (PreformanceTesting) {
        let FinishTime = performance.now() - time;
        console.log(`Generating took ${Math.round(FinishTime)}ms (${Math.round(FinishTime / 1000)}s)`);
        if (FinishTime < estimatedTime)
            console.log(`Generation ran ${Math.round(100 / estimatedTime * FinishTime)}% faster as expected!🎉🎉`);
        else
            console.log(`Generation ran ${100 - 100 / FinishTime * estimatedTime}% slower as expected.`);
    }
    requestAnimationFrame(render);
}
function render(frame) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (dimension == "2D")
        for (let i = 0; i < cubes.length; i++) {
            const cube = cubes[i];
            let biome = cube.biome;
            // if (biome.height !== 0) {
            // 	ctx.fillStyle = biome.color.darken(1 - (biome.height / 512)).toString();
            // } else { 
            ctx.fillStyle = biome.color.toString();
            // }
            const x = canvas.width / 2 / PixelSize + cube.x - mapSize / 2;
            const y = canvas.width / 4 / PixelSize + cube.y - mapSize / 2;
            ctx.fillRect(x * PixelSize, y * PixelSize, PixelSize, PixelSize);
        }
    else
        for (let i = 0; i < cubes.length; i++) {
            const cube = cubes[i];
            let biome = cube.biome;
            let X = cube.x * PixelSize;
            let Y = cube.y * PixelSize;
            if (biome.moisture < 1)
                drawCube(X, Y, biome.height * PixelSize || PixelSize, biome.color);
            else
                drawCube(X, Y, biome.height * PixelSize || PixelSize, biome.color);
        }
    requestAnimationFrame(render);
}
function drawCube(x, z, h, color) {
    x = canvas.width / 2 / PixelSize + x - mapSize / 2;
    z = canvas.width / 2 / PixelSize + z - mapSize / 2;
    x *= PixelSize;
    z *= PixelSize;
    ctx.strokeStyle = color.darken(0.9).toString();
    ctx.fillStyle = color.toString();
    ctx.beginPath();
    let bl = Iso(x, 0, z);
    ctx.moveTo(bl.x, bl.y);
    let tl = Iso(x, h * PixelSize, z);
    ctx.lineTo(tl.x, tl.y);
    let tr = Iso(x + PixelSize, h * PixelSize, z);
    ctx.lineTo(tr.x, tr.y);
    let br = Iso(x + PixelSize, 0, z);
    ctx.lineTo(br.x, br.y);
    ctx.stroke();
    ctx.fill();
}
function Iso(x, y, z) {
    return {
        x: x / z,
        y: y / z
    };
}
