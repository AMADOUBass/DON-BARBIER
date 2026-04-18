import { DefaultSession, DefaultUser } from "next-auth";
import { Role, MembershipTier } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      isMember: boolean;
      membershipTier: MembershipTier;
      coupesUsed: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: Role;
    isMember: boolean;
    membershipTier: MembershipTier;
    coupesUsed: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    isMember: boolean;
    membershipTier: MembershipTier;
    coupesUsed: number;
  }
}
