// main.js – chaotic overlapping collage with hover + per-card drag

document.addEventListener("DOMContentLoaded", () => {
  const collageEl = document.getElementById("collage");

  const modalEl = document.getElementById("detailModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCity = document.getElementById("modalCity");
  const modalTags = document.getElementById("modalTags");
  const modalDescription = document.getElementById("modalDescription");
  const modalLocation = document.getElementById("modalLocation");
  const modalYear = document.getElementById("modalYear");
  const modalNotes = document.getElementById("modalNotes"); // may be null
  const modalLayout = document.querySelector(".modal-layout"); // ✅ add this

  // How many images are shown at once
  const SHOWN_COUNT = 20;

  // For "bring to front" on hover / drag
  const MAX_CARD_Z = 9000;
  let globalZCounter = 1000;
  function bringCardToFront(card) {
    globalZCounter = Math.min(globalZCounter + 1, MAX_CARD_Z);
    card.style.zIndex = String(globalZCounter);
  }

  // Global flag: (currently only used inside drag)
  let dragMoved = false;

  if (!Array.isArray(graffitiData)) {
    console.error("graffitiData is not defined or not an array. Check data.js.");
    return;
  }

  // Utility: shuffle copy of array
  function shuffledCopy(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// Biased toward the middle of [min, max]
function randCentered(min, max) {
  // average of two uniforms → triangle distribution peaking in the middle
  const r = (Math.random() + Math.random()) / 2;
  return min + (max - min) * r;
}

  function createTagPill(text) {
    const span = document.createElement("span");
    span.textContent = text;
    return span;
  }

  // Make each card individually draggable
  function makeCardDraggable(card) {
    let isDraggingCard = false;
    let startMouseX = 0;
    let startMouseY = 0;
    let startLeft = 0;
    let startTop = 0;

    function onMouseDown(evt) {
      if (evt.button !== 0) return; // left button only

      isDraggingCard = true;
      dragMoved = false;

      const cardRect = card.getBoundingClientRect();
      const parentRect = collageEl.getBoundingClientRect();

      // Convert initial % position into px so dragging is smooth
      startLeft = cardRect.left - parentRect.left;
      startTop = cardRect.top - parentRect.top;
      card.style.left = startLeft + "px";
      card.style.top = startTop + "px";

      startMouseX = evt.clientX;
      startMouseY = evt.clientY;

      // Bring this card to the very front when you grab it
      bringCardToFront(card);

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      evt.preventDefault();
    }

    function onMouseMove(evt) {
      if (!isDraggingCard) return;

      const dx = evt.clientX - startMouseX;
      const dy = evt.clientY - startMouseY;

      if (!dragMoved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        dragMoved = true;
      }

      const newLeft = startLeft + dx;
      const newTop = startTop + dy;

      card.style.left = newLeft + "px";
      card.style.top = newTop + "px";
    }

    function onMouseUp() {
      if (!isDraggingCard) return;
      isDraggingCard = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    card.addEventListener("mousedown", onMouseDown);
  }

  function renderCollage() {
    collageEl.innerHTML = "";

    const shuffled = shuffledCopy(graffitiData);
    const selected = shuffled.slice(0, Math.min(SHOWN_COUNT, shuffled.length));

    selected.forEach((item) => {
      const card = document.createElement("article");
      card.className = "thumb";
      card.dataset.id = String(item.id);
      card.setAttribute(
        "aria-label",
        `${item.messageText || "Graffiti"} – ${item.city}`
      );

// Random size based on viewport width
const widthVw = rand(14, 26); // between 14vw and 26vw
const aspect = rand(0.7, 1.1); // some vertical, some more square-ish
const heightVw = widthVw * aspect;

// Layout: keep pieces mostly inside and away from the very bottom
const SAFE_LEFT = 2;    // % margin from left
const SAFE_RIGHT = 2;   // % margin from right
const SAFE_TOP = -5;     // % margin from top
const SAFE_BOTTOM = 50; // % margin from bottom (bigger = higher up)

// horizontal range (account for width so it doesn't go off the right edge)
let maxLeft = 100 - SAFE_RIGHT - widthVw;
if (maxLeft < SAFE_LEFT) maxLeft = SAFE_LEFT;
const leftPercent = rand(SAFE_LEFT, maxLeft);

// vertical range: just keep them higher so they don't hug the bottom
const maxTop = 100 - SAFE_BOTTOM;
const topPercent = rand(SAFE_TOP, maxTop);


      const rotationDeg = rand(-14, 14);
      const baseZ = Math.floor(rand(1, 300));

      card.style.width = widthVw + "vw";
      card.style.height = heightVw + "vw";
      card.style.top = topPercent + "%";
      card.style.left = leftPercent + "%";
      card.style.setProperty("--base-rotate", rotationDeg + "deg");
      card.style.zIndex = String(baseZ);
      card.dataset.baseZ = String(baseZ);

      const img = document.createElement("img");
      img.className = "thumb-img";
      img.src = encodeURI(item.imageUrl);
      img.alt = item.messageText || `Graffiti in ${item.city}`;

      card.appendChild(img);
      collageEl.appendChild(card);

      // make each photo draggable
      makeCardDraggable(card);
    });
  }

  // ---------- Modal ----------

    function openModal(item) {
    // Clear previous orientation classes
    if (modalLayout) {
      modalLayout.classList.remove("layout-landscape", "layout-portrait");
    }

    // Set up onload handler to detect orientation
    if (modalImage) {
      modalImage.onload = () => {
        if (!modalLayout) return;
        const w = modalImage.naturalWidth;
        const h = modalImage.naturalHeight;
        if (w && h) {
          const isLandscape = w >= h;
          if (isLandscape) {
            modalLayout.classList.add("layout-landscape");
          } else {
            modalLayout.classList.add("layout-portrait");
          }
        }
      };
      modalImage.src = item.imageUrl; // trigger load (and thus onload)
      modalImage.alt = item.messageText || `Graffiti in ${item.city}`;
    }

    modalTitle.innerHTML = item.messageText || "(untitled)";
    // ✅ archive와 동일하게: 도시만 표시 (environment 제거)
    modalCity.textContent = (item.city || "").toUpperCase();

    // ✅ archive와 동일하게: messageType / doodleType / theme(여러개 가능)
    modalTags.innerHTML = "";
    if (item.messageType) modalTags.appendChild(createTagPill(item.messageType));
    if (item.doodleType) modalTags.appendChild(createTagPill(item.doodleType));
    const themes = Array.isArray(item.theme) ? item.theme : (item.theme ? [item.theme] : []);
    themes.forEach((t) => t && modalTags.appendChild(createTagPill(t)));

    // ✅ placeholder 문구 제거 (원하면 data.js에 description 넣어서 사용 가능)
    if (modalDescription) modalDescription.textContent = item.description || "";

    modalLocation.textContent = item.locationLabel || "Unknown / not recorded";
    modalYear.textContent = item.year ? String(item.year) : "Unknown";

    // index.html에서 Notes를 제거했을 수 있으니, 있어도 안전하게만 처리
    if (modalNotes) modalNotes.textContent = item.notes || "";

    modalEl.classList.add("is-open");
  }


  function closeModal() {
    modalEl.classList.remove("is-open");
  }

  // ---------- Hover: bring hovered image to the front ----------

  collageEl.addEventListener("mouseover", (evt) => {
    const card = evt.target.closest(".thumb");
    if (!card || !collageEl.contains(card)) return;
    bringCardToFront(card);
  });

  // ---------- Click → open modal ----------

// ---------- Click → open modal ----------

collageEl.addEventListener("click", (evt) => {
  // If the last interaction was a drag, ignore this click
  if (dragMoved) {
    dragMoved = false;          // reset for the next real click
    return;
  }

  const card = evt.target.closest(".thumb");
  if (!card) return;

  const id = card.dataset.id;
  let item = null;

  // 1) Try matching by id (string vs number safe)
  if (id) {
    item = graffitiData.find((g) => String(g.id) === String(id));
  }

  // 2) Fallback: match by imageUrl if for some reason id failed
  if (!item) {
    const clickedSrc = card.querySelector("img")?.getAttribute("src");
    if (clickedSrc) {
      item = graffitiData.find((g) => g.imageUrl === clickedSrc);
    }
  }

  if (item) {
    openModal(item);
  } else {
    console.warn("No matching item found for clicked card", { id });
  }
});


  // ---------- Modal close handlers ----------

  modalEl.addEventListener("click", (evt) => {
    const closeTarget = evt.target.closest("[data-close-modal]");
    if (closeTarget) closeModal();
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" && modalEl.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Initial render: new random chaotic layout each reload
  renderCollage();

  // Refresh button → re-randomize collage
  const refreshBtn = document.getElementById("refreshButton");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      renderCollage();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }
});
