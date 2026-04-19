"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-brand-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={(e) => e.target === e.currentTarget && onCancel()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-brand-charcoal border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${danger ? "bg-red-500/10" : "bg-brand-gold/10"}`}>
                <AlertTriangle className={`w-5 h-5 ${danger ? "text-red-400" : "text-brand-gold"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-bold text-brand-beige">{title}</h3>
                {description && (
                  <p className="text-sm text-brand-muted mt-1 leading-relaxed">{description}</p>
                )}
              </div>
              <button onClick={onCancel} className="text-brand-muted hover:text-brand-beige transition-colors shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onCancel}
                disabled={loading}
                className="btn-outline flex-1"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 font-semibold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 ${
                  danger
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-brand-gold hover:bg-brand-gold/90 text-brand-black"
                }`}
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                )}
                {loading ? "..." : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
