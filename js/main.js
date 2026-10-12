// Header kleurt mee bij scrollen
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menu openen/sluiten
const toggle = document.querySelector(".menu-toggle");
const setMenu = (open) => {
  document.body.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
};
toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
document.querySelectorAll(".menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

// Reviews-slider
document.querySelectorAll(".slider").forEach((slider) => {
  const track = slider.querySelector(".slider__track");
  const slides = [...track.children];
  const dots = slider.querySelector(".slider__dots");

  const perView = () => Math.max(1, Math.round(track.clientWidth / slides[0].offsetWidth));
  const pageCount = () => Math.ceil(slides.length / perView());
  const current = () => Math.round(track.scrollLeft / track.clientWidth);
  const goTo = (i) => {
    const n = pageCount();
    const page = ((i % n) + n) % n;
    track.scrollTo({ left: slides[page * perView()].offsetLeft - track.offsetLeft });
  };

  const renderDots = () => {
    dots.innerHTML = "";
    for (let i = 0; i < pageCount(); i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Ga naar review-pagina ${i + 1}`);
      b.addEventListener("click", () => goTo(i));
      dots.append(b);
    }
    markDot();
  };
  const markDot = () => {
    [...dots.children].forEach((d, i) => d.setAttribute("aria-current", String(i === current())));
  };

  slider.querySelector("[data-prev]").addEventListener("click", () => goTo(current() - 1));
  slider.querySelector("[data-next]").addEventListener("click", () => goTo(current() + 1));
  track.addEventListener("scroll", () => requestAnimationFrame(markDot), { passive: true });
  window.addEventListener("resize", renderDots);
  renderDots();
});

// Jaartal in footer
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
