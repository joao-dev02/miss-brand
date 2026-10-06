"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);

    return () => {
      preference.removeEventListener("change", updatePreference);
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
        anchors: { offset: -95, immediate: reducedMotion },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
