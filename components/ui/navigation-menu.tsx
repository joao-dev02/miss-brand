"use client";
import * as React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
const navItems = [
  { name: "Início", href: "#inicio" },
  { name: "Inspirações", href: "#inspiracoes" },
  { name: "Essência", href: "#essencia" },
  { name: "Lojas", href: "#unidades" },
];
const EXPAND_SCROLL_THRESHOLD = 80;
const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const logoVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring", damping: 15 },
  },
  collapsed: {
    opacity: 0,
    x: -25,
    rotate: -180,
    transition: { duration: 0.3 },
  },
};
const itemVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", damping: 15 },
  },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};
const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 15, stiffness: 300, delay: 0.15 },
  },
};
export function AnimatedNavFramer() {
  const [isExpanded, setExpanded] = React.useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const lowestScrollY = React.useRef(0);
  const reducedMotion = useReducedMotion();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (latest <= 30) {
      setExpanded(true);
      lowestScrollY.current = latest;
    } else if (
      isExpanded &&
      latest > previous &&
      latest > 150 &&
      !document.querySelector(".animated-nav:focus-within")
    ) {
      setExpanded(false);
      lowestScrollY.current = latest;
    } else if (!isExpanded) {
      lowestScrollY.current = Math.max(lowestScrollY.current, latest);
      if (
        latest < previous &&
        lowestScrollY.current - latest > EXPAND_SCROLL_THRESHOLD
      )
        setExpanded(true);
    }
    lastScrollY.current = latest;
  });
  return (
    <div className="floating-nav-position">
      <motion.nav
        aria-label="Navegação principal"
        initial={reducedMotion ? false : { y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={reducedMotion ? undefined : containerVariants}
        style={
          reducedMotion ? { width: isExpanded ? "auto" : "3rem" } : undefined
        }
        whileHover={!isExpanded && !reducedMotion ? { scale: 1.1 } : {}}
        whileTap={!isExpanded && !reducedMotion ? { scale: 0.95 } : {}}
        className={cn("animated-nav", !isExpanded && "is-collapsed")}
      >
        <motion.a
          href="#inicio"
          aria-label="Miss Brand — início"
          variants={reducedMotion ? undefined : logoVariants}
          aria-hidden={!isExpanded}
          tabIndex={isExpanded ? 0 : -1}
          className="nav-monogram"
          style={reducedMotion && !isExpanded ? { opacity: 0 } : undefined}
        >
          <Image
            src="/miss-brand-logo-fast.webp"
            alt="Miss Brand"
            width={134}
            height={71}
          />
        </motion.a>
        <div
          id="navigation-links"
          className={cn(
            "animated-nav-links",
            !isExpanded && "nav-links-hidden",
          )}
          aria-hidden={!isExpanded}
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              variants={reducedMotion ? undefined : itemVariants}
              tabIndex={isExpanded ? 0 : -1}
              onClick={() => setExpanded(true)}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
        <motion.button
          type="button"
          variants={reducedMotion ? undefined : collapsedIconVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
          aria-label="Expandir navegação"
          aria-expanded={isExpanded}
          aria-controls="navigation-links"
          tabIndex={isExpanded ? -1 : 0}
          aria-hidden={isExpanded}
          className="nav-expand"
          style={{
            pointerEvents: isExpanded ? "none" : "auto",
            ...(reducedMotion ? { opacity: isExpanded ? 0 : 1 } : {}),
          }}
          onClick={() => {
            setExpanded(true);
            requestAnimationFrame(() =>
              document
                .querySelector<HTMLAnchorElement>("#navigation-links a")
                ?.focus(),
            );
          }}
        >
          <Menu size={23} aria-hidden="true" />
        </motion.button>
      </motion.nav>
    </div>
  );
}
