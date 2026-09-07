export const redirectRoutes = { "/magic-links": "/contractor-link" };
export function releaseIndexable(env) {
  return env.INDEX_PUBLIC_SITE === "true" && env.VERCEL_ENV !== "preview";
}
export const contractorPath = /^\/m\/[^/]+(?:\/.*)?$/;
export function resolvePath(pathname, pagePaths) {
  if (redirectRoutes[pathname.replace(/\/$/, "")])
    return {
      status: 308,
      location: redirectRoutes[pathname.replace(/\/$/, "")],
    };
  if (contractorPath.test(pathname))
    return { status: 200, file: "__spa-fallback.html", private: true };
  if (
    pathname !== "/" &&
    pathname.endsWith("/") &&
    pagePaths.includes(pathname.slice(0, -1))
  )
    return { status: 308, location: pathname.slice(0, -1) };
  if (pagePaths.includes(pathname))
    return {
      status: 200,
      file: pathname === "/" ? "index.html" : pathname.slice(1) + "/index.html",
    };
  return null;
}
