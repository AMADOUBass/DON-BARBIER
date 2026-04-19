"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.name.trim().length < 2) { toast.error("Veuillez entrer votre nom"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) { toast.error("Format d'email invalide"); return; }
    if (!form.subject) { toast.error("Veuillez choisir un sujet"); return; }
    if (form.message.trim().length < 10) { toast.error("Votre message doit contenir au moins 10 caractères"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name: form.name.trim(), email: form.email.toLowerCase().trim() }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center py-12 space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
            className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="font-display text-2xl font-bold text-brand-beige mb-2">Message envoyé !</h3>
            <p className="text-brand-muted">
              Merci ! L&apos;équipe Don Barbier vous répondra sous 24h à l&apos;adresse fournie.
            </p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setSent(false)}
            className="btn-ghost text-sm mt-2"
          >
            Envoyer un autre message
          </motion.button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Nom</label>
              <input type="text" className="input" value={form.name} onChange={update("name")} placeholder="Votre nom" required />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" value={form.email} onChange={update("email")} placeholder="votre@email.com" required />
            </div>
          </div>

          <div>
            <label className="label">Sujet</label>
            <select className="input" value={form.subject} onChange={update("subject")} required>
              <option value="">Choisir un sujet...</option>
              <option value="reservation">Rendez-vous / Réservation</option>
              <option value="produit">Question sur un produit</option>
              <option value="remboursement">Remboursement</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div>
            <label className="label">Message</label>
            <textarea
              className="input min-h-36 resize-none"
              value={form.message}
              onChange={update("message")}
              placeholder="Votre message..."
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full gap-2">
            {loading ? (
              <span className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {loading ? "Envoi..." : "Envoyer le message"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
