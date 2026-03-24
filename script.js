/* ── Resume site — vanilla JS enhancements ────────────────── */

(function () {
    "use strict";

    /**
     * Update the copyright year automatically.
     */
    function updateCopyrightYear() {
        const footer = document.querySelector("footer small");
        if (!footer) return;
        const year = new Date().getFullYear();
        footer.textContent = footer.textContent.replace(/\d{4}/, year);
    }

    /**
     * Gentle fade-in for main sections as they scroll into view.
     * Falls back gracefully when IntersectionObserver is unavailable.
     */
    function animateSections() {
        var sections = document.querySelectorAll("main section");

        if (!("IntersectionObserver" in window)) {
            sections.forEach(function (s) { s.classList.add("visible"); });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        sections.forEach(function (section) {
            section.classList.add("fade-in");
            observer.observe(section);
        });
    }

    /* ── Inject supporting CSS for animations ─────────────── */
    var style = document.createElement("style");
    style.textContent =
        "main section.fade-in{opacity:0;transform:translateY(1rem);transition:opacity .5s ease,transform .5s ease}" +
        "main section.fade-in.visible{opacity:1;transform:translateY(0)}";
    document.head.appendChild(style);

    /* ── Init ──────────────────────────────────────────────── */
    document.addEventListener("DOMContentLoaded", function () {
        updateCopyrightYear();
        animateSections();
    });
})();
