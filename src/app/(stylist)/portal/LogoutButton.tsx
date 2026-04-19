"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "./actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm text-red-400 hover:bg-red-400/10 transition-colors ml-1 sm:ml-2"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">Déconnexion</span>
      </button>
    </form>
  );
}
