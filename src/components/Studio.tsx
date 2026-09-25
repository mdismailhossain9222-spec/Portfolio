import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "../lib/gsap";
import { specs } from "../data";
import Portrait from "./Portrait";

export default function Studio() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-spec]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: "[data-specs]", start: "top 84%" },
      });
      gsap.fromTo(
        "[data-portrait]",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 70%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-axis="y"
      className="mx-auto max-w-[1600px] px-4 py-12 md:px-8 md:py-20 lg:py-24"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left Side: Scaled portrait matching editorial typography */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start w-full">
          <div className="flex items-center gap-3 mb-4 w-full justify-start">
            <span className="label text-vermilion">06 — STUDIO</span>
            <span className="bg-vermilion text-white text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider">
              Plate III
            </span>
          </div>
          <div
            data-portrait
            className="w-full max-w-[360px] sm:max-w-[460px] lg:max-w-none lg:w-[115%] lg:-ml-[8%] overflow-hidden"
          >
            <Portrait />
          </div>
        </div>

        {/* Right Side: Text & Specs */}
        <div className="lg:col-span-7 lg:pl-4">
          <p className="font-display text-[clamp(1.5rem,3.2vw,2.75rem)] font-semibold leading-[1.32] tracking-normal">
            I'm Ismail Hossain. I started on the front end, got tired of waiting for the
            API, and learned the rest out of spite. Now I take products from an
            empty repository to a running service:
            <span className="font-extrabold text-vermilion">
              {" "}
              schema, endpoints, interface, pipelines.
            </span>
          </p>

          <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.65] text-ink/80">
            I work alone or embedded with a small team, and I work in the open:
            one repository of record, every decision written down, every deploy
            reversible, and a README that tells the truth. Nothing gets handed
            over that I could not rebuild from a clean machine.
          </p>

          <dl data-specs className="mt-10 border-t border-ink">
            {specs.map(([k, v]) => (
              <div
                key={k}
                data-spec
                className="flex flex-col gap-1 border-b border-ink/15 py-3 sm:flex-row sm:items-baseline sm:gap-0"
              >
                <dt className="label shrink-0 text-vermilion">{k}</dt>
                <span className="mx-4 hidden h-px flex-1 translate-y-[-3px] border-b border-dotted border-ink/40 sm:block" />
                <dd className="shrink-0 text-[14px] leading-snug text-ink sm:text-right">
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/20 pt-6">
            {[
              ["06", "Years shipping"],
              ["31", "Repos to production"],
              ["99.98", "Best uptime %"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="tnum font-display font-bold text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.95] tracking-normal">
                  {n}
                </p>
                <p className="label mt-3 text-taupe">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}