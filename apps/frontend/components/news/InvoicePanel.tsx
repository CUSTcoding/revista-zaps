'use client'

import React, { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Zap, Copy, Check, ExternalLink, Loader2 } from 'lucide-react';

const PRESETS = [21, 100, 500, 1000, 5000];
const POLL_MS = 2500;
const EXPIRE_MS = 10 * 60 * 1000;

type Props = {
  /** id da notícia, ou "general" para doações da página /donate */
  postId: string;
  onPaid?: (zapsCount?: number) => void;
};

type Step = 'choose' | 'loading' | 'invoice' | 'paid' | 'expired';

export default function InvoicePanel({ postId, onPaid }: Props) {
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState('');
  const [step, setStep] = useState<Step>('choose');
  const [invoice, setInvoice] = useState<{ id: string; pr: string; verifiable: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const paidRef = useRef(onPaid);
  paidRef.current = onPaid;

  const sats = custom ? Number(custom) : amount;

  async function generate() {
    if (!Number.isInteger(sats) || sats < 1 || sats > 1_000_000) {
      setError('Escolhe um valor entre 1 e 1.000.000 sats.');
      return;
    }
    setError(null);
    setStep('loading');
    try {
      const res = await fetch('/api/zaps/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, amount: sats }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao gerar o invoice.');
      setInvoice(data);
      setStep('invoice');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao gerar o invoice.');
      setStep('choose');
    }
  }

  // verifica o pagamento a cada 2,5 s durante 10 min
  useEffect(() => {
    if (step !== 'invoice' || !invoice?.verifiable) return;
    const started = Date.now();
    const timer = window.setInterval(async () => {
      if (Date.now() - started > EXPIRE_MS) {
        window.clearInterval(timer);
        setStep('expired');
        return;
      }
      try {
        const r = await fetch(`/api/zaps/status?id=${invoice.id}`, { cache: 'no-store' });
        const d = await r.json();
        if (d.settled) {
          window.clearInterval(timer);
          setStep('paid');
          paidRef.current?.(d.zapsCount);
        }
      } catch { /* tenta de novo no próximo ciclo */ }
    }, POLL_MS);
    return () => window.clearInterval(timer);
  }, [step, invoice]);

  async function copy() {
    if (!invoice) return;
    await navigator.clipboard.writeText(invoice.pr);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (step === 'paid') {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-black">
          <Zap size={26} className="fill-black" />
        </span>
        <p className="font-serif text-2xl text-white">Zap recebido</p>
        <p className="text-sm text-white/60">{sats.toLocaleString('pt-PT')} sats enviados. Obrigado por apoiar a Revista Zaps.</p>
      </div>
    );
  }

  if (step === 'invoice' || step === 'expired') {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className={`rounded-md bg-white p-3 ${step === 'expired' ? 'opacity-30' : ''}`}>
          <QRCodeSVG value={`lightning:${invoice!.pr.toUpperCase()}`} size={216} level="M" />
        </div>
        <p className="font-mono text-sm text-white">{sats.toLocaleString('pt-PT')} sats</p>

        {step === 'expired' ? (
          <>
            <p className="text-sm text-white/60">O invoice expirou. Gera um novo.</p>
            <button onClick={() => { setInvoice(null); setStep('choose'); }} className="btn-accent rounded-sm px-4 py-2 text-sm font-bold text-black">
              Gerar novo invoice
            </button>
          </>
        ) : (
          <>
            <p className="flex items-center gap-2 text-sm text-white/60">
              {invoice!.verifiable ? (
                <><Loader2 size={14} className="animate-spin" /> À espera do pagamento…</>
              ) : (
                'Paga com qualquer carteira Lightning. A confirmação deste provedor é manual.'
              )}
            </p>
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <button onClick={copy} className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-white/15 px-3 py-2.5 text-sm text-white hover:border-white/40">
                {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copiado' : 'Copiar invoice'}
              </button>
              <a href={`lightning:${invoice!.pr}`} className="btn-accent flex flex-1 items-center justify-center gap-2 rounded-sm px-3 py-2.5 text-sm font-bold text-black">
                <ExternalLink size={16} /> Abrir na carteira
              </a>
            </div>
            <button onClick={() => { setInvoice(null); setStep('choose'); }} className="text-xs text-white/40 underline hover:text-white/70">
              Mudar o valor
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <fieldset>
        <legend className="mb-2 text-sm text-white/60">Quantos sats queres enviar?</legend>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={!custom && amount === p}
              onClick={() => { setAmount(p); setCustom(''); }}
              className={`rounded-sm border px-3 py-2 font-mono text-sm transition ${
                !custom && amount === p
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-black font-bold'
                  : 'border-white/15 text-white/80 hover:border-white/40'
              }`}
            >
              {p.toLocaleString('pt-PT')}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5 text-sm text-white/60">
        Ou outro valor
        <input
          inputMode="numeric"
          value={custom}
          onChange={(e) => setCustom(e.target.value.replace(/\D/g, '').slice(0, 7))}
          placeholder="sats"
          className="rounded-sm border border-white/15 bg-black/30 px-3 py-2.5 font-mono text-white outline-none focus:border-[var(--accent)]"
        />
      </label>

      {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

      <button
        onClick={generate}
        disabled={step === 'loading'}
        className="btn-accent flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-bold text-black disabled:opacity-60"
      >
        {step === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} className="fill-black" />}
        Gerar invoice de {Number.isInteger(sats) && sats > 0 ? sats.toLocaleString('pt-PT') : '…'} sats
      </button>
    </div>
  );
}
