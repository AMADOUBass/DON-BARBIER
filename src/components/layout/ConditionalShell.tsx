"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const SHELL_HIDDEN_PREFIXES = ["/dashboard", "/portal", "/post-login", "/login", "/signup", "/forgot-password"];

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideShell = SHELL_HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));

  if (hideShell) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-32 lg:pb-0">
        {!hideShell && pathname !== "/" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40 relative z-20 pointer-events-none">
            <div className="pointer-events-auto">
              <Breadcrumbs />
            </div>
          </div>
        )}
        <div className={pathname === "/" ? "" : "pt-8"}>
          {children}
        </div>
      </main>
      <MobileTabBar />
      <Footer />
    </>
  );
}

