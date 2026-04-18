import type { NextAuthConfig } from "next-auth";
import type { Role, MembershipTier } from "@prisma/client";

// Edge-compatible config — NO Node.js modules (no bcrypt, no PrismaAdapter)
// Used by middleware to verify JWT without importing server-only code
export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" as const },
  secret: process.env.AUTH_SECRET || "somewhere-something-secret",
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id ?? "";
        token.role = user.role;
        token.isMember = user.isMember;
        token.membershipTier = user.membershipTier;
        token.coupesUsed = user.coupesUsed;
        token.picture = user.image ?? token.picture;
      }
      if (trigger === "update" && session?.image) {
        token.picture = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.isMember = token.isMember as boolean;
        session.user.membershipTier = token.membershipTier as MembershipTier;
        session.user.coupesUsed = token.coupesUsed as number;
        if (token.picture) session.user.image = token.picture;
      }
      return session;
    },
  },
  providers: [], // providers added in auth.ts only
} satisfies NextAuthConfig;

