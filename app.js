const form = document.getElementById("sessionForm");
const sessionList = document.getElementById("sessionList");
const toast = document.getElementById("toast");
const overallPercent = document.getElementById("overallPercent");
const progressCircle = document.querySelector(".progress-ring .progress");
const boostBtn = document.getElementById("boostBtn");
const celebrateBtn = document.getElementById("celebrateBtn");
const focusScore = document.getElementById("focusScore");

const sessions = [
  { topic: "Current Electricity", minutes: 110, energy: "Focused" },
  { topic: "Hydrocarbons", minutes: 80, energy: "Steady" },
  { topic: "Definite Integrals", minutes: 95, energy: "High" },
];

const progressState = {
  percent: 78,
  focus: 8.4,
};

const renderSessions = () => {
  sessionList.innerHTML = "";
  sessions.slice(0, 4).forEach((session) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${session.topic}</strong>
        <p>${session.minutes} mins · ${session.energy}</p>
      </div>
      <span>✓</span>
    `;
    sessionList.appendChild(li);
  });
};

const updateProgressRing = () => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressState.percent / 100) * circumference;
  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = `${offset}`;
  overallPercent.textContent = `${progressState.percent}%`;
  focusScore.textContent = `${progressState.focus.toFixed(1)} / 10`;
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
};

const animateSubjects = () => {
  document.querySelectorAll(".subject").forEach((subject) => {
    const percent = subject.dataset.progress;
    const meter = subject.querySelector(".subject__meter span");
    meter.style.background = `conic-gradient(var(--accent) ${percent}%, rgba(148, 163, 184, 0.2) ${percent}%)`;
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const topic = data.get("topic");
  const minutes = data.get("minutes");
  const energy = data.get("energy");

  sessions.unshift({ topic, minutes, energy });
  renderSessions();
  progressState.percent = Math.min(100, progressState.percent + 1);
  progressState.focus = Math.min(10, progressState.focus + 0.1);
  updateProgressRing();
  form.reset();
  showToast("Session added! Keep the streak alive ⚡");
});

boostBtn.addEventListener("click", () => {
  progressState.percent = Math.min(100, progressState.percent + 2);
  progressState.focus = Math.min(10, progressState.focus + 0.2);
  updateProgressRing();
  showToast("Boost activated — energy +2!");
});

celebrateBtn.addEventListener("click", () => {
  showToast("You are unstoppable. Celebrate the progress! 🎉");
});

renderSessions();
animateSubjects();
updateProgressRing();
