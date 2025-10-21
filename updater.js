import fs from "fs";

const svgPath = "./assets/about.svg";
let svg = fs.readFileSync(svgPath, "utf-8");

const birth = new Date(2008, 1, 16);
const now = new Date();

let years = now.getFullYear() - birth.getFullYear();
let months = now.getMonth() - birth.getMonth();
let days = now.getDate() - birth.getDate();

if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
}

if (months < 0) {
    years--;
    months += 12;
}

let dots = " ....................... ";

let dotAdjustment = 0;

if (months >= 10) dotAdjustment--;
if (days >= 10) dotAdjustment--;

let monthText = "months";
if (months === 1) {
    monthText = "month";
    dotAdjustment++;
}

let dayText = "days";
if (days === 1) {
    dayText = "day";
    dotAdjustment++;
}

let interiorDots = dots.trim();

if (dotAdjustment < 0) {
    interiorDots = interiorDots.slice(0, dotAdjustment);
} else if (dotAdjustment > 0) {
    interiorDots += ".".repeat(dotAdjustment);
}

dots = ` ${interiorDots} `;

const uptimeText = `${years} years, ${months} ${monthText}, ${days} ${dayText}`;
console.log("New uptime:", uptimeText);

svg = svg.replace(
    /(<tspan[^>]*id="age_data"[^>]*>)([^<]+)(<\/tspan>)/,
    `$1${uptimeText}$3`
);

svg = svg.replace(
    /(<tspan[^>]*id="age_data_dots"[^>]*>)([^<]+)(<\/tspan>)/,
    `$1${dots}$3`
);

fs.writeFileSync(svgPath, svg);
