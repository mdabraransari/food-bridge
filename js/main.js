const listings = [
  { id: 1, place: "Spice Route", area: "Indiranagar", food: "Veg biryani, raita, salad", amount: 42, unit: "people", kind: "cooked", diet: "veg", by: "10:15 pm", status: "open" },
  { id: 2, place: "The Lantern", area: "MG Road", food: "Buffet trays, mixed", amount: 18, unit: "people", kind: "cooked", diet: "mixed", by: "9:40 pm", status: "claimed" },
  { id: 3, place: "Haldi & Co.", area: "Jayanagar", food: "Veg thali, rice, dal", amount: 26, unit: "people", kind: "cooked", diet: "veg", by: "10:00 pm", status: "open" },
  { id: 4, place: "Palace Grounds wedding", area: "Sadashivanagar", food: "Banquet mains and breads", amount: 90, unit: "people", kind: "cooked", diet: "non-veg", by: "11:00 pm", status: "open" },
  { id: 5, place: "North Mess", area: "Koramangala", food: "Dal, sabzi, rotis", amount: 30, unit: "people", kind: "cooked", diet: "veg", by: "9:50 pm", status: "open" },
  { id: 6, place: "Whitefield banquet hall", area: "Whitefield", food: "Mixed dinner service", amount: 54, unit: "people", kind: "cooked", diet: "mixed", by: "10:30 pm", status: "claimed" },
  { id: 7, place: "Neighbourhood crate", area: "Jayanagar", food: "Tomatoes, spinach, onions", amount: 8, unit: "kg", kind: "raw", diet: "veg", by: "8:30 pm", status: "open" }
];

const state = { filter: "all", items: listings, seq: 8 };

const heroList = document.querySelector("[data-hero-list]");
const board = document.querySelector("[data-board]");
const empty = document.querySelector("[data-empty]");
const toast = document.querySelector("[data-toast]");

function dietClass(diet) {
  if (diet === "mixed" || diet === "non-veg") return diet === "mixed" ? "tag-mixed" : "tag-nonveg";
  return "";
}

function measureLabel(item) {
  return item.unit === "kg" ? "kg" : "people";
}

