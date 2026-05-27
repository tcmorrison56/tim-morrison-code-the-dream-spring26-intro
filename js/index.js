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

const messageForm = document.getElementsByName("leave_message")[0];

function messageHandler() {
  event.preventDefault();
  // Save message content
  const messageName = event.target.usersName.value;
  const messageEmail = event.target.usersEmail.value;
  const messageContent = event.target.usersMessage.value;

  // Select messages and list
  const messageSection = document.getElementById("messages");
  const messageList = document.querySelector(".messages-list");

  // New message HTML
  const newMessage = document.createElement("li");
  newMessage.classList.add("message-list-item");
  newMessage.innerHTML = `<a href="mailto:${messageEmail}" class="newUserName">${messageName}</a>
                          <span class="newMessageContent">${messageContent}</span>`;

  // Message removal button
  const removeButton = document.createElement("button");
  removeButton.classList.add("btn-remove-message");
  removeButton.innerText = "remove";
  removeButton.addEventListener("click", (e) => {
    const entry = e.target.parentNode;
    entry.remove();
    // Hide messages section if all messages are removed
    if (!document.querySelector(".message-list-item")) {
      messageSection.style = "display: none;";
    }
  });
  // append remove button
  newMessage.appendChild(removeButton);
  // append new message to messages secion
  messageList.appendChild(newMessage);
  // Display messages section
  messageSection.style = "display: block;";

  messageForm.reset();
}

messageForm.addEventListener("submit", messageHandler);
