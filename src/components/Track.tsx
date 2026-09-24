import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "../lib/gsap";

type Panel = {
  no: string;
  title: string;
  items: string[];
  note: string;
  art: "browser" | "path" | "pipe" | "none";
  invert?: boolean;
};

const panels: Panel[] = [
  {
    no: "01",
    title: "Frontend",
    items: ["React 19", "Next.js", "TypeScript", "Tailwind", "TanStack", "GSAP / three.js"],
    note: "Interfaces that stay quick on a five-year-old Android — not only on my machine.",
    art: "browser",
  },
  {
    no: "02",
    title: "Backend",
    items: ["Node.js", "Go", "PostgreSQL", "Redis", "GraphQL", "Kafka"],
    note: "Contracts first: schemas versioned, generated, and never guessed at the edge.",
    art: "path",
  },
  {
    no: "03",
    title: "Infrastructure",
    items: ["Docker", "Kubernetes", "Terraform", "AWS · GCP", "Actions", "Grafana"],
    note: "If it cannot be rebuilt from a clean machine in nine minutes, it is not finished.",
    art: "pipe",
  },
  {
    no: "04",
    title: "Data & realtime",
    items: ["Postgres", "ClickHouse", "Redis Streams", "WebSockets", "CDC"],
    note: "Streams, sockets and indexes tuned until the graph goes flat.",
    art: "none",
    invert: true,
  },
];

function Art({ kind }: { kind: Panel["art"] }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.4 } as const;

  if (kind === "browser")
    return (
      <svg viewBox="0 0 200 116" className="h-24 w-auto md:h-28" aria-hidden>
        <rect x="1" y="1" width="198" height="114" {...s} />
        <path d="M1 24h198" {...s} />
        <circle cx="14" cy="12.5" r="4.5" {...s} />
        <circle cx="30" cy="12.5" r="4.5" {...s} />
        <circle cx="46" cy="12.5" r="4.5" {...s} />
        <rect x="14" y="38" width="72" height="62" {...s} />
        <path d="M102 42h84M102 58h84M102 74h58M102 90h72" {...s} />
      </svg>
    );

  if (kind === "path")
    return (
      <svg viewBox="0 0 200 116" className="h-24 w-auto md:h-28" aria-hidden>
        <circle cx="26" cy="26" r="15" {...s} />
        <circle cx="100" cy="26" r="15" {...s} />
        <circle cx="174" cy="26" r="15" {...s} />
        <path d="M41 26h44M115 26h44" {...s} />
        <path d="M100 41v34" {...s} />
        <rect x="52" y="75" width="96" height="34" {...s} />
        <path d="M52 86h96" {...s} />
        <path d="M79 20l-6 6 6 6M153 20l-6 6 6 6" {...s} />
      </svg>
    );

  if (kind === "pipe")
    return (
      <svg viewBox="0 0 200 116" className="h-24 w-auto md:h-28" aria-hidden>
        <rect x="4" y="38" width="50" height="40" {...s} />
        <rect x="75" y="38" width="50" height="40" {...s} />
        <rect x="146" y="38" width="50" height="40" {...s} />
        <path d="M54 58h21M125 58h21" {...s} />
        <path d="M69 52l7 6-7 6M140 52l7 6-7 6" {...s} />
        <path d="M4 96h192" {...s} strokeDasharray="6 7" />
        <path d="M20 24h40M91 24h40" {...s} />
      </svg>
    );

  return null;
}

