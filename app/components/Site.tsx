import { useRef, useState } from "react";
import { APP_STORE, PORTAL, SUPPORT } from "../content/pages";
import { track } from "../lib/analytics";
import { Wordmark } from "./Brand";
export function StoreLink({
  placement = "body",
  label = "Download on the App Store",
  secondary = false,
}: {
  placement?: string;
  label?: string;
  secondary?: boolean;
}) {
  return (
    <a
      className={`button ${secondary ? "secondary" : ""}`}
      href={APP_STORE}
      rel="noreferrer"
      onClick={() => track("app_store_click", placement)}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
export function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = [
    ["/features", "How it works"],
    ["/contractor-link", "Contractor link"],
    ["/pricing", "Pricing"],
  ];
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a href="/" aria-label="Snaglist home" className="brand-link">
          <Wordmark />
        </a>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav
          aria-label="Main"
          id="primary-nav"
          className={open ? "open" : ""}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
          <a
            className="nav-signin"
            href={PORTAL}
            aria-label="Sign in to the manager portal"
          >
            Sign in
          </a>
          <StoreLink placement="header" label="Get Snaglist" />
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Wordmark dark />
          <p>
            Walk the job.
            <br />
            Mark the snags.
            <br />
            Hand over the record.
          </p>
          <p className="caption">© 2026 Snaglist</p>
        </div>
        <nav aria-label="Product">
          <h2>The app</h2>
          <a href="/features">How it works</a>
          <a href="/contractor-link">Contractor link</a>
          <a href="/pricing">Pricing</a>
          <a href="/#app-and-portal">App and manager portal</a>
          <a href={PORTAL}>Sign in to the manager portal</a>
          <a href="/floor-plans">Floor plans</a>
        </nav>
        <nav aria-label="Resources">
          <h2>The record</h2>
          <a href="/snag-list-template">Free snag list template</a>
          <a href="/vs-site-audit-pro">Snaglist vs Site Audit Pro</a>
          <a href="/comparison">Choosing a snagging app</a>
          <a href="/about">About Snaglist</a>
        </nav>
        <nav aria-label="Help">
          <h2>Get in touch</h2>
          <a href="/support">Help and support</a>
          <a href={`mailto:${SUPPORT}`}>Email Snaglist</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="wrap split">
        <div>
          <h2>
            Take a clearer record
            <br />
            on your next walk.
          </h2>
          <p>
            Snag lists for iPhone and iPad, with Contractor links your trades
            open in a browser. Free to download, with optional Pro subscriptions.
          </p>
        </div>
        <StoreLink placement="final" />
      </div>
    </section>
  );
}
export function FAQ({ items }: { items: [string, string][] }) {
  return (
    <div className="faq">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
