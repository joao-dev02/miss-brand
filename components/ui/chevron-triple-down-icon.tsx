import type { SVGProps } from "react";
export function ChevronTripleDownIcon({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        {[4, 10, 16].map((y, i) => (
          <path
            className={`chevron-indicator chevron-indicator-${i}`}
            key={y}
            d={`M5 ${y}l7 6 7-6`}
          />
        ))}
      </g>
    </svg>
  );
}
