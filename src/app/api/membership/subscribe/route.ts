import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createSubscriptionCheckout } from "@/lib/stripe";
import { MembershipTier } from "@prisma/client";

const TIER_PRICES: Record<string, number> = {
  SIGNATURE: 12000, // 120.00 CAD
  ELITE: 15000,     // 150.00 CAD
  PRESTIGE: 20000,  // 200.00 CAD
};

// POST /api/membership/subscribe — initiate subscription checkout
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const { tier } = await req.json();
    
    if (!tier || !TIER_PRICES[tier]) {
      return NextResponse.json({ error: "Forfait invalide" }, { status: 400 });
    }

    const priceCents = TIER_PRICES[tier];
    const origin = req.nextUrl.origin;

    const checkoutSession = await createSubscriptionCheckout({
      userId: session.user.id,
      tier: tier as MembershipTier,
      priceAmountCents: priceCents,
      clientEmail: session.user.email ?? undefined,
      successUrl: `${origin}/account?subscribed=true`,
      cancelUrl: `${origin}/club?cancelled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Error creating subscription checkout:", error);
    return NextResponse.json({ error: "Erreur lors de la création du paiement" }, { status: 500 });
  }
}
