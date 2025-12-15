// stories.js
// Stories / 이야기 페이지 로직

// 🔹 여기에 스토리 메타데이터 정의
//   themeName 은 나중에 data.js의 theme 값이랑 맞춰주면 됨.
const STORY_CONFIG = [
  {
    id: "fat-letters",
    categoryLabel: "첫번째 이야기",
    themeName: "뚱뚱글자",
    title: "뚱뚱글자",
    subtitle: "두꺼운 획에 숨겨진, 말의 체중",
    paragraphs: [
      "길에서 만난 뚱뚱한 글자들은 대부분 서툰 손에서 나왔다. 더 정교하고 예쁜 글씨도 많았지만, 이상하게도 삐뚤빼뚤하고 둔탁한 획이 더 오래 눈에 남았다.",
      "이 낙서들을 따라 걸을 때, 글쓴이의 호흡과 몸짓을 상상하게 된다. 서둘러 쓴 글자, 힘주어 눌러 쓴 획, 망설이다 지워버린 흔적들.",
      "그래피티를 기록하는 일은 예쁜 이미지를 수집하는 작업이 아니라, 이런 어설픈 말들까지 함께 끌고 가는 일에 가까웠다."
    ]
  },
  {
    id: "dead-pigeon",
    categoryLabel: "두번째 이야기",
    themeName: "괴사한 비둘기",
    title: "괴사한 비둘기",
    subtitle: "도시의 사각지대에서 발견한 몸",
    paragraphs: [
      "지하철 출구 옆, 아무도 오래 서 있지 않는 모서리에서 괴사한 비둘기를 처음 보았다. 누군가는 그 위에 말을 얹어두었고, 낙서는 시체의 캡션처럼 기능했다.",
      "사진을 찍는 순간, 내가 그 장면을 더 오래 머물게 만드는 공범처럼 느껴졌다. 그래도 카메라를 내릴 수 없었던 것은, 이 도시에 남겨진 책임 없는 시선들을 기록해 두고 싶어서였다.",
      "괴사한 비둘기 옆에 적힌 말들은 대부분 가벼웠다. 농담인지 욕인지 애매한 문장들 사이에서, 무엇이 진짜 무거운 것인지 자꾸 헷갈렸다."
    ]
  },
  {
    id: "kids-these-days",
    categoryLabel: "세번째 이야기",
    themeName: "요즘 아이들",
    title: "요즘 아이들",
    subtitle: "놀이터 난간에서 열린 작은 포럼",
    paragraphs: [
      "성현동아아파트 놀이터 난간에는 뜻밖에도 '요즘 애들'에 대한 긴 토론이 펼쳐져 있었다. 초등학생의 글씨와 어른의 문장을 구분하기 어려울 정도로 뒤섞여 있었다.",
      "누군가는 친구를 칭찬하고, 누군가는 선생님을 욕하고, 또 다른 누군가는 이유 없이 하트를 그려놓고 떠났다. 이 모든 레이어가 한 철제 난간에 겹쳐 붙어 있었다.",
      "놀이터의 그래피티를 따라 찍으며, 어쩌면 '요즘 아이들'이라는 말은 항상 어른들이 자기 시대를 방어하기 위해 만드는 허상일지도 모르겠다는 생각을 했다."
    ]
  },
  {
    id: "clothing-bin",
    categoryLabel: "네번째 이야기",
    themeName: "의류수거함",
    title: "의류수거함",
    subtitle: "버려진 옷과 버티는 문장들",
    paragraphs: [
      "의류수거함은 늘 건물과 건물 사이에 끼어 있었다. 재활용이라는 이름을 달고 있지만, 사실은 '당장 필요 없어진 것들'이 모이는 장소였다.",
      "낙서들은 그 위에 다시 말을 걸었다. '남의 옷 뒤적이지 마라', '이 안에 사람 있다' 같은 문장들은 농담처럼 보이지만 묘하게 불편했다.",
      "버려진 옷들이 어디로 가는지 알 수 없듯, 이 문장들을 쓴 사람들 역시 어디로 흘러가 버렸을까. 수거함은 물건을 모으지만, 동시에 이야기를 흩뜨려 놓고 있었다."
    ]
  },
  {
    id: "brick-wall",
    categoryLabel: "다섯번째 이야기",
    themeName: "벽돌벽",
    title: "벽돌벽",
    subtitle: "단단한 벽 위에 겹겹이 쌓인 말들",
    paragraphs: [
      "벽돌벽은 도시에서 가장 오래된 노트 같다. 정해진 줄도, 규칙적인 여백도 없지만, 이미 수많은 말들이 쓰였다 지워지고 또 다시 쓰였다.",
      "벽의 울퉁불퉁한 표면 때문에 글자는 늘 조금씩 일그러졌다. 그럼에도 사람들은 굳이 이 자리를 골라 자신의 말을 남긴다.",
      "벽돌 사이의 틈을 따라 시선이 움직일 때, 나는 마치 책장을 넘기듯 이 도시의 뒷면을 읽고 있는 기분이 들었다."
    ]
  },
  {
    id: "construction-wall",
    categoryLabel: "여섯번째 이야기",
    themeName: "공사장 가벽",
    title: "공사장 가벽",
    subtitle: "잠시 생겼다가 사라지는 임시의 표면",
    paragraphs: [
      "공사장 가벽은 일시적인 것들을 위한 캔버스였다. 며칠 뒤면 사라질 것을 알면서도, 사람들은 그 위에 정치적 구호와 사랑 고백과 하찮은 낙서를 남겼다.",
      "나는 그 임시성을 좋아했다. 기록하지 않으면 금방 지워질 것들을 따라다니며, 카메라 셔터가 일종의 '연장된 임시성'을 만들어 준다고 믿고 싶었다.",
      "가벽이 철거되고 나면 이 사진들만이 그 자리를 증언한다. 그때의 소음, 먼지, 그리고 가볍게 뿌려진 스프레이 냄새까지."
    ]
  },
  {
    id: "self-checkout",
    categoryLabel: "일곱번째 이야기",
    themeName: "무인정산기",
    title: "무인정산기",
    subtitle: "자동화된 친절, 그 앞에서 멈칫하는 손",
    paragraphs: [
      "무인정산기는 늘 '빠르고 간편함'을 약속한다. 그런데 그 앞에 서면 사람은 이상하게 더 천천히 움직인다.",
      "터치스크린의 안내문, 삐- 하는 소리, 다시 입력하라는 문장들. 작은 실수가 곧바로 '사용자'의 책임이 되는 구조가 드러난다.",
      "그 표면에 남겨진 낙서들은, 시스템의 말투를 흉내 내거나 비틀면서 '누가 누구를 정산하는가'를 되묻는다."
    ]
  },
  {
    id: "ttareungi",
    categoryLabel: "여덟번째 이야기",
    themeName: "따릉이",
    title: "따릉이",
    subtitle: "도시의 공유 이동수단에 붙는 사소한 코멘트",
    paragraphs: [
      "따릉이는 어디에나 있지만, 같은 자리에 오래 있지 않는다. 그래서 그 표면에 적힌 말도 늘 '잠깐' 머물다 지나간다.",
      "안장 아래, 프레임 옆, 대여소 기둥—사람들은 짧게 남길 수 있는 만큼만 남긴다. 욕, 응원, 약속, 그리고 아무 의미 없는 기호까지.",
      "이동을 위한 도구에 남겨진 낙서를 모으다 보면, 도시의 리듬이 문장으로 바뀌는 순간을 본다."
    ]
  }
];
// overview 상태에서 사용할 기본 텍스트
const DEFAULT_STRIP = {
  title: "Stories",
  subtitle:
    "아카이브한 낙서를 모아 여덟가지 이야기를 엮었습니다.",
  paragraphs: [
    "도시 곳곳에 남은 말들은 늘 완성된 문장이라기보다, 중간에 멈춘 메모처럼 보였다. 누군가는 사랑을 고백하다가, 누군가는 욕설을 쓰다가, 또 누군가는 아무 말도 남기지 못하고 선만 그어두고 떠난다.",
    "이 프로젝트는 그런 말들의 반쯤 남은 형태를 따라가며, 그 주변의 공간과 상황을 함께 기록해 보는 시도다. 사진을 찍는 일은 낙서를 보존하는 행위이면서도, 동시에 그것을 다른 시간대로 옮겨버리는 일이다.",
    "각 스토리는 하나의 테마를 중심으로 모아졌지만, 결국 서로 연결된 하나의 산책처럼 이어진다. 사라질 것처럼 보였던 말들이 사진 속에서 어떻게 계속 머무를 수 있는지 지켜보고 싶었다."
  ]
};


