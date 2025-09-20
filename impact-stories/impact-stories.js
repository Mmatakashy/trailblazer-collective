const container = document.querySelector(".testimonials-container");
const cards = document.querySelectorAll(".testimonial-card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function showTestimonial(i) {
  container.style.transform = `translateX(-${i * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % cards.length;
  showTestimonial(index);
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + cards.length) % cards.length;
  showTestimonial(index);
});

// Album Lightbox with support for double images
(function () {
  const gallery = document.querySelectorAll("#about-album .album-cell img");
  const lightbox = document.getElementById("album-lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCaption = document.getElementById("lb-caption");
  const btnClose = lightbox.querySelector(".lb-close");
  const btnNext = lightbox.querySelector(".lb-next");
  const btnPrev = lightbox.querySelector(".lb-prev");

  let images = Array.from(gallery);
  let currentIndex = -1;

  function openAt(index) {
    if (index < 0 || index >= images.length) return;
    const img = images[index];
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    const fig = img.closest("figure");
    lbCaption.textContent = fig.dataset.caption || fig.querySelector("figcaption").innerText;
    currentIndex = index;
    lightbox.setAttribute("aria-hidden", "false");
  }

  function close() {
    lightbox.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    currentIndex = -1;
  }

  function next() {
    openAt((currentIndex + 1) % images.length);
  }

  function prev() {
    openAt((currentIndex - 1 + images.length) % images.length);
  }

  // Open lightbox when clicking any image
  images.forEach((img, i) => {
    img.addEventListener("click", () => openAt(i));
  });

  // Buttons
  btnClose.addEventListener("click", close);
  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (lightbox.getAttribute("aria-hidden") === "false") {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
  });
})();