function ticket(item, compact) {
  const claimed = item.status === "claimed";
  const kind = item.kind === "raw" ? "Uncooked" : "Prepared";
  return `
    <article class="ticket">
      <div class="ticket-top">
        <div>
          <h3>${escapeHtml(item.place)}</h3>
          <p class="place">${escapeHtml(item.area)} · ${kind}</p>
        </div>
        <span class="tag ${dietClass(item.diet)}">${escapeHtml(item.diet)}</span>
      </div>
      <p class="portions">${item.amount}<small>${measureLabel(item)}</small></p>
      ${compact ? "" : `<p>${escapeHtml(item.food)}</p>`}
      <div class="ticket-meta">
        <span>Leave by ${escapeHtml(item.by)}</span>
        <button class="claim" type="button" data-claim="${item.id}" ${claimed ? "disabled" : ""}>
          ${claimed ? "Claimed" : "Claim pickup"}
        </button>
      </div>
    </article>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function filtered() {
  return state.items.filter((item) => {
    if (state.filter === "all") return true;
    if (state.filter === "open") return item.status === "open";
    return item.diet === state.filter;
  });
}

function render() {
  heroList.innerHTML = state.items.slice(0, 3).map((item) => ticket(item, true)).join("");
  const rows = filtered();
  board.innerHTML = rows.map((item) => ticket(item, false)).join("");
  empty.hidden = rows.length > 0;

  const open = state.items.filter((item) => item.status === "open");
  const claimed = state.items.filter((item) => item.status === "claimed");
  document.querySelector("[data-open-count]").textContent = open.length;
  document.querySelector("[data-claimed-count]").textContent = claimed.length;
  document.querySelector("[data-portion-count]").textContent = state.items.reduce((sum, item) => {
    return sum + (item.unit === "kg" ? 0 : Number(item.amount));
  }, 0);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

document.addEventListener("click", (event) => {
  const claim = event.target.closest("[data-claim]");
  if (!claim || claim.disabled) return;
  const item = state.items.find((row) => String(row.id) === claim.dataset.claim);
  if (!item || item.status === "claimed") return;
  item.status = "claimed";
  render();
  showToast(`${item.place} is marked claimed on this demo board.`);
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((chip) => {
      const on = chip === button;
      chip.classList.toggle("is-on", on);
      chip.setAttribute("aria-pressed", String(on));
    });
    render();
  });
});

const listDialog = document.getElementById("list-dialog");
const joinDialog = document.getElementById("join-dialog");
const listForm = document.getElementById("list-form");
const listTitle = document.getElementById("list-title");
const qtyText = listForm.querySelector("[data-qty-text]");
const amountInput = listForm.querySelector("[name='amount']");
const foodInput = listForm.querySelector("[name='food']");

function showListStep(step) {
  listForm.querySelector("[data-step='kind']").hidden = step !== "kind";
  listForm.querySelector("[data-step='details']").hidden = step !== "details";
  listTitle.textContent = step === "kind" ? "Donate food" : "Add the details";
}

function setUnit(unit) {
  listForm.querySelector("[name='unit']").value = unit;
  const byPeople = unit === "people";
  qtyText.textContent = byPeople
    ? "How many people can this feed?"
    : "Weight in kilograms";
  amountInput.min = byPeople ? "1" : "0.1";
  amountInput.step = byPeople ? "1" : "0.1";
  amountInput.max = byPeople ? "500" : "500";
  if (byPeople && amountInput.value && Number(amountInput.value) < 1) amountInput.value = "1";
  listForm.querySelectorAll("[data-unit]").forEach((button) => {
    const on = button.dataset.unit === unit;
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-pressed", String(on));
  });
}

function resetListFlow() {
  listForm.reset();
  setUnit("people");
  showListStep("kind");
}

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = button.dataset.open === "list" ? listDialog : joinDialog;
    if (button.dataset.open === "list") resetListFlow();
    if (typeof dialog.showModal === "function") dialog.showModal();
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

listForm.querySelectorAll("[data-kind]").forEach((button) => {
  button.addEventListener("click", () => {
    const kind = button.dataset.kind;
    listForm.querySelector("[name='kind']").value = kind;
    const raw = kind === "raw";
    listForm.querySelector("[data-kind-summary]").textContent = raw
      ? "Uncooked food — ingredients that were never cooked."
      : "Prepared food — cooked, still good to eat, and not eaten.";
    foodInput.placeholder = raw ? "Tomatoes, spinach, rice" : "Veg thali, rice, dal";
    setUnit(raw ? "kg" : "people");
    showListStep("details");
  });
});

listForm.querySelector("[data-back]").addEventListener("click", () => showListStep("kind"));

listForm.querySelectorAll("[data-unit]").forEach((button) => {
  button.addEventListener("click", () => setUnit(button.dataset.unit));
});

listForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (listForm.querySelector("[data-step='details']").hidden) return;
  const data = new FormData(listForm);
  const unit = data.get("unit");
  state.items.unshift({
    id: state.seq++,
    place: data.get("place").trim(),
    area: data.get("area").trim(),
    food: data.get("food").trim(),
    amount: Number(data.get("amount")),
    unit,
    kind: data.get("kind"),
    diet: data.get("diet"),
    by: data.get("by").trim(),
    status: "open"
  });
  listDialog.close();
  resetListFlow();
  render();
  showToast("Posted to your demo board. It stays in this browser.");
});

document.getElementById("join-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const interest = {
    name: data.get("name").trim(),
    email: data.get("email").trim(),
    role: data.get("role"),
    area: data.get("area").trim()
  };
  try {
    const saved = JSON.parse(localStorage.getItem("foodbridge-interest") || "[]");
    saved.push(interest);
    localStorage.setItem("foodbridge-interest", JSON.stringify(saved));
  } catch (_) { /* demo still confirms in the toast */ }
  event.target.reset();
  joinDialog.close();
  showToast(`${interest.role} saved on this device for ${interest.area}.`);
});

const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const panel = document.querySelector("[data-nav-panel]");
toggle.addEventListener("click", () => {
  const open = panel.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
panel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    panel.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

function onScroll() {
  nav.classList.toggle("is-stuck", window.scrollY > 8);
}
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const clock = document.querySelector("[data-clock]");
function tick() {
  clock.textContent = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date());
}
tick();
setInterval(tick, 30000);

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const counters = document.querySelectorAll("[data-count]");
if (reduce) {
  counters.forEach((node) => { node.textContent = Number(node.dataset.count).toLocaleString("en-IN"); });
} else {
  const seen = new WeakSet();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || seen.has(entry.target)) return;
      seen.add(entry.target);
      const target = Number(entry.target.dataset.count);
      const start = performance.now();
      const duration = 900;
      function frame(now) {
        const progress = Math.min(1, (now - start) / duration);
        entry.target.textContent = Math.round(target * progress).toLocaleString("en-IN");
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }, { threshold: 0.6 });
  counters.forEach((node) => observer.observe(node));
}

render();
