// Theme toggle (remembers the choice)
const btn = document.getElementById("theme-toggle");
const root = document.documentElement;

try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) {}

btn.addEventListener("click", () => {
  const isDark =
    root.getAttribute("data-theme") === "dark" ||
    (!root.getAttribute("data-theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const next = isDark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Highlight the menu link of the section you are viewing
const links = document.querySelectorAll("nav a[href^='#']");
const sections = document.querySelectorAll("section[id], footer[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove("active"));
        const active = document.querySelector(
          `nav a[href="#${entry.target.id}"]`
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((s) => observer.observe(s));
