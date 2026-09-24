import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "../lib/gsap";
import { caseStats } from "../data";
import screen from "../assets/images/dev-01.jpg";
import diagram from "../assets/images/dev-03.jpg";

/* Pinned horizontal strip — the mirror of section 02.
   The window pans LEFT (the strip travels right), so the panels are laid out
   in reverse in the markup: reading order runs last child → first child. */

const facts: [string, string][] = [
  ["Team", "4 engineers"],
  ["Stack", "Go · Postgres · React"],
  ["Deploy", "Blue-green, weekly"],
  ["Audit", "Zero findings"],
];

export default function CaseStudy() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [reduce] = useState(() => prefersReduced());

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr || reduce) return;

    const ctx = gsap.context(() => {
      const dist = () => Math.max(1, tr.scrollWidth - window.innerWidth);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => "+=" + (dist() + window.innerWidth * 0.15),
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });
      // pan LEFT: the strip starts pushed left and travels back to the right
      tl.fromTo(
        tr,
        { x: () => -dist() },
        { x: 0, ease: "none" },
        0,
      );
      if (bar.current)
        tl.fromTo(
          bar.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0,
        );
    }, sec);

    return () => ctx.revert();
  }, [reduce]);

  const panel =
    "flex h-[100svh] shrink-0 flex-col justify-between border-r border-ink/20 px-4 pb-8 pt-24 md:px-10";

  return (
    <section
      id="case"
      ref={section}
      data-axis="left"
      aria-label="Case study — Ledgerline"
      className="relative overflow-hidden border-y border-ink bg-stock/60"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-14 z-20 flex items-center justify-between px-4 md:px-8">
        <p className="label text-vermilion">05 — Case study, Ledgerline</p>
        <p className="label shrink-0 text-taupe">
          <span className="sm:hidden">Left ←</span>
          <span className="hidden sm:inline">Scroll — panels move left ←</span>
        </p>
      </div>

      <div className={reduce ? "overflow-x-auto" : "overflow-hidden"}>
        <div
          ref={track}
          className={
            "flex h-[100svh] w-max " + (reduce ? "flex-row-reverse" : "")
          }
        >
          {/* 05 — close (first in the markup, last to be read) */}
          <article className={panel + " w-[80vw] bg-paper md:w-[34vw]"}>
            <p className="label tnum text-taupe">Panel 05 / 05</p>
            <div>
              <h3 className="font-display font-semibold text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-normal">
                Case study complete.
                <br />
                Next — <span className="italic text-vermilion">the studio</span>
              </h3>
              <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-ink/80">
                Eleven months, four engineers, and a rollback nobody ever had to
                use. The architecture note is available on request.
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="label text-vermilion">↓ Keep scrolling</span>
              <span className="label text-taupe">End of strip</span>
            </div>
          </article>

          {/* 04 — the quote and the data model */}
          <article className={panel + " w-[88vw] bg-paper md:w-[62vw]"}>
            <p className="label tnum text-taupe">Panel 04 / 05</p>
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <blockquote className="font-display text-[clamp(1.5rem,2.6vw,2.4rem)] italic leading-[1.3]">
                “Everything writes twice, or it did not write. The whole system
                is one invariant with a UI attached.”
              </blockquote>
              <figure>
                <div className="aspect-[4/3] overflow-hidden border border-ink/20">
                  <img
                    src={diagram}
                    alt="Hand-drawn architecture diagram for the ledger, annotated in vermilion"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="label mt-3 text-taupe">
                  Plate II — data model, third pass
                </figcaption>
              </figure>
            </div>
            <p className="label text-taupe">
              Append-only postings · idempotent imports · reconciled nightly
            </p>
          </article>

          {/* 03 — the numbers */}
          <article className={panel + " w-[88vw] bg-paper md:w-[46vw]"}>
            <p className="label tnum text-taupe">Panel 03 / 05</p>
            <dl className="border-t border-ink/25">
              {caseStats.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline border-b border-ink/15 py-3"
                >
                  <dt className="label shrink-0 text-taupe">{k}</dt>
                  <span className="mx-3 h-px flex-1 translate-y-[-3px] border-b border-dotted border-ink/40" />
                  <dd className="tnum shrink-0 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-bold leading-none">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="grid grid-cols-2 gap-6 border-t border-ink/20 pt-6">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <p className="label text-taupe">{k}</p>
                  <p className="mt-2 text-[14px] leading-snug text-ink">{v}</p>
                </div>
              ))}
            </div>
          </article>

          {/* 02 — Plate I */}
          <article className={panel + " w-[88vw] bg-paper md:w-[58vw]"}>
            <p className="label tnum text-taupe">Panel 02 / 05</p>
            <div className="relative min-h-0 flex-1 overflow-hidden border border-ink/20">
              <img
                src={screen}
                alt="The Ledgerline staging build running on a studio monitor in raking light"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              <p className="label absolute bottom-3 left-3 text-paper">
                Plate I — staging build 4.18.0
              </p>
            </div>
            <div className="label mt-3 flex justify-between gap-4 text-taupe">
              <span>Northwind Bank — internal operations</span>
              <span className="tnum">2024—2025</span>
            </div>
          </article>

          {/* 01 — the cover (last in the markup, first to be read) */}
          <article className={panel + " w-[88vw] bg-stock/70 md:w-[52vw]"}>
            <p className="label tnum text-taupe">Panel 01 / 05</p>
            <div>
              <p className="label text-vermilion">Case study — 01 of 05</p>
              <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1] tracking-normal">
                Ledger
                <br />
                <span className="italic">line</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-[15px] leading-[1.6] text-ink/80">
                A double-entry ledger for the internal ops team of a mid-size
                bank: append-only postings, idempotent imports, and a
                reconciliation view an accountant can defend out loud in an
                audit.
              </p>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <a
                href="mailto:mdismailhossain9222@gmail.com"
                className="label inline-block border-b border-vermilion pb-1 text-vermilion transition-colors duration-300 hover:border-ink hover:text-ink"
              >
                Ask for the architecture note →
              </a>
              <span className="label text-taupe">
                {reduce ? "Swipe →" : "Pan left, five panels ←"}
              </span>
            </div>
          </article>
        </div>
      </div>

      <div
        ref={bar}
        aria-hidden
        className="absolute bottom-0 right-0 h-[3px] w-full origin-right scale-x-0 bg-vermilion"
      />
    </section>
  );
}
