// archive.js – hover = background preview, click = modal popup at top

document.addEventListener("DOMContentLoaded", () => {
  if (!Array.isArray(graffitiData)) {
    console.error("graffitiData is not defined or not an array. Check data.js.");
    return;
  }

  const tableBody = document.getElementById("archiveTableBody");
  const totalCountSpan = document.getElementById("archiveTotalCount");

  const filterCity = document.getElementById("filterCity");
  const filterMessageType = document.getElementById("filterMessageType");
  const filterDoodleType = document.getElementById("filterDoodleType");
  const filterTheme = document.getElementById("filterTheme"); // ⭐ NEW

  // Modal elements
  const modalEl = document.getElementById("detailModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCity = document.getElementById("modalCity");
  const modalTags = document.getElementById("modalTags");
  const modalDescription = document.getElementById("modalDescription");
  const modalLocation = document.getElementById("modalLocation");
  const modalYear = document.getElementById("modalYear");
  //const modalNotes = document.getElementById("modalNotes");
  const modalLayout = document.querySelector(".modal-layout");

  totalCountSpan.textContent = graffitiData.length.toString();

  function uniqueValues(key) {
  const set = new Set();
  graffitiData.forEach((item) => {
    const v = item[key];
    if (!v) return;

    if (key === "theme") {
      (Array.isArray(v) ? v : [v]).forEach(t => t && set.add(t));
    } else {
      set.add(v);
    }
  });
  return Array.from(set).sort();
}

  function populateFilterOptions(selectEl, values) {
    values.forEach((val) => {
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = val;
      selectEl.appendChild(opt);
    });
  }

  // Populate dropdowns
  populateFilterOptions(filterCity,          uniqueValues("city"));
  populateFilterOptions(filterMessageType,   uniqueValues("messageType"));
  populateFilterOptions(filterDoodleType,    uniqueValues("doodleType"));
  if (filterTheme) {
    populateFilterOptions(filterTheme,       uniqueValues("theme")); // ⭐ NEW
  }

  function applyFilters() {
    const cityVal   = filterCity.value;
    const msgVal    = filterMessageType.value;
    const doodleVal = filterDoodleType.value;
    const themeVal  = filterTheme ? filterTheme.value : "all";

    return graffitiData.filter((item) => {
      if (cityVal !== "all"   && item.city        !== cityVal)   return false;
      if (msgVal !== "all"    && item.messageType !== msgVal)    return false;
      if (doodleVal !== "all" && item.doodleType  !== doodleVal) return false;
if (themeVal !== "all") {
  const themes = Array.isArray(item.theme) ? item.theme : [item.theme];
  if (!themes.includes(themeVal)) return false;
}
      return true;
    });
  }

  function setPreviewImage(url) {
    if (!url) {
      document.body.style.setProperty("--preview-url", "none");
      document.body.classList.remove("has-preview");
      return;
    }
    document.body.style.setProperty("--preview-url", `url("${url}")`);
    document.body.classList.add("has-preview");
  }

  function createTagPill(text) {
    const span = document.createElement("span");
    span.textContent = text;
    return span;
  }

  function openModal(item) {
    if (!modalEl) return;

    // ✅ 이전 orientation 클래스 제거
    if (modalLayout) {
      modalLayout.classList.remove("layout-landscape", "layout-portrait");
    }

    // ✅ 이미지 로드 후 가로/세로 비율 보고 클래스 붙이기
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

      // onload 설정해놓고 src 세팅해야 이벤트가 제대로 걸림
      modalImage.src = item.imageUrl;
      modalImage.alt = item.messageText || `Graffiti in ${item.city}`;
    }

    modalTitle.textContent = item.messageText || "(untitled)";
    // 실내/실외(environment) 필드 제거에 맞춰 도시만 표시
    modalCity.textContent = (item.city || "").toUpperCase();

    modalTags.innerHTML = "";
    if (item.messageType) modalTags.appendChild(createTagPill(item.messageType));
    if (item.doodleType)  modalTags.appendChild(createTagPill(item.doodleType));
    // theme은 배열/문자열 모두 지원
    if (item.theme) {
      const themes = Array.isArray(item.theme) ? item.theme : [item.theme];
      themes.filter(Boolean).forEach((t) => modalTags.appendChild(createTagPill(t)));
    }

    modalLocation.textContent = item.locationLabel || "";
    modalYear.textContent = item.year ? String(item.year) : "";

    // 내용(설명) 필드는 있으면 보여주고, 없으면 숨김
    const desc = (item.description || "").trim();
    if (modalDescription) {
      modalDescription.textContent = desc;
      modalDescription.style.display = desc ? "block" : "none";
    }
    //modalNotes.textContent = item.notes || "No additional notes.";

    modalEl.classList.add("is-open");
  }


  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove("is-open");
  }

  function attachHoverAndClickHandlers() {
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row) => {
      const id = row.dataset.id;

      row.addEventListener("mouseenter", () => {
        const item = graffitiData.find((g) => g.id === id);
        tableBody
          .querySelectorAll("tr")
          .forEach((r) => r.classList.remove("is-highlighted"));
        row.classList.add("is-highlighted");
        setPreviewImage(item ? item.imageUrl : null);
      });

      row.addEventListener("mouseleave", () => {
        row.classList.remove("is-highlighted");
        setPreviewImage(null);
      });

      // click → open modal with full-opacity image
      row.addEventListener("click", () => {
        const item = graffitiData.find((g) => g.id === id);
        if (item) {
          openModal(item);
        }
      });
    });
  }

  function renderTable() {
    const filtered = applyFilters();
    tableBody.innerHTML = "";

    filtered.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.dataset.id = item.id;

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.city}</td>
        <td>${item.messageText || "(untitled)"}</td>
        <td>${item.messageType || ""}</td>
        <td>${item.doodleType || ""}</td>
        <td>${item.locationLabel || ""}</td>
        <td>${item.year || ""}</td>
      `;

      tableBody.appendChild(tr);
    });

    attachHoverAndClickHandlers();
  }

  // Listen for filter changes
  [
    filterCity,
    filterMessageType,
    filterDoodleType,
    filterTheme, // ⭐ NEW
  ].forEach((select) => {
    if (!select) return;
    select.addEventListener("change", () => {
      renderTable();
    });
  });

  // Modal close interactions
  if (modalEl) {
    modalEl.addEventListener("click", (evt) => {
      const closeTarget = evt.target.closest("[data-close-modal]");
      if (closeTarget) closeModal();
    });

    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape" && modalEl.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  // Initial render
  renderTable();
});