export default function Track() {
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
      tl.to(tr, { x: () => -dist(), ease: "none" }, 0);
      if (bar.current)
        tl.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
    }, sec);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={section}
      data-axis="x"
      aria-label="The stack, end to end"
      className="relative overflow-hidden border-y border-ink bg-paper"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-14 z-20 flex items-center justify-between px-4 md:px-8">
        <p className="label text-vermilion">02 — The stack, end to end</p>
        <p className="label shrink-0 text-taupe">
          <span className="sm:hidden">{reduce ? "Swipe →" : "Right →"}</span>
          <span className="hidden sm:inline">
            {reduce ? "Swipe the panels →" : "Scroll — panels move right →"}
          </span>
        </p>
      </div>

      <div className={reduce ? "overflow-x-auto" : "overflow-hidden"}>
        <div ref={track} className="flex h-[100svh] w-max items-stretch">
          {/* opening panel */}
          <article className="flex w-[88vw] shrink-0 flex-col justify-between border-r border-ink/20 bg-stock/70 px-4 pb-8 pt-24 md:w-[52vw] md:px-10">
            <p className="label tnum text-taupe">Panel 00 / 04</p>
            <div>
              <h2 className="font-display font-semibold text-[clamp(1.8rem,4.4vw,3.9rem)] leading-[1.05] tracking-normal">
                Everything from
                <br />
                the schema
                <br />
                <span className="italic text-vermilion">to the pixel.</span>
              </h2>
              <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.6] text-ink/80">
                Four panels, one continuous build. I take products from an empty
                repository to a running service — and stay until the graphs are
                flat.
              </p>
            </div>
            <div className="flex items-end justify-between gap-4">
              <ul className="label space-y-1.5 text-taupe">
                <li>01 Frontend</li>
                <li>02 Backend</li>
                <li>03 Infrastructure</li>
                <li>04 Data &amp; realtime</li>
              </ul>
              <span className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-vermilion">
                →
              </span>
            </div>
          </article>

          {panels.map((p) => (
            <article
              key={p.no}
              className={
                "flex w-[88vw] shrink-0 flex-col justify-between border-r border-ink/20 px-4 pb-8 pt-24 md:w-[56vw] md:px-10 " +
                (p.invert
                  ? "bg-vermilion text-paper"
                  : "bg-paper text-ink")
              }
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className={"label tnum " + (p.invert ? "text-paper" : "text-taupe")}>
                  Panel {p.no} / 04
                </p>
                <p className={"label " + (p.invert ? "text-paper" : "text-vermilion")}>
                  {p.no}
                </p>
              </div>

              <h3 className="mb-6 font-display font-semibold text-[clamp(1.8rem,4.4vw,3.9rem)] leading-[1.05] tracking-normal">
                {p.title}
              </h3>
              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
                <div>
                  <ul
                    className={
                      "mt-6 border-t " +
                      (p.invert ? "border-paper/40" : "border-ink/25")
                    }
                  >
                    {p.items.map((it) => (
                      <li
                        key={it}
                        className={
                          "label flex items-center justify-between border-b py-2 " +
                          (p.invert ? "border-paper/25" : "border-ink/15")
                        }
                      >
                        <span>{it}</span>
                        <span aria-hidden className="opacity-60">
                          ·
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-between gap-8">
                  <p
                    className={
                      "max-w-[34ch] text-[15px] leading-[1.6] " +
                      (p.invert ? "text-paper" : "text-ink/80")
                    }
                  >
                    {p.note}
                  </p>
                  {p.invert ? (
                    <div className="border-t border-paper/40 pt-4">
                      <p className="tnum font-display font-bold text-[clamp(3rem,7vw,5.5rem)] leading-none">
                        84<span className="text-[0.42em] align-super">ms</span>
                      </p>
                      <p className="label mt-2">p99, at 4.2M postings a day</p>
                    </div>
                  ) : (
                    <div className={p.art === "none" ? "hidden" : ""}>
                      <Art kind={p.art} />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className={"label " + (p.invert ? "text-paper" : "text-taupe")}>
                  {p.invert ? "Streams · sockets · indexes" : "Fig. " + p.no}
                </p>
                <p className={"label " + (p.invert ? "text-paper" : "text-vermilion")}>
                  ——
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        ref={bar}
        aria-hidden
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-vermilion"
      />
    </section>
  );
}
