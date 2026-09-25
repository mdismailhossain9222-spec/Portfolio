import { useState } from "react";

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

  if (i >= CHAIN.length) return null;

  const src = CHAIN[i];
  const cutout = /\.png(\?|$)/i.test(src);

  return (
    <img
      src={src}
      alt="Ismail Hossain"
      decoding="async"
      onError={() => setI((n) => n + 1)}
      className="w-full h-auto block object-cover"
      style={{
        filter: "grayscale(1) contrast(1.06) brightness(1.02)",
        ...(cutout ? {} : { WebkitMaskImage: FEATHER, maskImage: FEATHER }),
      }}
    />
  );
}