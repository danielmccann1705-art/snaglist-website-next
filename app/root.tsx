import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useRouteError,
  isRouteErrorResponse,
} from "react-router";
import type { ReactNode } from "react";
import "../app.css";
import "./styles.css";
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="no-referrer" />
        {!__PUBLIC_INDEXABLE__ && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <meta name="theme-color" content="#1A1D23" />
        <link rel="icon" href="/brand/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="preload"
          href="/fonts/plex-sans-regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/plex-sans-bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  return <Outlet />;
}
export function HydrateFallback() {
  return (
    <main className="loading-page">
      <p>Opening your Contractor link…</p>
    </main>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();
  const missing = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="loading-page">
      <h1>{missing ? "Page not found" : "This page could not load"}</h1>
      <p>
        {missing
          ? "Check the address or choose a page below."
          : "Refresh the page and try again."}
      </p>
      <a href="/">Go to Snaglist</a>
      <a href="/support">Get help</a>
    </main>
  );
}
