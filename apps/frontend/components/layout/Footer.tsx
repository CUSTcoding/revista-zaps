'use client'

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full  text-[var(--foreground)] font-sans select-none">
      
      {/* 1. SEÇÃO DA NEWSLETTER (Fundo Creme) */}
      <div className="w-full bg-gray-500  border-t border-b border-[var(--border)] py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Lado Esquerdo: Ilustração / Placeholder */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="flex items-end gap-2 text-[var(--muted)]">
              {/* Representação minimalista das figuras da imagem caso não use vetor */}

            </div>
          </div>

          {/* Lado Direito: Conteúdo de Inscrição */}
          <div className="lg:col-span-7 space-y-4 max-w-xl">
            <h3 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-[var(--foreground)] leading-tight">
              Quer mais histórias como estas na sua caixa de entrada?
            </h3>
            <p className="text-xs md:text-sm text-[var(--muted-strong)] leading-relaxed font-normal">
              Inscreva-se nas newsletters por e-mail da Revista Zaps para ficar por dentro de notícias e opiniões, além do mais recente sobre a revista, rádio, filmes e loja.
            </p>
            
            {/* Formulário de Input */}
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 pt-2">
              <input 
                type="email" 
                placeholder="Introduza o seu endereço de e-mail" 
                className="flex-1 bg-white border border-[var(--border)] text-sm px-4 py-2.5 outline-none focus:border-black transition placeholder:text-[var(--muted)] text-[var(--foreground)] rounded-none"
                required
              />
              <button 
                type="submit"
                className="btn-accent text-black text-xs font-bold tracking-widest uppercase px-6 py-3 transition rounded-none whitespace-nowrap"
              >
                SUBSCREVER
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 2. LINKS PRINCIPAIS DO FOOTER (Fundo Preto) */}
      <div className="w-full bg-black text-white pt-16 pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Grid de Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-10 gap-x-6 items-start">
            
            {/* Bloco de Marca Principal (Ocupa 4 colunas no desktop) */}
            <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-4 pr-4">
              <h2 className="font-serif text-2xl md:text-3xl tracking-wide font-black uppercase text-white">
                Revista Zaps
              </h2>
              <p className="font-serif italic text-sm text-[var(--muted)]">
                Leia mais. Viva melhor.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <button className="btn-accent text-black text-[10px] font-bold tracking-widest uppercase px-4 py-2.5 transition rounded-none">
                  SUBSCREVER
                </button>
                <button className="bg-transparent border border-white/10 hover:border-white text-white text-[10px] font-bold tracking-widest uppercase px-5 py-2.5 transition rounded-none">
                  PARTILHAR
                </button>
              </div>
            </div>

            {/* Coluna: TÓPICOS */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
              <h4 className="text-[11px] font-black tracking-widest uppercase text-white border-b border-white/10 pb-1.5">
                TÓPICOS
              </h4>
              <ul className="space-y-2 text-xs text-[var(--muted)] font-normal">
                <li><a href="#" className="hover:text-white transition">Bitcoin</a></li>
                <li><a href="#" className="hover:text-white transition">Nostr</a></li>
                <li><a href="#" className="hover:text-white transition">Cypherpunk</a></li>
                <li><a href="#" className="hover:text-white transition">Finanças</a></li>
                <li><a href="#" className="hover:text-white transition">Cultura Digital</a></li>
                <li><a href="#" className="hover:text-white transition">Economia Austríaca</a></li>
              </ul>
            </div>

            {/* Coluna: DESCOBRIR */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
              <h4 className="text-[11px] font-black tracking-widest uppercase text-white border-b border-white/10 pb-1.5">
                DESCOBRIR
              </h4>
              <ul className="space-y-2 text-xs text-[var(--muted)] font-normal">
                <li><a href="#" className="hover:text-white transition">Revista</a></li>
                <li><a href="#" className="hover:text-white transition">Eventos</a></li>
                <li><a href="#" className="hover:text-white transition">Newsletters</a></li>
                <li><a href="#" className="hover:text-white transition">Conteúdo Parceiro</a></li>
              </ul>
            </div>

            {/* Coluna: A NOSSA MARCA */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
              <h4 className="text-[11px] font-black tracking-widest uppercase text-white border-b border-white/10 pb-1.5">
                A NOSSA MARCA
              </h4>
              <ul className="space-y-2 text-xs text-[var(--muted)] font-normal">
                <li><a href="#" className="hover:text-white transition">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition">Servicos</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              </ul>
            </div>

            {/* Coluna: CONTACTOS / LEGAL */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-6">
              <div className="space-y-3">
                <h4 className="text-[11px] font-black tracking-widest uppercase text-white border-b border-white/10 pb-1.5">
                  CONTACTO
                </h4>
                <ul className="space-y-2 text-xs text-[var(--muted)] font-normal">
                  <li><a href="#" className="hover:text-white transition">Entre em contacto</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-[11px] font-black tracking-widest uppercase text-white border-b border-white/10 pb-1.5">
                  LEGAL
                </h4>
                <ul className="space-y-2 text-xs text-[var(--muted)] font-normal">
                  <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
                  <li><a href="#" className="hover:text-white transition">Termos & Condições</a></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Linha Divisória de Direitos Autorais */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-widest font-medium text-[var(--muted)] uppercase">
            <div>
              &copy; {new Date().getFullYear()} REVISTA ZAPS. TODOS OS DIREITOS RESERVADOS.
            </div>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="#" className="hover:text-white transition">Voltar ao topo ↑</a>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}