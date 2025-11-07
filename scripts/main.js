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
  english: "The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. The quick brown fox jumps over the lazy dog. Improve your typing speed with regular practice. ",
  mangal: "समय का सही उपयोग जीवन में सफलता की कुंजी है। प्रत्येक व्यक्ति के पास दिन के चौबीस घंटे समान होते हैं, लेकिन अंतर इस बात में है कि वह इन घंटों का उपयोग कैसे करता है। जो लोग अपने समय की योजना बनाते हैं, वे हमेशा आगे रहते हैं। समय प्रबंधन का पहला कदम है—कार्य को उनकी प्राथमिकता के अनुसार विभाजित करना। कुछ काम महत्वपूर्ण होते हैं, कुछ तुरंत करने वाले, और कुछ ऐसे जिन्हें करने की आवश्यकता ही नहीं होती। जब व्यक्ति यह पहचानना सीख लेता है कि किस कार्य पर कितना समय देना है, तब उसका जीवन बहुत आसान हो जाता है। समय प्रबंधन का दूसरा महत्वपूर्ण पहलू है—ध्यान भटकाने वाली चीजों को कम करना। मोबाइल, टीवी, और अनावश्यक गतिविधियाँ हमारे घंटे बर्बाद कर देती हैं। यदि व्यक्ति दिन में केवल थोड़े समय के लिए भी मोबाइल दूर रख दे, तो वह अधिक उत्पादक हो सकता है। अध्ययन या काम करते समय एक शांत वातावरण और स्पष्ट योजना सबसे अधिक मदद करती है। जब दिन की शुरुआत ही एक योजना के साथ हो, तो मन हल्का महसूस करता है और तनाव कम होता है। समय का सम्मान करने वाले लोग हमेशा जीवन में आगे बढ़ते हैं। वे न केवल अपने काम में दक्ष होते हैं, बल्कि परिवार, स्वास्थ्य और व्यक्तिगत विकास के लिए भी समय निकाल लेते हैं। इस प्रकार, समय प्रबंधन एक ऐसा कौशल है जो हर व्यक्ति को सीखना चाहिए। यह न केवल सफलता दिलाता है, बल्कि जीवन को संतुलित और सुखद भी बनाता है।",
  krutidev: "नियमित अभ्यास किसी भी कौशल को सीखने का सबसे सरल और प्रभावी तरीका है। चाहे कोई व्यक्ति टाइपिंग सीख रहा हो, परीक्षा की तैयारी कर रहा हो या किसी भाषा में निपुण होना चाहता हो, रोज़ थोड़ा-थोड़ा अभ्यास बड़ी सफलता दिलाता है। अक्सर लोग शुरुआत में बहुत उत्साह के साथ पढ़ाई या टाइपिंग शुरू करते हैं, लेकिन कुछ ही दिनों बाद उनका जोश कम होने लगता है। इसका कारण यह है कि वे एक स्थिर दिनचर्या नहीं बनाते। नियमित अभ्यास से मस्तिष्क जानकारी को लंबे समय तक याद रखता है। इसलिए जो लोग प्रतिदिन केवल बीस मिनट भी अभ्यास करते हैं, वे उन लोगों से अधिक प्रगति कर लेते हैं जो एक दिन में कई घंटे अभ्यास करते हैं और फिर हफ्तों तक छोड़ देते हैं। नियमित अभ्यास से आत्मविश्वास बढ़ता है। जब व्यक्ति खुद को यह साबित करता है कि वह लगातार काम कर सकता है, तो भीतर एक मजबूत विश्वास विकसित होता है। यह विश्वास उसे आगे बढ़ने की ऊर्जा देता है। रोज़ अभ्यास करने से किसी भी कार्य में रफ्तार और सटीकता आती है। खासकर टाइपिंग में, जहाँ उंगलियों का तालमेल और गति दोनों का अभ्यास आवश्यक है। एक समान रूटीन रखने से दिमाग भी काम के लिए पहले से तैयार रहता है और सीखने की प्रक्रिया सरल हो जाती है। आज के समय में, जब मोबाइल और सोशल मीडिया ध्यान भटकाने के सबसे बड़े कारण बन चुके हैं, नियमित अभ्यास रखना और भी आवश्यक हो गया है। हर दिन कुछ समय पूर्ण एकाग्रता के साथ दिया जाए, तो छोटी-छोटी प्रगति मिलकर बड़ी सफलता का रूप ले लेती है। इसलिए, यदि आप रोज़ थोड़ा-बहुत अभ्यास करते रहेंगे, तो धीरे-धीरे आप किसी भी कौशल में उत्कृष्टता प्राप्त कर लेंगे।"
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
