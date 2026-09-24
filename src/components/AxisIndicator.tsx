import { useEffect, useRef } from "react";
import { ScrollTrigger } from "../lib/gsap";

const ROT: Record<string, number> = { x: 0, y: 90, up: -90, left: 180 };
const NAME: Record<string, string> = {
  x: "HORIZONTAL — X",
  y: "VERTICAL — Y",
  up: "REVERSE — UP",
  left: "HORIZONTAL — LEFT",
};

export default function AxisIndicator() {
  const arrow = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-axis]"),
    );
    let current = "";

    const set = (axis: string) => {
      if (axis === current) return;
      current = axis;
      if (label.current) label.current.textContent = NAME[axis] ?? NAME.y;
      if (arrow.current)
        arrow.current.style.transform = `rotate(${ROT[axis] ?? 90}deg)`;
    };
    set("y");

    const triggers = nodes.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) set(el.dataset.axis || "y");
        },
        invalidateOnRefresh: true,
      }),
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span
        ref={arrow}
        className="inline-flex text-vermilion transition-transform duration-700 ease-out"
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M3 12h17M14 6l6 6-6 6" />
        </svg>
      </span>
      <span ref={label} className="label text-ink">
        VERTICAL — Y
      </span>
    </div>
  );
}
