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
