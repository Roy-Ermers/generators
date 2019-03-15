import WorldGenerator from "./generators/WorldGenerator.js";
let dropdown = document.querySelector("select");
let canvas = document.querySelector("canvas");
let button = document.querySelector("button");
let ctx = canvas.getContext("2d");
const Generators = [new WorldGenerator()];
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
        let generator = Generators[parseInt(dropdown.querySelector("option:checked").value)];
        if (generator) {
            let x = (e.clientX - canvas.getBoundingClientRect().left) / PixelSize;
            let y = (e.clientY - canvas.getBoundingClientRect().top) / PixelSize;
            let pixel = generator.Generate(x / PixelSize, y / PixelSize);
            //@ts-ignore
            document.querySelector(".info").innerHTML = pixel.toString() + `<br>X: ${x / PixelSize}<br>Y: ${y / PixelSize}<br>Candidates: ${PickCandidates(pixel.moisture, pixel.temperature).map(x => x.Name).join(", ") || "(none)"}`;
        }
    });
    dropdown.addEventListener("change", () => {
        Generate(Generators[parseInt(dropdown.querySelector("option:checked").value)] || false, canvas);
    });
    button.addEventListener("click", () => {
        Generate(Generators[parseInt(dropdown.querySelector("option:checked").value)] || false, canvas);
    });
}
function Generate(generator, canvas) {
    if (!generator) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    generator.Refresh();
    console.log("Starting generation using " + generator.name);
    console.time("generation time");
    for (let x = 0; x < canvas.width / PixelSize; x++)
        for (let y = 0; y < canvas.width / PixelSize; y++) {
            let biome = generator.Generate(x / PixelSize, y / PixelSize);
            if (biome.height != 0)
                ctx.fillStyle = biome.color.darken(1 - (biome.height / 512)).toString();
            else
                ctx.fillStyle = biome.color.toString();
            ctx.fillRect(x * PixelSize, y * PixelSize, PixelSize, PixelSize);
        }
    console.timeEnd("generation time");
}
let x = 0;
let offset = canvas.width / PixelSize;
function Scroll() {
    let generator = Generators[parseInt(dropdown.querySelector("option:checked").value)];
    ctx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), PixelSize, 0);
    for (let y = 0; y < canvas.width / PixelSize; y++) {
        let biome = generator.Generate((canvas.width + offset) / PixelSize, y / PixelSize);
        if (biome.height != 0)
            ctx.fillStyle = biome.color.darken(1 - (biome.height / 512)).toString();
        else
            ctx.fillStyle = biome.color.toString();
        ctx.fillRect(0, y * PixelSize, PixelSize, PixelSize);
    }
    offset++;
    requestAnimationFrame(Scroll);
}
//@ts-ignore
window.Scroll = Scroll;
