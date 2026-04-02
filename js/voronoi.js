import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";
import { PROJECTS, CONFIG } from "./projects.js";

const svg = d3.select("#viz");
const bar = document.getElementById("info-bar");
const iName = document.getElementById("info-name");
const iDesc = document.getElementById("info-desc");
const iTags = document.getElementById("info-tags");
const hint = document.getElementById("hint");

let W = window.innerWidth;
let H = window.innerHeight;
let hov = -1;

// Cell colors
const shades = PROJECTS.map((_, i) =>
  Math.round(
    CONFIG.shadeMin + ((i * 0.6) % 1) * (CONFIG.shadeMax - CONFIG.shadeMin),
  ),
);

const cols = Math.ceil(Math.sqrt((PROJECTS.length * W) / H));
const rows = Math.ceil(PROJECTS.length / cols);

const pts = PROJECTS.map((_, i) => ({
  x: (((i % cols) + 0.5 + (Math.random() - 0.5) * 0.5) / cols) * W,
  y: ((Math.floor(i / cols) + 0.5 + (Math.random() - 0.5) * 0.5) / rows) * H,
  vx: (Math.random() - 0.5) * CONFIG.speed * 2,
  vy: (Math.random() - 0.5) * CONFIG.speed * 2,
}));

const cellGroup = svg.append("g").attr("class", "cell-group");
const labelGroup = svg.append("g").attr("class", "label-group");

function render() {
  const delaunay = d3.Delaunay.from(pts.map((p) => [p.x, p.y]));
  const voronoi = delaunay.voronoi([0, 0, W, H]);

  const paths = cellGroup.selectAll(".cell").data(PROJECTS);

  paths
    .enter()
    .append("path")
    .attr("class", "cell")
    .on("mouseenter", onCellEnter)
    .on("mouseleave", onCellLeave)
    .on("click", onCellClick)
    .merge(paths)
    .attr("d", (_, i) => voronoi.renderCell(i))
    .attr("fill", (_, i) => cellFill(i));

  const labels = labelGroup.selectAll(".cell-label").data(PROJECTS);

  labels
    .enter()
    .append("text")
    .attr("class", "cell-label")
    .merge(labels)
    .attr("x", (_, i) => centroidX(voronoi, i))
    .attr("y", (_, i) => centroidY(voronoi, i))
    .attr("fill", (_, i) =>
      i === hov ? "rgba(255, 255, 255, 0.8" : "rgba(255, 255, 255, 0.3",
    )
    .attr("font-size", (_, i) => labelSize(voronoi, i))
    .text((d) => d.name.toLowerCase());
}

function cellFill(i) {
  const v = i === hov ? CONFIG.shadeHov : shades[i];
  return `rgb(${v}, ${v}, ${v})`;
}

function centroidX(voronoi, i) {
  const poly = voronoi.cellPolygon(i);
  return poly ? d3.polygonCentroid(poly)[0] : pts[i].x;
}

function centroidY(voronoi, i) {
  const poly = voronoi.cellPolygon(i);
  return poly ? d3.polygonCentroid(poly)[1] : pts[i].y;
}

function labelSize(voronoi, i) {
  const poly = voronoi.cellPolygon(i);
  if (!poly) return "24px";
  const area = Math.abs(d3.polygonArea(poly));
  return Math.min(24, Math.max(12, Math.sqrt(area) * 0.04)) + "px";
}

// Events
function onCellEnter(_, d) {
  hov = PROJECTS.indexOf(d);
  hint.classList.add("hidden");
  iName.textContent = d.name;
  iDesc.textContent = d.desc;
  iTags.innerHTML = d.tags.map((t) => `<span class="tag">${t}</span>`).join("");
  bar.classList.add("visible");
}

function onCellLeave() {
  hov = -1;
  bar.classList.remove("visible");
  hint.classList.remove("hidden");
}

function onCellClick(_, d) {
  window.open(d.url, "_blank").focus();
}

// Animation
function tick() {
  movePts();
  render();
  requestAnimationFrame(tick);
}

function movePts() {
  const { speed, edgePad } = CONFIG;

  pts.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    // bounce off edges
    if (p.x < edgePad) {
      p.x = edgePad;
      p.vx = Math.abs(p.vx);
    }
    if (p.x > W - edgePad) {
      p.x = W - edgePad;
      p.vx = -Math.abs(p.vx);
    }
    if (p.y < edgePad) {
      p.y = edgePad;
      p.vy = Math.abs(p.vy);
    }
    if (p.y > H - edgePad) {
      p.y = H - edgePad;
      p.vy = -Math.abs(p.vy);
    }

    p.vx += (Math.random() - 0.5) * 0.008;
    p.vy += (Math.random() - 0.5) * 0.008;

    const spd = Math.hypot(p.vx, p.vy);
    if (spd > speed) {
      p.vx = (p.vx / spd) * speed;
      p.vy = (p.vy / spd) * speed;
    }
    if (spd < speed * 0.35) {
      p.vx *= 1.1;
      p.vy * 1.1;
    }
  });
}

// Resize
window.addEventListener("resize", () => {
  W = window.innerWidth;
  H = window.innerHeight;
});

tick();
