import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "../lib/gsap";
import { statement } from "../data";

export default function Statement() {
  const root = useRef<HTMLElement>(null);
  const words = useRef<HTMLParagraphElement>(null);
  const star = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const p = words.current;
    if (!el || !p) return;
    if (prefersReduced()) return;

    const spans = Array.from(p.querySelectorAll<HTMLSpanElement>("span"));
    gsap.set(spans, {
      color: "#bdb6a8",
      opacity: 0.12,
      y: 26,
      filter: "blur(7px)",
    });

    const ctx = gsap.context(() => {
      // words come into focus one after another, scrubbed to the scroll
      gsap.to(spans, {
        color: "#14120f",
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.38,
        ease: "none",
        scrollTrigger: {
          trigger: p,
          start: "top 80%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });

      // the pressman's asterisk turns as you read
      if (star.current) {
        gsap.to(star.current, {
          rotate: 300,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      gsap.from("[data-srule]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.inOut",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 72%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-axis="y"
      className="relative mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-36"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-6 md:gap-6">
        <div className="md:col-span-1">
          <h2 className="label sticky top-20 text-vermilion">
            01 — Statement
          </h2>
          <span
            ref={star}
            aria-hidden
            className="sticky top-32 mt-6 block text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-vermilion"
          >
            ✳
          </span>
        </div>

        <div className="md:col-span-5">
          <p
            ref={words}
            className="font-display text-[clamp(1.7rem,4.4vw,3.5rem)] leading-[1.28] tracking-normal"
          >
            {statement.words.map((w, i) => (
              <span
                key={i}
                className={
                  "inline-block " +
                  (w === "measured," ||
                  w === "versioned," ||
                  w === "impossible"
                    ? "italic text-vermilion"
                    : "")
                }
              >
                {w}
                {"\u00A0"}
              </span>
            ))}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-ink/15 pt-6 sm:grid-cols-3">
            {[
              [
                "Founded 2016",
                "Van Nelleweg 1, Rotterdam",
              ],
              [
                "Selected clients",
                "Nieuwe Instituut · PostNL · De Volkskrant · Ahoy · Rijkswaterstaat",
              ],
              [
                "Currently",
                "Drawing a Cyrillic extension for Meridian",
              ],
            ].map(([head, body]) => (
              <div key={head}>
                <span
                  data-srule
                  aria-hidden
                  className="mb-3 block h-px w-10 bg-vermilion"
                />
                <p className="label text-taupe">{head}</p>
                <p className="mt-2 text-[13px] leading-[1.5] text-ink/80">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
