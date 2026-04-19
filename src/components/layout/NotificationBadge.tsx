"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function NotificationBadge() {
  const { data: session } = useSession();

  const { data } = useQuery({
    queryKey: ["notifications", session?.user?.id],
    queryFn: async () => {
      const res = await fetch("/api/notifications");
      if (!res.ok) return { count: 0 };
      return res.json() as Promise<{ count: number }>;
    },
    enabled: !!session?.user,
    refetchInterval: 30000, // refresh every 30 seconds
  });

  if (!data || data.count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-brand-black"></span>
    </span>
  );
}
