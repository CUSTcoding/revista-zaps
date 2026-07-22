'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, Zap,  } from "lucide-react";

// ──────────────────────────────────────────────────────────────
// Header — Revista Zaps
// Mega-menu desktop (estilo editorial em colunas, à la Monocle),
// mantendo a identidade visual da Revista Zaps (preto + laranja
// Bitcoin) em vez do branco/serifado do mockup original.
// ──────────────────────────────────────────────────────────────

const topicos = ["Bitcoin", "Nostr", "Cypherpunk", "Open Source", "Economia Austríaca"];

const descubra = [
    { label: "Edições", href: "/edicoes" },
    { label: "Mais zapados", href: "/zaps" },
    { label: "Relays", href: "/relays" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Vídeos", href: "/videos" },
    { label: "Conteúdo patrocinado", href: "/patrocinado" },
];

const sobre = [
    { label: "Sobre nós", href: "/sobre" },
    { label: "Como publicamos", href: "/protocolo" },
    { label: "FAQ", href: "/faq" },
    { label: "Contato", href: "/contato" },
    { label: "Trabalhe conosco", href: "/carreiras" },
];

export default function Header() {
    const [blockNumber, setBlockNumber] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/proxy");
                if (!res.ok) throw new Error("Erro ao buscar dados");
                const data = await res.json();
                setBlockNumber(data.block_index ?? null);
            } catch (err) {
                console.error("Falha ao carregar bloco:", err);
            }
        }

        load();
        const interval = setInterval(load, 60000);
        return () => clearInterval(interval);
    }, []);

   
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const bitcoinPrice = 0;
    const lastZaps = 0;
    const activeRelays = 0;

    return (
        <header className="fixed top-0 left-0 w-full bg-[#0B0E11] border-b border-white/10 z-50 font-sans text-white select-none">
  
            <div className="w-full bg-black/40 border-b border-white/5 hidden lg:block">
                        <div className="max-w-7xl mx-auto px-4 md:px-6 py-1.5 flex items-center justify-between text-[10px] md:text-[11px] font-mono font-medium tracking-wider text-[var(--text-inverse)]/70 uppercase">
                            <div>bloco: <span className="text-[var(--text-inverse)] font-bold">{blockNumber || "carregando..."} </span>Minerado</div>
                            <div className="hidden xl:block">preço: <span className="text-[var(--text-inverse)] font-bold">${bitcoinPrice.toFixed(2)}</span></div>
                            <div>últimos zaps: <span className="text-[#7CFC9A] font-bold">{lastZaps}</span></div>
                            <div className="hidden xl:block">relays ativos: <span className="text-[var(--text-inverse)] font-bold">{activeRelays}</span></div>
                        </div>
                        </div>

            {/* 2. Barra principal */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between relative">
                <div className="flex items-center gap-3 md:gap-6 z-10">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="cursor-pointer hover:opacity-70 transition p-1"
                        aria-label="Abrir menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X size={22} className="stroke-[2.5]" /> : <Menu size={22} className="stroke-[2.5]" />}
                    </button>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-2">
                    <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
                        <span className="w-6 h-6 md:w-7 md:h-7 bg-[var(--accent)] rounded-sm flex items-center justify-center shrink-0">
                            <Zap size={14} className="text-black fill-black" />
                        </span>
                        <span className="font-mono text-base sm:text-xl md:text-2xl tracking-wide font-black uppercase">
                            Revista<span className="text-[var(--accent)]">Zaps</span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 md:gap-5 z-10">
                    <button className="hover:opacity-70 hidden sm:block" aria-label="Buscar">
                        <Search size={18} />
                    </button>
                    <button className="btn-accent text-black text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm transition whitespace-nowrap">
                        <span className="hidden sm:inline">Subscrever-se</span>
                        <span className="sm:hidden">Assinar</span>
                    </button>
                </div>
            </div>

            {/* 3. Sub-navbar de categorias — desktop only, com scroll horizontal em telas médias */}
            <div className="w-full border-t border-white/10 overflow-x-auto scrollbar-none hidden md:block">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center gap-3 md:gap-4 whitespace-nowrap text-[11px] md:text-xs font-mono font-bold tracking-widest uppercase text-white/70">
                    {topicos.map((cat, index) => (
                        <div key={cat} className="flex items-center gap-3 md:gap-4">
                            <Link
                                href={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                                className="hover:text-[var(--accent)] transition"
                            >
                                {cat}
                            </Link>
                            {index < topicos.length - 1 && (
                                <span className="text-white/20 font-light text-sm">|</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Mega-menu — full screen, desktop e mobile compartilham a mesma estrutura,
                   reorganizada por breakpoint (colunas em lg+, stack em telas menores) */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-0 bg-[#0B0E11] overflow-y-auto animate-fadeIn">
                    {/* topo do mega-menu repete a identidade pra orientação */}
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between border-b border-white/10">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="cursor-pointer hover:opacity-70 transition p-1"
                            aria-label="Fechar menu"
                        >
                            <X size={22} className="stroke-[2.5]" />
                        </button>
                        <span className="font-mono text-lg md:text-2xl tracking-wide font-black uppercase">
                            Revista<span className="text-[var(--accent)]">Zaps</span>
                        </span>
                        <button className="btn-accent text-black text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm transition">
                            <span className="hidden sm:inline">Subscrever-se</span>
                            <span className="sm:hidden">Assinar</span>
                        </button>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                        {/* Coluna 1 — links grandes, estilo manchete */}
                        <nav className="py-8 lg:py-12 pr-0 lg:pr-10 flex flex-col gap-2">
                            {["Início", "Bitcoin", "Nostr", "Cypherpunk", "Open Source", "Mais zapados"].map((item) => (
                                <Link
                                    key={item}
                                    href={item === "Início" ? "/" : `/category/${item.toLowerCase().replace(/ /g, "-")}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-serif text-3xl sm:text-4xl lg:text-[2.4rem] leading-tight hover:text-[var(--accent)] transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>

                        {/* Coluna 2 — TOPICS */}
                        <div className="py-8 lg:py-12 pl-0 lg:pl-10 pr-0 lg:pr-10">
                            <p className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-4">
                                Relays
                            </p>
                            <ul className="flex flex-col gap-3">
                                {topicos.map((t) => (
                                    <li key={t}>
                                        <Link
                                            href={`/category/${t.toLowerCase().replace(/ /g, "-")}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="font-serif text-base text-white/80 hover:text-[var(--accent)] transition-colors"
                                        >
                                            {t}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Coluna 3 — DISCOVER + REVISTA ZAPS */}
                        <div className="py-8 lg:py-12 pl-0 lg:pl-10 pr-0 lg:pr-10">
                            <p className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-4">
                                Descubra
                            </p>
                            <ul className="flex flex-col gap-3 mb-8">
                                {descubra.map((d) => (
                                    <li key={d.label}>
                                        <Link
                                            href={d.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="font-serif text-base text-white/80 hover:text-[var(--accent)] transition-colors"
                                        >
                                            {d.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <p className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-4">
                                Revista Zaps
                            </p>
                            <ul className="flex flex-col gap-3">
                                {sobre.map((s) => (
                                    <li key={s.label}>
                                        <Link
                                            href={s.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="font-serif text-base text-white/80 hover:text-[var(--accent)] transition-colors"
                                        >
                                            {s.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Coluna 4 — edição em destaque + redes */}
                        <div className="py-8 lg:py-12 pl-0 lg:pl-10">
                            <p className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-1">
                                Edição
                            </p>
                            <p className="font-serif text-sm text-white/60 mb-4">
                                #047 · Junho 2026
                            </p>
                            <div className="aspect-[3/4] max-w-[220px] bg-gradient-to-br from-[#1a1f26] to-[#0B0E11] border border-white/10 rounded-sm flex flex-col justify-between p-5 mb-6">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                                    Revista Zaps · #047
                                </span>
                                <div>
                                    <p className="font-mono text-3xl font-bold text-[var(--accent)] mb-1">156k</p>
                                    <p className="font-serif text-base leading-snug">
                                        sats zapados na edição de junho
                                    </p>
                                </div>
                            </div>

                            <p className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-3">
                                Conecte-se
                            </p>
                            <div className="flex items-center gap-4">
                                <Link href="/primal" onClick={() => setIsMenuOpen(false)} className="text-white/50 hover:text-[var(--accent)]">
                                    <Zap size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}