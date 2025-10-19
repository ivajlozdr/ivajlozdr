import fs from "fs";

const svgPath = "./assets/about.svg";
let svg = fs.readFileSync(svgPath, "utf-8");

const birth = new Date(2008, 1, 16);
const now = new Date();

let years = now.getFullYear() - birth.getFullYear();
let months = now.getMonth() - birth.getMonth();
if (months < 0) {
    years--;
    months += 12;
}

const uptimeText = `${years} years, ${months} months`;
console.log("New uptime:", uptimeText);

let dots = " ............................... ";
if (months >= 10) {
    dots = dots.slice(0, -2) + " "; // yeet
}

svg = svg.replace(
    /(<tspan[^>]*id="age_data"[^>]*>)([^<]+)(<\/tspan>)/,
    `$1${uptimeText}$3`
);

svg = svg.replace(
    /(<tspan[^>]*id="age_data_dots"[^>]*>)([^<]+)(<\/tspan>)/,
    `$1${dots}$3`
);


fs.writeFileSync(svgPath, svg);
