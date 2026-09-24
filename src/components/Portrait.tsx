import { useState } from "react";

/* Ismail's cutout figure, standing over the name.
   Only YOUR photograph is ever shown here — no generated stand-in.

   Tried in order:
     1. src/assets/images/ismail.* — bundled and inlined at build time
     2. images/ismail.png          — transparent cutout (matches the mockup)
     3. images/ismail.jpg          — plain photograph, edges feathered into paper

   If none of those files exist the figure renders nothing and the name
   stands on its own.

   Colour: black and white, matched to ink on bone. */
const own = Object.values(
  import.meta.glob("../assets/images/ismail.*", {
    eager: true,
    query: "?url",
    import: "default",
  }),
)[0] as string | undefined;

const CHAIN: string[] = [
  ...((own ? [own] : []) as string[]),
  "images/ismail.png",
  "images/ismail.jpg",
];

const FEATHER =
  "radial-gradient(ellipse 62% 80% at 50% 46%, #000 54%, rgba(0,0,0,0.9) 76%, rgba(0,0,0,0) 100%)";

export default function Portrait() {
  const [i, setI] = useState(0);

  // nothing of ours fills the gap: no source, no figure
  if (i >= CHAIN.length) return null;

  const src = CHAIN[i];
  const cutout = /\.png(\?|$)/i.test(src);

  return (
    <img
      src={src}
      alt="Ismail Hossain"
      decoding="async"
      onError={() => setI((n) => n + 1)}
      className="h-full w-auto max-w-none object-contain object-bottom"
      style={{
        filter: "grayscale(1) contrast(1.06) brightness(1.02)",
        ...(cutout ? {} : { WebkitMaskImage: FEATHER, maskImage: FEATHER }),
      }}
    />
  );
}
