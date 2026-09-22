import { Header, Footer } from "../components/Site";
export const meta = () => [
  { title: "Page not found | Snaglist" },
  { name: "robots", content: "noindex, follow" },
];
export default function NotFound() {
  return (
    <div className="marketing">
      <Header path="" />
      <main id="main" className="wrap page-intro">
        <p className="eyebrow">404</p>
        <h1>That page is not here.</h1>
        <p>Check the address, or use one of these pages to find your way.</p>
        <div className="actions">
          <a className="button" href="/">
            Snaglist home
          </a>
          <a href="/support#contractor-links">Get help with a Contractor link</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
