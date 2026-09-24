type Line = string | { label: string; href: string };

const isLink = (l: Line): l is { label: string; href: string } =>
  typeof l !== "string";

const columns: { head: string; body: Line[] }[] = [
  {
    head: "Elsewhere",
    body: [
      {
        label: "GitHub ↗",
        href: "https://github.com/mdismailhossain9222-spec",
      },
      {
        label: "LinkedIn ↗",
        href: "https://www.linkedin.com/in/ismailhossain9222/",
      },
      {
        label: "Gmail ↗",
        href: "mailto:mdismailhossain9222@gmail.com",
      },
    ],
  },
  {
    head: "Studio",
    body: ["Remote — UTC+1", "Available March 2026", "Contract & project work"],
  },
  {
    head: "Colophon",
    body: [
      "Set in Bitter & Archivo",
      "with Space Mono labels.",
      "Built with React, three.js & GSAP.",
    ],
  },
];

export default function Colophon() {
  return (
    <footer
      data-axis="y"
      className="relative overflow-hidden border-t border-ink bg-vermilion text-paper"
    >
      <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-16 md:px-8 md:pb-14 md:pt-24">
        <p className="label text-paper">07 — Available for work</p>

        <div className="mt-6 grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-12">
          <a
            href="mailto:mdismailhossain9222@gmail.com"
            className="group block font-display text-[clamp(1.15rem,3.6vw,2.6rem)] font-extrabold leading-[1.05] tracking-normal transition-colors duration-300 hover:text-ink"
          >
            mdismailhossain9222
            <span className="italic">@gmail.com</span>
          </a>

          <div className="flex md:justify-end">
            <a
              href="Ismail-CV.pdf"
              download="Ismail-Hossain-CV.pdf"
              className="group inline-flex items-center gap-4 border border-paper px-6 py-4 transition-colors duration-300 hover:bg-paper hover:text-vermilion md:px-8 md:py-5"
            >
              <span className="label">Download CV</span>
              <span className="label transition-transform duration-300 group-hover:translate-y-0.5">
                PDF ↓
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-paper/30 pt-6 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.head}>
              <p className="label text-paper">{col.head}</p>
              <ul className="mt-3 space-y-1.5 text-[13px] leading-[1.55] text-paper md:text-[14px]">
                {col.body.map((line, i) =>
                  isLink(line) ? (
                    <li key={i}>
                      <a
                        href={line.href}
                        target={
                          line.href.startsWith("mailto") ? undefined : "_blank"
                        }
                        rel="noreferrer noopener"
                        className="inline-block border-b border-paper/40 pb-0.5 transition-colors duration-300 hover:border-ink hover:text-ink"
                      >
                        {line.label}
                      </a>
                    </li>
                  ) : (
                    <li key={i}>{line}</li>
                  ),
                )}
              </ul>
            </div>
          ))}

          <div>
            <p className="label text-paper">Build</p>
            <p className="tnum mt-3 text-[13px] leading-[1.55] text-paper md:text-[14px]">
              No. 01 — edition of 500
              <br />
              Last deployed 12.02.2026
              <br />© MMXXVI Ismail Hossain
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-paper/30 py-3">
        <div className="ticker-run-slow flex w-max whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="label px-6 text-paper">
              github.com/mdismailhossain9222-spec ✳
              linkedin.com/in/ismailhossain9222 ✳ mdismailhossain9222@gmail.com
              ✳
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
