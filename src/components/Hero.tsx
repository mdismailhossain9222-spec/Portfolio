import { Suspense, lazy, useEffect, useRef } from "react";
import Portrait from "./Portrait";
import { gsap, prefersReduced } from "../lib/gsap";

/* three.js is the heaviest dependency on the page (~600 KB) — keep it out of
   the critical path and let it arrive after first paint. */
const TypeSort = lazy(() => import("./TypeSort"));

const TICKER = [
  "Available for contract work — March 2026",
  "github.com/mdismailhossain9222-spec",
  "linkedin.com/in/ismailhossain9222",
  "Ledgerline: 4.2M postings a day, p99 under 90 ms",
  "Build No. 01",
  "Full-stack — TypeScript · Go · Postgres",
  "Set in Bitter & Archivo",
];

function TickerRow() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative z-30 -mx-5 border-y border-ink/20 bg-paper/70 backdrop-blur-[2px] md:-mx-10">
      <div className="flex overflow-hidden py-2.5">
        {[0, 1].map((k) => (
          <div
            key={k}
            aria-hidden={k === 1}
            className={
              "flex shrink-0 whitespace-nowrap " + (k === 0 ? "ticker-run" : "")
            }
          >
            {items.map((t, i) => (
              <span key={i} className="label flex items-center text-ink">
                <span className="px-5">{t}</span>
                <span className="text-vermilion">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const NAME_A = "ISMAIL".split("");
const NAME_B = "HOSSAIN".split("");

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const l1w = useRef<HTMLDivElement>(null);
  const l2w = useRef<HTMLDivElement>(null);
  const meta = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el || prefersReduced()) return;

    const ctx = gsap.context(() => {
      /* the photo rises from below the fold, in step with the name being
         set — it starts a beat after the letters and settles just as the
         curtain clears. Plain slide: no fade, blur or scale. */
      gsap.from(photo.current, {
        yPercent: 100,
        duration: 1.6,
        delay: 0.75,
        ease: "power4.out",
      });

      const tl = gsap.timeline({ delay: 0.55 });

      tl.from([l1w.current, l2w.current], {
        yPercent: 108,
        duration: 1.25,
        ease: "power4.out",
        stagger: 0.09,
      })
        .from(
          ".char",
          {
            yPercent: 60,
            opacity: 0,
            filter: "blur(14px)",
            duration: 1.15,
            ease: "power4.out",
            stagger: 0.042,
          },
          "-=1.0",
        )
        .from(
          Array.from(meta.current?.children ?? []),
          {
            opacity: 0,
            y: 14,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.9",
        )
        .from(
          "[data-rule]",
          { scaleX: 0, duration: 0.9, ease: "power3.inOut" },
          "-=0.8",
        );

      gsap.to(l1.current, {
        xPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(l2.current, {
        xPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={section}
      data-axis="y"
      className="relative min-h-[100svh] w-full overflow-hidden pt-11"
    >
      {/* opening curtain */}
      <div className="curtain" aria-hidden>
        <span className="label text-taupe">Build No. 01 — setting</span>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-2.75rem)] max-w-[1600px] flex-col px-5 pt-10 md:px-10 md:pt-12">
        {/* the photo — untouched image, centred, standing on the bottom edge.
            z-[2] puts it between ISMAIL (z-[1]) and HOSSAIN (z-[3]). */}
        <div
          ref={photo}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex h-[110%] justify-center ml-40"
        >
          <img
            src="/images/me.png"
            alt=""
            decoding="async"
            fetchPriority="high"
            draggable={false}
            className="h-full w-auto max-w-none select-none object-contain object-bottom"
          />
        </div>

        {/* upper register */}
        <div
          ref={meta}
          className="relative z-[4] flex items-start justify-between gap-8"
        >
          <div className="max-w-[36ch]">
            <p className="label text-vermilion">Build No. 01 — obverse</p>
            <span
              data-rule
              aria-hidden
              className="mt-2 block h-px w-24 origin-left bg-vermilion"
            />
            <p className="mt-3 max-w-[32ch] text-[13px] leading-[1.45] text-taupe md:text-[14px]">
              Full-stack developer. Six years shipping the whole path — data
              model, API, interface and the deploy that carries it — for teams
              that need it live on Friday, not demoed on Friday.
            </p>
          </div>
          <p className="label hidden text-right text-taupe md:block">
            Stack: TypeScript / Go
            <br />
            Node · React · Postgres
            <br />
            <span className="text-ink">Fig. 1</span>
          </p>
        </div>

        {/* the name — ISMAIL left, HOSSAIN right */}
        <div className="mt-10 select-none md:mt-14">
          <h1 className="sr-only">Ismail Hossain — full-stack developer</h1>
          <div
            aria-hidden
            className="display-name font-display text-[clamp(1.9rem,min(12vw,21vh),12rem)] leading-[0.9] tracking-normal"
          >
            {/* ISMAIL — behind the photo */}
            <div className="name-glow relative z-[1] overflow-hidden">
              <div ref={l1w}>
                <div ref={l1} className="origin-left">
                  {NAME_A.map((c, i) => (
                    <span key={i} className="char inline-block">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-[6vh]" />
            {/* HOSSAIN — in front of the photo */}
            <div className="name-glow relative z-[3] overflow-hidden">
              <div ref={l2w}>
                <div ref={l2} className="origin-right text-right italic">
                  {NAME_B.map((c, i) => (
                    <span key={i} className="char inline-block">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* the stage */}
        <div className="relative min-h-[26vh] flex-1">
          <p className="label absolute bottom-2 right-0 z-30 max-w-[32ch] text-right text-taupe">
            Fig. 1 — the letter I, cast in pewter
            <br />
            <span className="text-vermilion">Scroll — the block turns ↓</span>
          </p>
        </div>

        <TickerRow />
      </div>

      {/* the figure, centred */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[68vh] justify-center">
        <Portrait />
      </div>

      {/* the block, standing on the paper */}
      <div className="pointer-events-none absolute left-[-4%] top-[57%] z-30 h-[36vh] w-[96%] md:bottom-[8%] md:left-[2%] md:top-auto md:h-[42vh] md:w-[46%]">
        <Suspense fallback={null}>
          <TypeSort trigger={section} />
        </Suspense>
      </div>
    </section>
  );
}
