import { PROJECTS } from "./projects.js";

const projectList = document.getElementById("projects");
const rantList = document.getElementById("rants");

projectList.innerHTML = PROJECTS.map(
  (project) => `
    <li>
      <a href="${project.url}" target="_blank" rel="noopener noreferrer">
        <span class="p-name">${project.name}</span>
        <span class="p-desc">${project.desc}</span>
      </a>
    </li>
  `,
).join("");

fetch("js/rants.json")
  .then((response) => response.json())
  .then((rants) => {
    rantList.innerHTML = rants
      .map((rant) => {
        const isExternal = /^https?:\/\//.test(rant.url);
        const attrs = isExternal
          ? `href="${rant.url}" target="_blank" rel="noopener noreferrer"`
          : `href="${rant.url}"`;
        return `
      <li>
        <a ${attrs}>${rant.title}</a>
      </li>
    `;
      })
      .join("");
  })
  .catch(() => {});

// Keep text readable over bright fluid: the sim spawns dye wherever the
// pointer moves, so estimate fluid brightness behind each content block
// from recent pointer positions and flip covered blocks to dark text.
const FLUID_GLOW_RADIUS = 130; // px, approx. reach of a splat + bloom glow
const FLUID_FADE_MS = 400; // how fast old splats stop counting
const FLUID_FLIP_THRESHOLD = 0.05; // lower flips more eagerly

const splats = [];
const recordSplat = (x, y) => {
  splats.push({ x, y, t: performance.now() });
  if (splats.length > 300) splats.splice(0, splats.length - 300);
};
window.addEventListener("mousemove", (e) => recordSplat(e.clientX, e.clientY));
window.addEventListener(
  "touchmove",
  (e) => {
    for (const t of e.touches) recordSplat(t.clientX, t.clientY);
  },
  { passive: true },
);

const coverageAt = (x, y, now) => {
  // Strongest single splat wins (rather than summing), so overlapping
  // trails don't keep the text flipped long after the fluid has faded.
  let peak = 0;
  for (const s of splats) {
    const dx = x - s.x;
    const dy = y - s.y;
    const c =
      Math.exp(-(dx * dx + dy * dy) / (2 * FLUID_GLOW_RADIUS ** 2)) *
      Math.exp(-(now - s.t) / FLUID_FADE_MS);
    if (c > peak) peak = c;
  }
  return peak;
};

setInterval(() => {
  const now = performance.now();
  for (let i = splats.length - 1; i >= 0; i--) {
    if (now - splats[i].t > FLUID_FADE_MS * 3) splats.splice(i, 1);
  }
  // Queried fresh each tick so async-loaded entries (rants) are included.
  const targets = document.querySelectorAll(
    "main header > *, main .label, main .p-name, main .p-desc, main .rants li",
  );
  targets.forEach((el) => {
    const r = el.getBoundingClientRect();
    // Spread sample points across the element so wide/tall elements
    // react locally instead of flipping all at once.
    const nx = r.width > 300 ? 3 : 1;
    const ny = r.height > 140 ? 2 : 1;
    let covered = false;
    for (let ix = 0; ix < nx && !covered; ix++) {
      for (let iy = 0; iy < ny && !covered; iy++) {
        if (
          coverageAt(
            r.left + (r.width * (ix + 0.5)) / nx,
            r.top + (r.height * (iy + 0.5)) / ny,
            now,
          ) > FLUID_FLIP_THRESHOLD
        ) {
          covered = true;
        }
      }
    }
    el.classList.toggle("on-light", covered);
  });
}, 120);
