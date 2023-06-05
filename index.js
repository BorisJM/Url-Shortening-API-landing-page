"use strict";

const inputUrl = document.querySelector(".shorten-input");
const shortenBtn = document.querySelector(".shorten-btn");
const shortenForm = document.querySelector(".shorten-container");
const statsContainer = document.querySelector(".statistics-container");
const errorMessage = document.querySelector(".error-message");
const toggleBtn = document.querySelector(".toggle-btn");
const nav = document.querySelector(".links-buttons");

function showShortenLink(link) {
  statsContainer.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="url-container">
    <span class="url-full">${inputUrl.value}</span>
    <div class="url-btn">
      <span class="url-short">${link}</span>
      <button class="copy-btn">Copy</button>
    </div>
  </div>
    `
  );
  document.querySelector(".copy-btn").addEventListener("click", function (e) {
    this.textContent = "Copied!";
    this.style.backgroundColor = "hsl(257, 27%, 26%)";
    navigator.clipboard.writeText(link);
  });
  inputUrl.value = "";
}

async function getShortenUrl() {
  try {
    const fetching = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${inputUrl.value}`
    );
    const data = await fetching.json();
    const link = data.result.short_link;
    showShortenLink(link);
  } catch (error) {
    console.error(error);
  }
}

shortenForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!inputUrl.value) {
    inputUrl.classList.add("error-input");
    errorMessage.classList.remove("hidden");
    setTimeout(() => {
      inputUrl.classList.remove("error-input");
      errorMessage.classList.add("hidden");
    }, 3000);
    return;
  }
  getShortenUrl();
});

// NAVBAR

toggleBtn.addEventListener("click", function (e) {
  nav.classList.toggle("open");
});