// helper: 특정 themeName에 해당하는 graffitiData 이미지들 가져오기
function getImagesForTheme(themeName) {
  if (!Array.isArray(graffitiData)) return [];

  return graffitiData.filter((item) => {
    const themes = Array.isArray(item.theme) ? item.theme : [item.theme];
    return themes.includes(themeName);
  });
}

document.addEventListener("DOMContentLoaded", () => {
      // ✅ Modal elements (same IDs as archive/home)
  const modalEl = document.getElementById("detailModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCity = document.getElementById("modalCity");
  const modalTags = document.getElementById("modalTags");
  const modalDescription = document.getElementById("modalDescription");
  const modalLocation = document.getElementById("modalLocation");
  const modalYear = document.getElementById("modalYear");
  const modalLayout = document.querySelector(".modal-layout");

  const overviewSection = document.getElementById("storiesOverview");
  const overviewGrid = overviewSection.querySelector(".stories-grid");

  const detailSection = document.getElementById("storyDetail");
  const detailImagesGrid = document.getElementById("detailImagesGrid");
  const backButton = document.getElementById("storyBackButton");

  // 🔹 하단 텍스트 스트립 요소들
  const stripKicker = document.getElementById("stripKicker");
  const stripTitle = document.getElementById("stripTitle");
  const stripSubtitle = document.getElementById("storyStripSubtitle");

  const storyText1 = document.getElementById("storyText1");
  const storyText2 = document.getElementById("storyText2");
  const storyText3 = document.getElementById("storyText3");

    function createTagPill(text) {
    const span = document.createElement("span");
    span.textContent = text;
    return span;
  }

  function openModal(item) {
    if (!modalEl) return;

    if (modalLayout) modalLayout.classList.remove("layout-landscape", "layout-portrait");

    if (modalImage) {
      modalImage.onload = () => {
        if (!modalLayout) return;
        const w = modalImage.naturalWidth;
        const h = modalImage.naturalHeight;
        if (w && h) modalLayout.classList.add(w >= h ? "layout-landscape" : "layout-portrait");
      };
      modalImage.src = item.imageUrl;
      modalImage.alt = item.messageText || "";
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
    modalDescription.textContent = item.description || "";
    modalLocation.textContent = item.locationLabel || "Unknown / not recorded";
    modalYear.textContent = item.year ? String(item.year) : "Unknown";

    modalEl.classList.add("is-open");
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove("is-open");
  }

  // close interactions
  if (modalEl) {
    modalEl.addEventListener("click", (evt) => {
      const closeTarget = evt.target.closest("[data-close-modal]");
      if (closeTarget) closeModal();
    });

    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape" && modalEl.classList.contains("is-open")) closeModal();
    });
  }


    function setStripToDefault() {
    stripKicker.textContent = DEFAULT_STRIP.kicker;
    stripTitle.textContent = DEFAULT_STRIP.title;
    stripSubtitle.textContent = DEFAULT_STRIP.subtitle;

    storyText1.textContent = DEFAULT_STRIP.paragraphs[0];
    storyText2.textContent = DEFAULT_STRIP.paragraphs[1];
    storyText3.textContent = DEFAULT_STRIP.paragraphs[2];
  }

  setStripToDefault();


  // 1) Overview: 카드 렌더링
  STORY_CONFIG.forEach((story) => {
    const images = getImagesForTheme(story.themeName);
    const previewImages = images.slice(0, 3); // 겹쳐 보일 3장

    const card = document.createElement("button");
    card.type = "button";
    card.className = "story-card";
    card.setAttribute("data-story-id", story.id);

    const stack = document.createElement("div");
    stack.className = "story-card-stack";

    previewImages.forEach((imgData, idx) => {
      const imgWrap = document.createElement("div");
      imgWrap.className = `story-stack-img story-stack-img-${idx + 1}`;

      const img = document.createElement("img");
      img.src = imgData.imageUrl;
      img.alt = imgData.messageText || "";

      imgWrap.appendChild(img);
      stack.appendChild(imgWrap);
    });

    const labelWrap = document.createElement("div");
    labelWrap.className = "story-card-label";

    const small = document.createElement("p");
    small.className = "story-card-category";
    small.textContent = story.categoryLabel;

    const title = document.createElement("h3");
    title.className = "story-card-title";
    title.textContent = story.title;

    labelWrap.appendChild(small);
    labelWrap.appendChild(title);

    card.appendChild(stack);
    card.appendChild(labelWrap);

    card.addEventListener("click", () => openStory(story));

    overviewGrid.appendChild(card);
  });

  // 2) Detail view 열기
    function openStory(story) {
    const images = getImagesForTheme(story.themeName);

    // 🔹 하단 텍스트 스트립을 이 스토리 정보로 교체
    stripKicker.textContent = story.categoryLabel;
    stripTitle.textContent = story.title;
    stripSubtitle.textContent = story.subtitle;

    storyText1.textContent = story.paragraphs[0] || "";
    storyText2.textContent = story.paragraphs[1] || "";
    storyText3.textContent = story.paragraphs[2] || "";

    // 이미지 그리드 비우고 다시 채우기 (기존 로직 그대로)
    detailImagesGrid.innerHTML = "";
    images.forEach((imgData) => {
      const cell = document.createElement("figure");
      cell.className = "story-image-cell";

        const img = document.createElement("img");
        img.src = imgData.imageUrl;
        img.alt = imgData.messageText || "";
        img.addEventListener("click", () => openModal(imgData));


      cell.appendChild(img);
      detailImagesGrid.appendChild(cell);
    });

    // 🔹 부드러운 전환 (overview → detail)
    overviewSection.classList.remove("is-visible");
    overviewSection.classList.add("is-hidden");

    detailSection.classList.remove("is-hidden");
    detailSection.classList.add("is-visible");
  }


  // 3) 뒤로가기 버튼
  backButton.addEventListener("click", () => {
    detailSection.classList.remove("is-visible");
    detailSection.classList.add("is-hidden");

    overviewSection.classList.remove("is-hidden");
    overviewSection.classList.add("is-visible");

    // 🔹 하단 텍스트를 다시 overview 기본 설명으로
    setStripToDefault();
  });
});
