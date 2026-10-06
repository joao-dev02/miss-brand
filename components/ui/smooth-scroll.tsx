"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

function SectionAnchors({ reducedMotion }: { reducedMotion: boolean }) {
  const lenis = useLenis();

  useEffect(() => {
    const navigate = (hash: string, immediate = false) => {
      let id: string;
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        return false;
      }
      const target = document.getElementById(id);
      if (!target) return false;
      // These markers stay in normal flow while the panels are pinned.
      const marker = target.previousElementSibling;
      const origin = marker?.hasAttribute("data-section-anchor")
        ? marker
        : target;
      const top = origin.getBoundingClientRect().top + window.scrollY - 95;
      if (lenis)
        lenis.scrollTo(Math.max(0, top), {
          immediate: immediate || reducedMotion,
        });
      else
        window.scrollTo({
          top: Math.max(0, top),
          behavior: immediate || reducedMotion ? "instant" : "smooth",
        });
      return true;
    };
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
          : null;
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#" || !navigate(hash)) return;
      event.preventDefault();
      if (location.hash !== hash) history.pushState(null, "", hash);
      if (hash === "#conteudo")
        document.getElementById("conteudo")?.focus({ preventScroll: true });
    };
    const onHashChange = () => {
      if (location.hash) navigate(location.hash, true);
    };
    const frame = requestAnimationFrame(onHashChange);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, [lenis, reducedMotion]);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section"),
    );
    const updateSections = () =>
      sections.forEach((section, index) => {
        section.style.setProperty(
          "--stack-top",
          `${Math.min(0, window.innerHeight - section.offsetHeight)}px`,
        );
        section.style.setProperty("--stack-order", String(index + 1));
      });
    const observer = new ResizeObserver(updateSections);
    sections.forEach((section) => observer.observe(section));
    updateSections();
    window.addEventListener("resize", updateSections);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSections);
      preference.removeEventListener("change", updatePreference);
      sections.forEach((section) => {
        section.style.removeProperty("--stack-top");
        section.style.removeProperty("--stack-order");
      });
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: !reducedMotion,
        syncTouch: false,
        anchors: false,
      }}
    >
      <SectionAnchors reducedMotion={reducedMotion} />
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
