import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BookingSuccessView } from "@/components/booking/BookingSuccessView";

export const metadata: Metadata = { title: "Réservation confirmée" };

export default async function BookingSuccessPage(props: { searchParams: Promise<{ appointmentId?: string }> }) {
  const searchParams = await props.searchParams;
  const appointmentId = searchParams.appointmentId;

  const appointment = appointmentId
    ? await prisma.appointment.findUnique({ where: { id: appointmentId } })
    : null;

  const isInterac = appointment?.paymentMethod === "INTERAC";

  return (
    <div className="min-h-screen py-8 bg-brand-black flex items-center justify-center relative overflow-hidden">
      <BookingSuccessView
        isInterac={isInterac}
        depositAmount={appointment ? Number(appointment.depositAmount) : undefined}
      />
    </div>
  );
}


