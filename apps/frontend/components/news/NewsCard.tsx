import React from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/types';
import { formatDate, slugify } from '@/lib/format';
import ImageCarousel from './ImageCarousel';
import ZapButton from './ZapButton';

type Props = { post: Post; variant?: 'grid' | 'lead' | 'row' };

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block w-fit rounded-sm bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/80">
    {children}
  </span>
);

// O título é um <a> esticado (after:inset-0) sobre o card inteiro. Carrossel e botão de zap
// ficam acima (z-10/z-20) para continuarem clicáveis.
const TitleLink = ({ post, className }: { post: Post; className: string }) => (
  <h3 className={className}>
    <Link href={`/noticia/${post.slug}`} className="after:absolute after:inset-0 hover:text-[var(--accent)] transition-colors">
      {post.title}
    </Link>
  </h3>
);

export default function NewsCard({ post, variant = 'grid' }: Props) {
  const meta = (
    <span className="text-xs text-white/45">
      {post.author} · {formatDate(post.publishedAt)}
    </span>
  );

  if (variant === 'row') {
    return (
      <article className="relative flex gap-3 border-b border-white/10 py-3 last:border-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.images[0]} alt="" className="h-[72px] w-24 shrink-0 object-cover bg-neutral-900" loading="lazy" />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <TitleLink post={post} className="font-serif text-[15px] leading-snug text-white line-clamp-2" />
          <div className="mt-auto flex items-center justify-between gap-2">
            <span className="text-[11px] text-white/45">{formatDate(post.publishedAt)}</span>
            <ZapButton postId={post.id} title={post.title} count={post.zapsCount} size="sm" />
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'lead') {
    return (
      <article className="relative flex flex-col gap-3">
        <ImageCarousel images={post.images} alt={post.title} className="aspect-[16/10]" />
        <Chip>{post.category}</Chip>
        <TitleLink post={post} className="font-serif text-2xl leading-tight text-white" />
        <p className="line-clamp-2 text-sm leading-relaxed text-white/60">{post.excerpt}</p>
        <div className="flex items-center justify-between gap-3">
          {meta}
          <ZapButton postId={post.id} title={post.title} count={post.zapsCount} />
        </div>
      </article>
    );
  }

  return (
    <article className="relative flex flex-col border border-white/10 bg-[#14181d]">
      <ImageCarousel images={post.images} alt={post.title} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link href={`/category/${slugify(post.category)}`} className="relative z-10 w-fit">
          <Chip>{post.category}</Chip>
        </Link>
        <TitleLink post={post} className="font-serif text-lg leading-snug text-white" />
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          {meta}
          <ZapButton postId={post.id} title={post.title} count={post.zapsCount} />
        </div>
      </div>
    </article>
  );
}
