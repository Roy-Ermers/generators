import WorldGenerator from "./generators/WorldGenerator.js";
import { Noise } from "./Utils.js";
new Noise(Math.random());
let dropdown = document.querySelector("select");
let canvas = document.querySelector("canvas");
let button = document.querySelector("button");
let ctx = canvas.getContext("2d");
const Generators = [new WorldGenerator()];
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
    dropdown.addEventListener("change", () => {
        Generate(Generators[parseInt(dropdown.querySelector("option:checked").value)] || false, canvas);
    });
    button.addEventListener("click", () => {
        Noise.seed(Math.random());
        Generate(Generators[parseInt(dropdown.querySelector("option:checked").value)] || false, canvas);
    });
}
function Generate(generator, canvas) {
    if (!generator) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    console.log("Starting generation using " + generator.name);
    console.time("generation time");
    for (let x = 0; x < canvas.width / 2; x++)
        for (let y = 0; y < canvas.width / 2; y++) {
            let biome = generator.Generate(x, y);
            ctx.fillStyle = biome.color.darken(1 - (biome.height / 4)).toString();
            ctx.fillRect(x * 2, y * 2, 2, 2);
        }
    console.timeEnd("generation time");
}
