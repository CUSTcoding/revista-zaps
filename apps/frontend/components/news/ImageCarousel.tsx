'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MAX_IMAGES } from '@/lib/site';

type Props = { images: string[]; alt: string; className?: string };

// Uma foto: imagem simples. 2 a 5 fotos: carrossel com setas e bolinhas.
// No card, o link do título cobre a área toda; o carrossel fica acima (z-10) para poder deslizar.
export default function ImageCarousel({ images, alt, className = 'aspect-[4/3]' }: Props) {
  const list = images.slice(0, MAX_IMAGES);

  if (list.length <= 1) {
    return (
      <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={list[0]} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }

  return (
    <div
      className={`relative z-10 overflow-hidden bg-neutral-900 ${className}`}
      style={{
        ['--swiper-navigation-color' as string]: '#fff',
        ['--swiper-navigation-size' as string]: '16px',
        ['--swiper-pagination-color' as string]: 'var(--accent, #F7931A)',
        ['--swiper-pagination-bullet-inactive-color' as string]: '#fff',
        ['--swiper-pagination-bullet-inactive-opacity' as string]: '0.5',
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        className="h-full w-full"
      >
        {list.map((src, i) => (
          <SwiperSlide key={src + i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${alt} (foto ${i + 1} de ${list.length})`} className="h-full w-full object-cover" loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>
      <span className="pointer-events-none absolute right-2 top-2 z-10 rounded-sm bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white">
        {list.length} fotos
      </span>
    </div>
  );
}
