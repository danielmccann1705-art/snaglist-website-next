import { Wordmark } from "../app/components/Brand";
interface MagicLinkFooterProps {
  variant: "inline" | "sticky";
}
// Keep acquisition after completion, not over the contractor's working controls.
export const MagicLinkFooter = ({ variant }: MagicLinkFooterProps) =>
  variant === "sticky" ? null : (
    <footer className="border-t border-gray-200 py-6 px-4 flex flex-col items-center gap-3">
      <Wordmark />
      <a
        href="/support"
        rel="noreferrer"
        className="inline-flex items-center min-h-12 text-sm underline"
      >
        Help with your contractor link
      </a>
    </footer>
  );
