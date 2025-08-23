// Scroll Reveal effect
window.addEventListener("scroll", () => {
  const reveals = document.querySelectorAll(".reveal");
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
});

// Initial load trigger
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => el.classList.add("active"));
});
