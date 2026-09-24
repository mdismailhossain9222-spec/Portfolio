import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "../lib/gsap";

const LINE_A =
  "FULL-STACK · TYPESCRIPT · NODE · REACT · POSTGRES · GO · REDIS · GRAPHQL · ";
const LINE_B =
  "DOCKER · KUBERNETES · TERRAFORM · CI/CD · OBSERVABILITY · TESTS · EDGE · ";

function Row({ text, dir }: { text: string; dir: 1 | -1 }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const travel = Math.min(760, Math.max(220, window.innerWidth * 0.55));
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { x: dir === 1 ? 0 : -travel },
        {
          x: dir === 1 ? -travel : 0,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [dir]);

  const run = text.repeat(4);
  return (
    <div ref={ref} className="flex w-max whitespace-nowrap will-change-transform">
      <span>{run}</span>
      <span aria-hidden>{run}</span>
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      aria-label="Disciplines"
      className="relative overflow-hidden border-y border-ink bg-vermilion py-6 text-paper md:py-9"
    >
      <div className="font-sans text-[clamp(2.4rem,8vw,7rem)] font-extrabold uppercase leading-[1] tracking-normal">
        <Row text={LINE_A} dir={1} />
      </div>
      <div className="mt-1 font-display font-semibold text-[clamp(1.6rem,5vw,4.4rem)] italic leading-[1.1] tracking-normal text-paper md:mt-2">
        <Row text={LINE_B} dir={-1} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-vermilion/60 via-transparent to-vermilion/60" />
    </section>
  );
}
