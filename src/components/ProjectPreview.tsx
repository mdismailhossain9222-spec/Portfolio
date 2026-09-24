import { useState } from "react";
import type { Project } from "../data";

/* Preview plate for a project card.
   Static first: preview.image → images/<slug>.jpg → images/<slug>.png
   preview.embed  opts a project into a LIVE iframe filling the plate (only
                  where that deployment allows framing)
   preview.video  plays muted over the plate
   The static layer always sits underneath — it is the loading state and the
   fallback, so the plate is never a blank box. */
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function ProjectPreview({ project }: { project: Project }) {
  const slug = slugify(project.title);
  const chain = [
    ...(project.preview?.image ? [project.preview.image] : []),
    `images/${slug}.jpg`,
    `images/${slug}.png`,
  ];
  const embed = project.preview?.embed;
  const video = project.preview?.video;

  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);
  const [ok, setOk] = useState(true);
  const hasShot = i < chain.length;
  // the deployed site if there is one, otherwise the repository
  const href = project.live ?? project.url;

  return (
    <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden border border-ink/20 bg-stock">
      {/* base layer — screenshot or wireframe mockup */}
      {hasShot ? (
        <img
          src={chain[i]}
          alt={`${project.preview?.alt ?? project.title} — project preview`}
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
          onError={() => setI((n) => n + 1)}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <Mockup title={project.title} />
      )}

      {/* optional motion layer */}
      {video && (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full bg-paper object-cover"
        />
      )}

      {/* live layer */}
      {embed && ok && (
        <iframe
          src={embed}
          title={`${project.title} — live preview`}
          loading="lazy"
          onLoad={() => setLive(true)}
          onError={() => setOk(false)}
          className={
            "absolute inset-0 h-full w-full border-0 bg-paper transition-opacity duration-700 ease-out " +
            (live ? "opacity-100" : "opacity-0")
          }
        />
      )}

      <span className="label pointer-events-none absolute right-2 top-2 z-10 bg-ink/85 px-2 py-1 text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        {project.live ? "Open live ↗" : "Open repo ↗"}
      </span>

      {/* click layer — above the image, video and iframe, which would
          otherwise swallow the click */}
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open ${project.title}${project.live ? " — live site" : " — repository"} in a new tab`}
        className="absolute inset-0 z-[5] cursor-pointer focus-visible:outline-offset-[-3px]"
      />

      {!hasShot && !embed && (
        <span className="label pointer-events-none absolute bottom-2 left-2 bg-paper/85 px-2 py-1 text-taupe">
          images/{slug}.jpg
        </span>
      )}
    </div>
  );
}

/* placeholder mockup — a browser wireframe in the catalogue's own hairlines */
function Mockup({ title }: { title: string }) {
  return (
    <svg
      viewBox="0 0 300 200"
      className="h-full w-full text-ink/30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      role="img"
      aria-label={`${title} — preview mockup, awaiting screenshot`}
    >
      <path d="M0 26.5h300" />
      <circle cx="16" cy="13" r="3" />
      <circle cx="30" cy="13" r="3" />
      <circle cx="44" cy="13" r="3" />
      <rect x="60" y="7" width="150" height="12" rx="6" />
      <rect x="18" y="44" width="116" height="52" />
      <path d="M18 112h116M18 124h92M18 136h64" />
      <rect
        x="150"
        y="44"
        width="132"
        height="92"
        stroke="var(--color-vermilion)"
        opacity="0.55"
      />
      <path d="M18 158h264M18 172h196M18 186h132" />
    </svg>
  );
}
