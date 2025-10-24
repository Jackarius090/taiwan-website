import fs from "fs";
import { JSDOM } from "jsdom";

const svgContent = fs.readFileSync("public/tw.svg", "utf-8");
const dom = new JSDOM(svgContent);
const paths = [...dom.window.document.querySelectorAll("path")];

const regions = paths.map((p) => ({
  id: p.getAttribute("id"),
  name: p.getAttribute("name"),
  d: p.getAttribute("d"),
}));

fs.writeFileSync("./regions.json", JSON.stringify(regions, null, 2));
console.log("✅ Extracted regions saved to regions.json");
