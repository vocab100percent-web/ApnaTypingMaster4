// -------------------------------
// Typing Test Main Script
// File: scripts/main.js
// -------------------------------

// DOM elements
const passageBox = document.getElementById("passageBox");
const typingBox = document.getElementById("typingBox");
const fontSelect = document.getElementById("fontSelect");
const startBtn = document.getElementById("startBtn");
const timerDisplay = document.getElementById("timer");
const resultBox = document.getElementById("resultBox");

// Timer variables
let timer = 0;
let timerInterval = null;
let testStarted = false;

// -------------------------------
// ✅ SAMPLE PASSAGES (Later from Admin Dashboard + Firebase)
// -------------------------------

const passages = {
  english: "The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice.",
  mangal: "यह एक उदाहरण अनुच्छेद है जिसे आप टाइप कर सकते हैं। नियमित अभ्यास से आपकी टाइपिंग स्पीड बढ़ेगी।",
  krutidev: "¼;g ,d mnkguh vuqPNsn gS ftldk vki VkbZYi dk iz;ksx dj ldrs gSa½"
};

// -------------------------------
// ✅ UPDATE FONT + PASSAGE WHEN USER SELECTS LANGUAGE
// -------------------------------

fontSelect.addEventListener("change", () => {
  const font = fontSelect.value;

  if (font === "english") {
    passageBox.style.fontFamily = "Arial, sans-serif";
    typingBox.style.fontFamily = "Arial, sans-serif";
    passageBox.innerText = passages.english;
  }

  if (font === "mangal") {
    passageBox.style.fontFamily = "Mangal, Arial, sans-serif";
    typingBox.style.fontFamily = "Mangal, Arial, sans-serif";
    passageBox.innerText = passages.mangal;
  }

  if (font === "krutidev") {
    passageBox.style.fontFamily = "'Kruti Dev 010', 'Mangal', sans-serif";
    typingBox.style.fontFamily = "'Kruti Dev 010', 'Mangal', sans-serif";
    passageBox.innerText = passages.krutidev;
  }
});

// -------------------------------
// ✅ START TEST
// -------------------------------

startBtn.addEventListener("click", () => {
  typingBox.value = "";
  typingBox.disabled = false;
  typingBox.focus();

  timer = 0;
  timerDisplay.innerText = "0s";
  resultBox.innerHTML = "";
  resultBox.classList.add("hidden");

  testStarted = false;

  if (timerInterval) clearInterval(timerInterval);
});

// -------------------------------
// ✅ START TIMER WHEN USER STARTS TYPING
// -------------------------------

typingBox.addEventListener("input", () => {
  const original = passageBox.innerText.trim();
  const typed = typingBox.value.trim();

  // Start timer only on first keystroke
  if (!testStarted) {
    testStarted = true;
    timerInterval = setInterval(() => {
      timer++;
      timerDisplay.innerText = timer + "s";
    }, 1000);
  }

  // ✅ When passage is completed
  if (typed === original) {
    clearInterval(timerInterval);
    typingBox.disabled = true;

    // Calculate WPM
    const words = original.split(" ").length;
    const wpm = Math.round((words / timer) * 60);

    // Calculate Accuracy
    let totalChars = original.length;
    let correct = 0;

    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === original[i]) correct++;
    }

    let accuracy = ((correct / totalChars) * 100).toFixed(2);

    // Result Output
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      ✅ <b>Test Completed!</b><br>
      ⏱ Time Taken: <b>${timer} sec</b><br>
      ⚡ Speed: <b>${wpm} WPM</b><br>
      🎯 Accuracy: <b>${accuracy}%</b>
    `;

    // Celebration popup
    setTimeout(() => {
      alert(
        `🎉 Test Completed!\n\nTime: ${timer}s\nSpeed: ${wpm} WPM\nAccuracy: ${accuracy}%`
      );
    }, 300);
  }
});
