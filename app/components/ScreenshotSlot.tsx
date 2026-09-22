import { screenshotSlots } from "../content/screenshot-slots";
// A visibly marked placeholder where a real Snaglist 2.0 capture will go. See
// app/content/screenshot-slots.ts. The release gate fails while any slot remains.
export function ScreenshotSlot({ id }: { id: string }) {
  const slot = screenshotSlots[id];
  if (!slot) throw new Error(`Unknown screenshot slot: ${id}`);
  return (
    <figure
      className={`screenshot-slot ${slot.device.startsWith("PDF") ? "document" : "phone"}`}
      data-screenshot-slot={id}
    >
      <p className="screenshot-slot-flag">Screenshot to come · {id}</p>
      <p className="screenshot-slot-device">{slot.device}</p>
      <p>{slot.shows}</p>
      <figcaption>
        Placeholder. A real capture from the released app replaces this.
      </figcaption>
    </figure>
  );
}
