import { productCaptures, CAPTURE_WIDTHS } from "../content/screenshot-slots";
// A real Snaglist 2.0 capture, resized only. See productCaptures in
// app/content/screenshot-slots.ts. The declared size keeps the layout from shifting;
// captures below the fold load lazily.
export function ProductShot({
  id,
  caption,
  priority = false,
}: {
  id: string;
  caption?: string;
  priority?: boolean;
}) {
  const capture = productCaptures[id];
  if (!capture) throw new Error(`Unknown product capture: ${id}`);
  const base = `/screenshots/${id}`;
  const width = CAPTURE_WIDTHS[0];
  const height = Math.round((capture.height * width) / capture.width);
  return (
    <figure className="product-shot" data-product-capture={id}>
      <picture>
        <source
          type="image/webp"
          srcSet={CAPTURE_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(", ")}
          sizes="(max-width: 760px) 280px, 320px"
        />
        <img
          src={`${base}-720.png`}
          width={width}
          height={height}
          alt={capture.alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "auto" : "async"}
          fetchPriority={priority ? "high" : undefined}
        />
      </picture>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
