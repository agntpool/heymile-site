// HeyMile's only script. On a wide screen it pins one phone and swaps its
// screen as each feature scrolls past. It also shows a button that pauses the
// looping Lock Screen animation. Without it, every feature simply shows its
// own phone, so nothing here is needed to read the page.
(() => {
  const pauses = [...document.querySelectorAll(".pause")];
  pauses.forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", () => {
      const paused = document.documentElement.classList.toggle("paused");
      pauses.forEach((b) => b.setAttribute("aria-pressed", String(paused)));
    });
  });

  const showcase = document.querySelector(".showcase");
  if (!showcase || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js");

  const steps = [...showcase.querySelectorAll(".step")];
  const watcher = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          showcase.dataset.step = String(steps.indexOf(entry.target));
        }
      }
    },
    // A step is "the current one" while it crosses the middle of the screen.
    { rootMargin: "-50% 0px -50% 0px" }
  );
  steps.forEach((step) => watcher.observe(step));
})();
