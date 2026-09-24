import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReduced } from "./lib/gsap";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import Marquee from "./components/Marquee";
import Track from "./components/Track";
import WorkIndex from "./components/WorkIndex";
import Ascent from "./components/Ascent";
import CaseStudy from "./components/CaseStudy";
import Studio from "./components/Studio";
import Colophon from "./components/Colophon";

function ColumnGuides() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 mx-auto max-w-[1600px] px-4 md:px-8"
    >
      <div className="grid h-full grid-cols-4 md:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={
              "h-full border-l border-ink/[0.07] " +
              (i >= 4 ? "hidden md:block" : "")
            }
          />
        ))}
        <div className="hidden h-full border-l border-ink/[0.07] md:block" />
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if (prefersReduced()) return;

    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
    } catch {
      lenis = null;
    }

    if (lenis) {
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      const raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t = window.setTimeout(refresh, 900);

      return () => {
        window.clearTimeout(t);
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(raf);
        lenis?.destroy();
      };
    }
  }, []);

  return (
    <>
      <a
        href="#main"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="grain-overlay" aria-hidden />
      <ColumnGuides />
      <TopBar />
      <main id="main" tabIndex={-1}>
        {/* ↓ vertical open */}
        <Hero />
        <Statement />
        <Marquee />

        {/* → horizontal: the whole stack slides right */}
        <Track />

        {/* ↓ vertical: the index of builds */}
        <WorkIndex />

        {/* ↑ reverse: the column rises while the page holds still */}
        <Ascent />

        {/* ↓ vertical close */}
        <CaseStudy />
        <Studio />
      </main>
      <Colophon />
    </>
  );
}
