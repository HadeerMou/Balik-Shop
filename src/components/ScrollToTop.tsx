"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

/**
 * Next scrolls to the top on a route change, but not when only the query
 * string changes (/shop?category=bags -> /shop?category=shoes). Combined with
 * `scroll-behavior: smooth` on <html>, a click from the footer left you stuck
 * at the bottom of the new page. Force the jump ourselves on every URL change.
 */
function ScrollToTopInner() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      // Don't fight the browser restoring a scroll position on a hard load.
      first.current = false;
      return;
    }
    // One frame late, so any drawer releasing its `overflow: hidden` body lock
    // in this same commit has done so before we move the page.
    // `instant` overrides the global smooth scrolling — a page change should
    // land at the top immediately, not glide there.
    const id = requestAnimationFrame(() =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior }),
    );
    return () => cancelAnimationFrame(id);
  }, [pathname, search]);

  return null;
}

export function ScrollToTop() {
  return (
    <Suspense fallback={null}>
      <ScrollToTopInner />
    </Suspense>
  );
}
