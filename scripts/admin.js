// ------------------------------
// Load existing passages
// ------------------------------
function getPassages() {
  return JSON.parse(localStorage.getItem("apm_passages")) || [];
}

// ------------------------------
// Save passages
// ------------------------------
function savePassages(passages) {
  localStorage.setItem("apm_passages", JSON.stringify(passages));
}

// ------------------------------
// Add new passage
// ------------------------------
function addPassage(title, category, text) {
  const passages = getPassages();

  const newPassage = {
    id: Date.now(),
    title: title,
    category: category,
    text: text,
    createdAt: new Date().toISOString()
  };

  passages.push(newPassage);
  savePassages(passages);
}

// ------------------------------
// Delete passage
// ------------------------------
function deletePassage(id) {
  let passages = getPassages();
  passages = passages.filter(p => p.id !== id);
  savePassages(passages);
  renderPassages();
}

// ------------------------------
// Render Passage List in Admin Panel
// ------------------------------
function renderPassages() {
  const listBox = document.getElementById("passageList");
  const passages = getPassages();

  listBox.innerHTML = "";

  passages.forEach(passage => {
    const div = document.createElement("div");
    div.className = "p-4 border rounded mb-3 bg-white shadow";

    div.innerHTML = `
      <h3 class="font-bold">${passage.title}</h3>
      <p class="text-sm text-gray-600">Category: ${passage.category}</p>
      <button onclick="deletePassage(${passage.id})" 
        class="mt-2 bg-red-600 text-white px-3 py-1 rounded">
        Delete
      </button>
    `;

    listBox.appendChild(div);
  });
}

// ------------------------------
// Handle Form Submit
// ------------------------------
document.getElementById("addPassageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("passageTitle").value.trim();
  const category = document.getElementById("passageCategory").value.trim();
  const text = document.getElementById("passageText").value.trim();

  if (!title || !category || !text) {
    alert("Please fill all fields.");
    return;
  }

  addPassage(title, category, text);

  // Reset form
  document.getElementById("passageTitle").value = "";
  document.getElementById("passageCategory").value = "english";
  document.getElementById("passageText").value = "";

  alert("✅ Passage Added Successfully!");

  renderPassages();
});

// ------------------------------
// Initial Load
// ------------------------------
renderPassages();

