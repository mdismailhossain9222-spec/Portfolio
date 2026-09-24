import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import AxisIndicator from "./AxisIndicator";

export default function TopBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
    });
    return () => st.kill();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/15 bg-paper/85 backdrop-blur-[6px]">
      <div className="mx-auto flex h-11 max-w-[1600px] items-center justify-between gap-4 px-4 md:px-8">
        <a href="#top" className="label whitespace-nowrap text-ink">
          Ismail Hossain
        </a>
        <span className="hidden md:block">
          <AxisIndicator />
        </span>
        <span className="label hidden whitespace-nowrap text-taupe sm:inline">
          Full-stack developer
        </span>
      </div>
      <div
        ref={barRef}
        className="h-[2px] w-full origin-left scale-x-0 bg-vermilion"
        aria-hidden
      />
    </header>
  );
}
