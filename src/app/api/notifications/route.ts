import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ count: 0 });
  }

  try {
    let count = 0;

    if (session.user.role === "ADMIN") {
      count = await prisma.appointment.count({
        where: { status: "PENDING" },
      });
    } else if (session.user.role === "STYLIST") {
      count = await prisma.appointment.count({
        where: {
          status: "PENDING",
          stylist: { userId: session.user.id },
        },
      });
    } else {
      // Client
      count = await prisma.appointment.count({
        where: {
          status: "PENDING",
          clientId: session.user.id,
        },
      });
    }

    return NextResponse.json({ count });
  } catch (err) {
    return NextResponse.json({ count: 0 });
  }
}
