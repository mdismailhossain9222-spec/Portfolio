import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "../lib/gsap";
import { process } from "../data";

export default function Ascent() {
  const section = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState(0);
  const [reduce] = useState(() => prefersReduced());

  useEffect(() => {
    const sec = section.current;
    const col = inner.current;
    if (!sec || !col || reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        col,
        { y: () => window.innerHeight * 0.62 },
        {
          y: () => -(col.scrollHeight - window.innerHeight * 0.3),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => "+=" + col.scrollHeight * 1.05,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onUpdate: (self) => {
              const i = Math.min(
                process.length - 1,
                Math.floor(self.progress * process.length),
              );
              setLevel(i);
              if (marker.current)
                gsap.set(marker.current, { top: `${(1 - self.progress) * 100}%` });
            },
          },
        },
      );
    }, sec);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={section}
      data-axis="up"
      aria-label="How I work"
      className={
        "relative overflow-hidden border-y border-ink bg-stock/60 " +
        (reduce ? "py-20" : "h-[100svh]")
      }
    >
      {/* header */}
      <div className="pointer-events-none absolute left-0 right-0 top-14 z-20 flex items-center justify-between px-4 md:px-8">
        <p className="label text-vermilion">04 — How I work, ascending</p>
        <p className="label shrink-0 text-taupe">
          <span className="sm:hidden">Up ↑</span>
          <span className="hidden sm:inline">Scroll — rows rise ↑</span>
        </p>
      </div>

      {/* level rail */}
      <div className="pointer-events-none absolute bottom-10 left-0 z-20 hidden w-[26%] flex-col px-4 pt-24 md:flex md:px-8">
        <div className="flex items-start gap-6">
          <div className="relative h-40 w-px bg-ink/25">
            <div
              ref={marker}
              className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-vermilion"
              style={{ top: "100%" }}
            />
          </div>
          <div>
            <p className="label text-taupe">Level</p>
            <p className="tnum font-display font-bold text-[clamp(3rem,7vw,6rem)] leading-[0.85]">
              {String(level + 1).padStart(2, "0")}
            </p>
            <p className="label text-taupe">of 06</p>
            <svg
              viewBox="0 0 24 24"
              className="mt-8 h-9 w-9 text-vermilion"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden
            >
              <path d="M12 21V4M5 11l7-7 7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* the column that rises */}
      <div
        ref={inner}
        className={
          "w-full px-4 pb-10 md:pl-[30%] md:pr-8 " +
          (reduce ? "pt-4" : "pt-24")
        }
      >
        <div className="mb-6 flex items-center gap-4 md:hidden">
          <span className="label text-taupe">Level</span>
          <span className="tnum font-display text-4xl leading-none text-ink">
            {String(level + 1).padStart(2, "0")}
          </span>
          <span className="label text-taupe">/ 06</span>
        </div>

        {process.map((p, i) => (
          <div
            key={p.no}
            className={
              "grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-t border-ink/25 py-5 transition-colors duration-500 md:py-7 " +
              (i === level ? "text-ink" : "text-ink/70")
            }
          >
            <span
              className={
                "label tnum col-span-3 md:col-span-1 " +
                (i === level ? "text-vermilion" : "text-taupe")
              }
            >
              {p.no}
            </span>
            <h3 className="col-span-9 font-display font-semibold text-[clamp(1.9rem,4.6vw,3.8rem)] leading-[1.05] tracking-normal md:col-span-4">
              {p.title}
            </h3>
            <p className="col-span-12 max-w-[52ch] text-[15px] leading-[1.55] md:col-span-7 md:text-[17px]">
              {p.body}
            </p>
          </div>
        ))}

        <div className="mt-8 border-t border-ink pt-4">
          <p className="label text-taupe">
            End of ascent — next, the index of builds ↓
          </p>
        </div>
      </div>
    </section>
  );
}
