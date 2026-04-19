"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { PHProvider } from "./PostHogProvider";
import { WelcomeToast } from "@/components/ui/WelcomeToast";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: false },
        },
      })
  );

  return (
    <PHProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <WelcomeToast />
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </PHProvider>
  );
}

