import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CartClearer } from "@/components/cart/CartClearer";
import { OrderSuccessView } from "@/components/shop/OrderSuccessView";

interface Props {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  if (!orderId) notFound();

  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { product: { select: { name: true, images: true, slug: true } } },
      },
    },
  });

  if (!order || order.userId !== session.user.id) notFound();

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center py-8 relative overflow-hidden">
      <CartClearer />
      <OrderSuccessView order={{
        ...order,
        subtotal: Number(order.subtotal),
        shipping: Number(order.shipping),
        tax: Number(order.tax),
        total: Number(order.total),
        items: order.items.map(i => ({ ...i, total: Number(i.total) })),
      }} />
    </div>
  );
}


