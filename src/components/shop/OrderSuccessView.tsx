"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, ShoppingBag, ArrowRight, PartyPopper } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  id: string;
  quantity: number;
  total: number | string;
  product: { name: string; images: string[]; slug: string };
}

interface Order {
  id: string;
  status: string;
  paymentMethod: string;
  createdAt: Date;
  subtotal: number | string;
  shipping: number | string;
  tax: number | string;
  total: number | string;
  items: OrderItem[];
}

interface Props {
  order: Order;
}

const statusLabel: Record<string, string> = {
  PENDING: "En attente de paiement",
  PROCESSING: "Paiement confirmé — en préparation",
  SHIPPED: "Expédié",
  DELIVERED: "Livré",
  CANCELLED: "Annulé",
  REFUNDED: "Remboursé",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -30 },
  visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 } },
};

const ringVariants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: {
    scale: [0.6, 1.18, 1],
    opacity: [0, 0.5, 0],
    transition: { duration: 1.3, ease: "easeOut", delay: 0.15 },
  },
};

export function OrderSuccessView({ order }: Props) {
  const isInterac = order.paymentMethod === "INTERAC";

  return (
    <motion.div
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        {/* Icon + pulse ring */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <motion.div
            variants={ringVariants}
            className="absolute inset-0 rounded-full border-2 border-green-400"
          />
          <motion.div
            variants={iconVariants}
            className="w-24 h-24 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-400" />
          </motion.div>
        </div>

        {/* Confetti particle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: [0, 1, 0], y: [-10, -35, -60] }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <PartyPopper className="w-6 h-6 text-brand-gold" />
        </motion.div>

        <div>
          <h1 className="font-display text-3xl font-bold text-brand-beige">
            {isInterac ? "Commande enregistrée !" : "Commande confirmée !"}
          </h1>
          <p className="text-brand-muted mt-2">
            {isInterac
              ? "Veuillez envoyer votre virement Interac pour finaliser votre commande."
              : "Merci pour votre achat. Vous recevrez un email de confirmation sous peu."}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-brand-charcoal px-4 py-2 rounded-lg text-sm">
          <Package className="w-4 h-4 text-brand-gold" />
          <span className="text-brand-muted">Commande</span>
          <span className="text-brand-beige font-mono font-medium">#{order.id.slice(-8).toUpperCase()}</span>
        </div>
      </motion.div>

      {/* Interac Instructions */}
      {isInterac && (
        <motion.div variants={itemVariants} className="card bg-brand-gold/5 border-brand-gold/30 text-left">
          <h3 className="flex items-center gap-2 text-brand-gold font-bold mb-4 uppercase tracking-widest text-xs">
            Instructions Virement Interac
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-brand-black/40 p-3 rounded-lg border border-white/5">
              <span className="text-xs text-brand-muted uppercase">Montant total</span>
              <span className="text-brand-gold font-bold">{formatPrice(parseFloat(String(order.total)))}</span>
            </div>
            <div className="flex justify-between items-center bg-brand-black/40 p-3 rounded-lg border border-white/5">
              <span className="text-xs text-brand-muted uppercase">Virement par Courriel</span>
              <span className="text-brand-gold font-bold">donbarbier@gmail.com</span>
            </div>
            <div className="p-3 bg-brand-gold/5 border border-brand-gold/10 rounded-lg text-xs text-brand-muted leading-relaxed">
              Le dépôt automatique est activé. Votre commande sera traitée dès réception du virement.
            </div>
          </div>
        </motion.div>
      )}

      {/* Status */}
      <motion.div variants={itemVariants} className="card">
        <div className="flex items-center justify-between">
          <span className="text-sm text-brand-muted">Statut</span>
          <span className="text-sm font-medium text-green-400">
            {statusLabel[order.status] ?? order.status}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-brand-muted">Date</span>
          <span className="text-sm text-brand-beige">
            {new Date(order.createdAt).toLocaleDateString("fr-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </motion.div>

      {/* Order items */}
      <motion.div variants={itemVariants} className="card space-y-4">
        <h2 className="font-display text-lg font-bold text-brand-beige">Articles commandés</h2>
        <div className="space-y-3">
          {order.items.map((item) => {
            const img = item.product.images[0];
            return (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-brand-charcoal shrink-0">
                  {img ? (
                    <Image
                      src={img}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      unoptimized={img.endsWith(".svg")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-brand-gold opacity-30 text-xs">DB</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-beige line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-brand-muted">Qté : {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-brand-beige shrink-0">
                  {formatPrice(parseFloat(String(item.total)))}
                </p>
              </div>
            );
          })}
        </div>

        <div className="divider-gold" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-brand-muted">
            <span>Sous-total</span>
            <span className="text-brand-beige">{formatPrice(parseFloat(String(order.subtotal)))}</span>
          </div>
          <div className="flex justify-between text-brand-muted">
            <span>Livraison</span>
            <span className={parseFloat(String(order.shipping)) === 0 ? "text-green-400" : "text-brand-beige"}>
              {parseFloat(String(order.shipping)) === 0 ? "Gratuite" : formatPrice(parseFloat(String(order.shipping)))}
            </span>
          </div>
          <div className="flex justify-between text-brand-muted">
            <span>Taxes (TPS+TVQ)</span>
            <span className="text-brand-beige">{formatPrice(parseFloat(String(order.tax)))}</span>
          </div>
          <div className="divider-gold" />
          <div className="flex justify-between font-semibold">
            <span className="text-brand-beige">Total payé</span>
            <span className="text-brand-gold font-bold text-base">{formatPrice(parseFloat(String(order.total)))}</span>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
        <Link href="/account" className="btn-primary flex items-center justify-center gap-2 flex-1">
          Mon compte <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/shop" className="btn-outline flex items-center justify-center gap-2 flex-1">
          <ShoppingBag className="w-4 h-4" /> Continuer les achats
        </Link>
      </motion.div>
    </motion.div>
  );
}
