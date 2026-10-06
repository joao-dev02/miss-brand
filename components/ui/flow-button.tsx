"use client";
import type { ComponentPropsWithoutRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
type Common = { text?: string; tone?: "default" | "hero"; className?: string };
type Props = Common &
  (
    | ({ href: string } & ComponentPropsWithoutRef<"a">)
    | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
  );
export function FlowButton({
  text = "Modern Button",
  tone = "default",
  className,
  ...props
}: Props) {
  const content = (
    <>
      <ArrowRight aria-hidden="true" className="flow-arrow flow-arrow-left" />
      <span className="flow-text">{text}</span>
      <span aria-hidden="true" className="flow-circle" />
      <ArrowRight aria-hidden="true" className="flow-arrow flow-arrow-right" />
    </>
  );
  const classes = cn("flow-button", tone === "hero" && "flow-hero", className);
  if ("href" in props && typeof props.href === "string")
    return (
      <a {...(props as ComponentPropsWithoutRef<"a">)} className={classes}>
        {content}
      </a>
    );
  return (
    <button
      type="button"
      {...(props as ComponentPropsWithoutRef<"button">)}
      className={classes}
    >
      {content}
    </button>
  );
}
