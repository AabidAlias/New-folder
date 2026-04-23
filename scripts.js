/* ============================================================
   SAPTHAGIRI NPS UNIVERSITY — HRD DEPARTMENT
   script.js
   ============================================================ */

"use strict";

// ─────────────────────────────────────────────
// 1. DOM READY
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHamburger();
  initSidebar();
  initMobileSidebar();
  initBackToTop();
  initScrollSpy();
  initFadeInAnimations();
});

// ─────────────────────────────────────────────
// 2. HEADER — Shrink on Scroll
// ─────────────────────────────────────────────
function initHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

// ─────────────────────────────────────────────
// 3. HAMBURGER — Mobile Nav Toggle
// ─────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("mainNav");
  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);

    // Animate hamburger spans
    const spans = hamburger.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  // Close nav on outside click
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.querySelectorAll("span").forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "";
      });
    }
  });
}

// ─────────────────────────────────────────────
// 4. SIDEBAR — Active Link Highlight on Scroll
// ─────────────────────────────────────────────
function initSidebar() {
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const sections = document.querySelectorAll("section[id]");
  if (!sidebarLinks.length || !sections.length) return;

  const OFFSET = 120;

  const activateLink = () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - OFFSET;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    sidebarLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", activateLink, { passive: true });
  activateLink(); // run on load
}

// ─────────────────────────────────────────────
// 5. MOBILE SIDEBAR — Toggle
// ─────────────────────────────────────────────
function initMobileSidebar() {
  const toggle = document.getElementById("mobileSidebarToggle");
  const inner = document.getElementById("sidebarInner");
  if (!toggle || !inner) return;

  toggle.addEventListener("click", () => {
    inner.classList.toggle("open");
    const isOpen = inner.classList.contains("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Close sidebar when a link is clicked (mobile)
  inner.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 900) {
        inner.classList.remove("open");
      }
    });
  });
}

// ─────────────────────────────────────────────
// 6. BACK TO TOP
// ─────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ─────────────────────────────────────────────
// 7. SCROLL SPY — Smooth Scrolling for Anchor Links
// ─────────────────────────────────────────────
function initScrollSpy() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const OFFSET = 90; // header height
      const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

// ─────────────────────────────────────────────
// 8. FADE-IN ANIMATIONS — Intersection Observer
// ─────────────────────────────────────────────
function initFadeInAnimations() {
  // Add fade-in-up class to animatable elements
  const animatables = [
    ".pillar-card",
    ".award-card",
    ".vm-block",
    ".chro-card",
    ".collab-card",
    ".contact-item",
    ".gallery-item",
    ".recruiter-logo-item",
    ".value-chip",
  ];

  animatables.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add("fade-in-up");
      el.style.transitionDelay = `${(index % 4) * 80}ms`;
    });
  });

  // Add to section headers too
  document.querySelectorAll(".section-header-center, .section-text, .core-values-card").forEach((el) => {
    el.classList.add("fade-in-up");
  });

  // Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-in-up").forEach((el) => {
    observer.observe(el);
  });
}

// ─────────────────────────────────────────────
// 9. STATS COUNTER ANIMATION (future use)
// ─────────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);
  if (isNaN(target)) return;

  const duration = 1800;
  const start = performance.now();

  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

// Observe stat counters when they enter viewport
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll("[data-target]").forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stats-section").forEach((el) => {
  counterObserver.observe(el);
});

// ─────────────────────────────────────────────
// 10. COLLAB CAROUSEL — Pause on hover (CSS handles animation;
//     this adds touch-drag support for mobile)
// ─────────────────────────────────────────────
(function initTouchDragCollab() {
  const track = document.getElementById("collabTrack");
  if (!track) return;

  let startX = 0;
  let startScroll = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.animationPlayState = "paused";
  }, { passive: true });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dx = startX - e.touches[0].clientX;
    track.parentElement.scrollLeft += dx;
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", () => {
    isDragging = false;
    track.style.animationPlayState = "running";
  });
})();

// ─────────────────────────────────────────────
// 11. GALLERY — Lightbox / Photo View Placeholder
//     (Attach real image src to .gallery-placeholder when available)
// ─────────────────────────────────────────────
(function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Future: open lightbox with full-size image
      // For now the overlay with "See Photos" link handles this
    });
  });
})();