"use strict";

const body = document.querySelector("body");
body.appendChild(document.createElement("footer"));
const footer = document.querySelector("footer");
const skillsSection = document.getElementById("skills");
const skillList = document.querySelector(".skill-list");

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
copyright.className = "copyright";
copyright.innerHTML = `Tim Morrison ${thisYear} &copy;`;

footer.appendChild(copyright);

const skills = [
  "JavaScript",
  "HTML",
  "CSS",
  "3D Modeling",
  "Adobe Illustrator",
  "GitHub",
];

skills.forEach((skill) => {
  let li = document.createElement("li");
  li.className = "skill-item";
  li.textContent = skill;
  skillList.appendChild(li);
});
