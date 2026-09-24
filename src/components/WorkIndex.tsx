import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "../lib/gsap";
import { projects } from "../data";
import ProjectPreview from "./ProjectPreview";

/* Selected work — a bento grid of editorial project cards.
   12 columns, hairline rules between plates, no boxes: a catalogue spread
   rather than a card wall. One object in src/data.ts = one plate. */

export default function WorkIndex() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-head]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 78%" },
      });
      gsap.from("[data-plate]", {
        y: 54,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 72%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-axis="y"
      aria-label="Selected work"
      className="relative mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28"
    >
      <div
        data-head
        className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4"
      >
        <h2 className="label text-vermilion">03 — Selected work</h2>
        <p className="label text-taupe">
          {projects.length} projects · open source
        </p>
      </div>

      <div className="mt-px grid grid-cols-1 gap-px bg-ink/15 md:grid-cols-12">
        {projects.map((p) => (
          <article
            key={p.no}
            data-plate
            className={
              "group relative flex flex-col justify-between gap-8 bg-paper p-6 transition-colors duration-300 hover:bg-stock/70 md:p-9 " +
              p.span
            }
          >
            <ProjectPreview project={p} />
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="label tnum text-taupe transition-colors duration-300 group-hover:text-vermilion">
                  {p.no}
                </span>
                <span className="label text-taupe">
                  {p.live ? "Live" : "In development"}
                </span>
              </div>

              <h3 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-normal">
                {p.title}
              </h3>
              <p className="mt-2 font-display text-[clamp(1.15rem,1.9vw,1.6rem)] italic leading-[1.25] text-vermilion">
                {p.tagline}
              </p>

              <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.6] text-ink/80">
                {p.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="label border border-ink/25 px-2.5 py-1 text-ink/80 transition-colors duration-300 group-hover:border-ink/40"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="border-t border-ink/25 pt-4">
                <p className="label text-vermilion">Engineering note</p>
                <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.6] text-ink">
                  {p.highlight}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label border-b border-ink/40 pb-0.5 transition-colors duration-300 hover:border-vermilion hover:text-vermilion"
                >
                  GitHub ↗
                </a>
                {p.live ? (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label border-b border-vermilion pb-0.5 text-vermilion transition-colors duration-300 hover:border-ink hover:text-ink"
                  >
                    Live ↗
                  </a>
                ) : (
                  <span
                    aria-hidden
                    className="label border-b border-dashed border-ink/25 pb-0.5 text-taupe"
                  >
                    Live URL — add in src/data.ts
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="label mt-6 text-taupe">
        More as they ship — the grid is built to grow.
      </p>
    </section>
  );
}
