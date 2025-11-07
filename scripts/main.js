// scripts/main.js
import { listPassages, ensureSeed } from './admin.js';
import { getCurrentUser } from './auth.js';

let timer = null;
let startTime = null;
let totalSeconds = 0;

const passageSelect = document.getElementById('passageSelect');
const fontSelect = document.getElementById('fontSelect');
const testText = document.getElementById('testText');
const typingBox = document.getElementById('typingBox');
const startBtn = document.getElementById('startTestBtn');
const timerDisplay = document.getElementById('timerDisplay');
const resultBox = document.getElementById('resultBox');

function loadPassagesToSelect(){
  ensureSeed();
  const arr = listPassages();
  passageSelect.innerHTML = '';
  arr.forEach(p=>{
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.title} (${p.category})`;
    passageSelect.appendChild(opt);
  });
}

function applyFontClass(font){
  testText.className = '';
  typingBox.className = 'typing-box';
  if(font === 'mangal'){
    testText.classList.add('hindi-mangal');
    typingBox.classList.add('hindi-mangal');
  } else if(font === 'krutidev'){
    testText.classList.add('hindi-krutidev');
    typingBox.classList.add('hindi-krutidev');
  } else {
    // english default
  }
}

function loadSelectedPassage(){
  const id = passageSelect.value;
  const arr = listPassages();
  const p = arr.find(x=>x.id===id);
  if(!p){ testText.textContent='No passage found'; return; }
  testText.textContent = p.text;
}

function resetTest(){
  clearInterval(timer);
  timer = null;
  startTime = null;
  totalSeconds = 0;
  timerDisplay.textContent = '00:00';
  typingBox.value = '';
  typingBox.disabled = true;
  resultBox.classList.add('hidden');
}

function startTest(){
  resetTest();
  typingBox.disabled = false;
  typingBox.focus();
  startTime = Date.now();
  timer = setInterval(()=>{
    totalSeconds = Math.floor((Date.now() - startTime) / 1000);
    const mm = String(Math.floor(totalSeconds/60)).padStart(2,'0');
    const ss = String(totalSeconds%60).padStart(2,'0');
    timerDisplay.textContent = `${mm}:${ss}`;
  }, 500);
}

function computeResult(){
  const original = testText.textContent.trim();
  const typed = typingBox.value.trim();
  if(typed === original){
    clearInterval(timer);
    const secs = Math.max(1, Math.floor((Date.now() - startTime)/1000));
    const words = original.split(/\s+/).length;
    const wpm = Math.round((words / secs) * 60);
    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `✅ Completed! Time: <b>${secs}s</b> | Speed: <b>${wpm} WPM</b>`;
    typingBox.disabled = true;
  }
}

/* Events */
document.addEventListener('DOMContentLoaded', ()=>{
  loadPassagesToSelect();
  loadSelectedPassage();
  applyFontClass(fontSelect.value || 'english');
});

passageSelect && passageSelect.addEventListener('change', loadSelectedPassage);
fontSelect && fontSelect.addEventListener('change', (e)=>{ applyFontClass(e.target.value); });
startBtn && startBtn.addEventListener('click', startTest);
typingBox && typingBox.addEventListener('input', computeResult);
