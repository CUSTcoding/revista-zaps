'use client'

import React from 'react';
import { Play } from 'lucide-react';

interface Post {
  id: string;
  category: string;
  title: string;
  excerpt?: string;
  meta: string;
  imageUrl: string;
}

export default function MainEditorialContent() {
  // Dados fictícios baseados nos seus temas para popular o layout
  const mainPost: Post = {
    id: "1",
    category: "CULTURA DIGITAL",
    title: "Pensando em criar sua própria identidade soberana? Desenvolvedores do Nostr dão dicas fundamentais",
    excerpt: "Os criadores por trás dos principais clientes do ecossistema compartilham seus insights sobre o futuro da descentralização, privacidade de dados e por que construir em protocolos abertos é um caminho sem volta.",
    meta: "EDIÇÃO #194 | 3 MIN READ",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800"
  };

  const trendingPosts: Post[] = [
    {
      id: "2",
      category: "ECONOMIA AUSTRIACA",
      title: "Como a escassez digital do Bitcoin mudou a percepção de valor intertemporal da nova geração",
      meta: "5 MIN READ",
      imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=500"
    },
    {
      id: "3",
      category: "FINANÇAS",
      title: "Taxas de juros e expansão monetária: as lições que o mercado tradicional insiste em ignorar",
      meta: "4 MIN READ",
      imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=500"
    }
  ];

  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-36 pb-12 font-sans bg-transparent text-[var(--foreground)] my-10">

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 items-start">
        
       
        <section className="md:col-span-2 lg:col-span-5 space-y-4 border-b md:border-b-0 md:border-r border-[var(--border)]  pb-6 md:pb-0 md:pr-6">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted)]">
            {mainPost.category}
          </span>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight hover:text-[var(--accent)] transition cursor-pointer">
            {mainPost.title}
          </h1>
          <p className="text-sm text-[var(--muted-strong)] leading-relaxed font-normal">
            {mainPost.excerpt}
          </p>
          <div className="text-[10px] tracking-wider font-semibold text-[var(--muted)] uppercase">
            {mainPost.meta}
          </div>
          <div className="w-full aspect-[4/5] bg-[var(--surface-muted)] overflow-hidden">
            <img 
              src={mainPost.imageUrl} 
              alt="Destaque" 
              className="w-full h-full object-cover filter grayscale-[20%] hover:grayscale-0 transition duration-300" 
            />
          </div>
        </section>


        <section className="md:col-span-2 lg:col-span-4 space-y-6 border-b lg:border-b-0 lg:border-r border-[var(--border)] pb-6 lg:pb-0 lg:pr-6">
          {trendingPosts.map((post, idx) => (
            <div key={post.id} className={`space-y-3 ${idx > 0 ? "border-t border-[var(--border)] pt-6" : ""}`}>
              <div className="w-full aspect-video bg-[var(--surface-muted)] overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt="Mais acessada" 
                  className="w-full h-full object-cover filter grayscale-[20%]" 
                />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted)] block">
                {post.category}
              </span>
              <h2 className="font-serif text-lg font-bold leading-snug hover:text-[var(--accent)] transition cursor-pointer">
                {post.title}
              </h2>
              <div className="text-[10px] tracking-wider font-semibold text-[var(--muted)] uppercase">
                {post.meta}
              </div>
            </div>
          ))}
        </section>


        <aside className="md:col-span-4 lg:col-span-3 space-y-6 w-full">


          <div className="border border-[var(--border)] p-4 bg-[var(--surface-muted)] text-center space-y-2">
            <span className="text-[9px] tracking-widest text-[var(--muted)] block uppercase font-bold">PUBLICIDADE</span>
            <div className="w-full aspect-square bg-[var(--surface)] flex flex-col justify-between p-4 border border-dashed border-[var(--border)]">
              <span className="text-xs font-serif italic text-[var(--muted)]">Espaço Reservado</span>
              <div className="font-sans text-lg font-black tracking-widest uppercase text-[var(--muted)]">
                PATROCÍNIO
              </div>
              <span className="text-[10px] text-[var(--muted)] underline cursor-pointer hover:text-[var(--accent)]">Anuncie conosco</span>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}