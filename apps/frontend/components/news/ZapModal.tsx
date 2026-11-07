'use client'

import React, { useEffect, useRef } from 'react';
import { X, Zap } from 'lucide-react';
import InvoicePanel from './InvoicePanel';

type Props = {
  postId: string;
  title: string;
  onClose: () => void;
  onPaid: (zapsCount?: number) => void;
};

export default function ZapModal({ postId, title, onClose, onPaid }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Enviar zap"
        tabIndex={-1}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-lg border border-white/10 bg-[#0B0E11] p-5 outline-none sm:max-w-md sm:rounded-lg sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--accent)]">
              <Zap size={15} className="fill-current" /> Zapar esta notícia
            </p>
            <p className="mt-1 line-clamp-2 font-serif text-lg leading-snug text-white">{title}</p>
          </div>
          <button onClick={onClose} aria-label="Fechar" className="p-1 text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <InvoicePanel postId={postId} onPaid={onPaid} />
      </div>
    </div>
  );
}
