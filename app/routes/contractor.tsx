import { lazy, Suspense } from "react";
import { useParams } from "react-router";
const Viewer = lazy(() =>
  import("../../pages/MagicLinkViewer").then((m) => ({
    default: m.MagicLinkViewer,
  })),
);
export const meta = () => [
  { title: "Contractor link | Snaglist" },
  { name: "robots", content: "noindex, nofollow" },
  { name: "description", content: "Open the snag list shared with you." },
];
export default function Contractor() {
  const { token } = useParams();
  return (
    <div className="contractor-app">
      <Suspense
        fallback={
          <main className="loading-page">
            <p>Opening your contractor link…</p>
          </main>
        }
      >
        <Viewer key={token} token={token!} />
      </Suspense>
    </div>
  );
}
