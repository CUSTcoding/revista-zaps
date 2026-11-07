'use client'

import React, { useCallback, useState } from 'react';
import { Zap } from 'lucide-react';
import { formatSats } from '@/lib/format';
import ZapModal from './ZapModal';

type Props = {
  postId: string;
  title: string;
  count: number;
  size?: 'sm' | 'md';
  className?: string;
};

// Raio + total de sats zapados. Clique abre o QR / invoice para zapar esta notícia.
export default function ZapButton({ postId, title, count, size = 'md', className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(count);
  const close = useCallback(() => setOpen(false), []);

  const pad = size === 'sm' ? 'px-2 py-1 text-[11px] gap-1' : 'px-3 py-1.5 text-xs gap-1.5';
  const icon = size === 'sm' ? 12 : 14;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zapar esta notícia. ${total} sats recebidos até agora`}
        title="Zapar esta notícia"
        className={`relative z-20 inline-flex items-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 font-mono font-bold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-black ${pad} ${className}`}
      >
        <Zap size={icon} className="fill-current" />
        <span>{formatSats(total)}</span>
      </button>
      {open && (
        <ZapModal
          postId={postId}
          title={title}
          onClose={close}
          onPaid={(c) => setTotal((t) => c ?? t)}
        />
      )}
    </>
  );
}
