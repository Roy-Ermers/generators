import WorldGenerator from "./generators/WorldGenerator.js";
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
    for (let x = 0; x < canvas.width / 4; x++)
        for (let y = 0; y < canvas.width / 4; y++) {
            let biome = generator.Generate(x / 4, y / 4);
            if (biome.height != 0)
                ctx.fillStyle = biome.color.darken(1 - (biome.height / 512)).toString();
            else
                ctx.fillStyle = biome.color.toString();
            ctx.fillRect(x * 4, y * 4, 4, 4);
        }
    console.timeEnd("generation time");
}
let x = 0;
let offset = canvas.width / 4;
function Scroll() {
    let generator = Generators[parseInt(dropdown.querySelector("option:checked").value)];
    ctx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 4, 0);
    for (let y = 0; y < canvas.width / 4; y++) {
        let biome = generator.Generate(canvas.width / 4 + offset / 4, y / 4);
        if (biome.height != 0)
            ctx.fillStyle = biome.color.darken(1 - (biome.height / 512)).toString();
        else
            ctx.fillStyle = biome.color.toString();
        ctx.fillRect(0, y * 4, 4, 4);
    }
    offset++;
    requestAnimationFrame(Scroll);
}
//@ts-ignore
window.Scroll = Scroll;
