'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0)

  const goTo = (i: number) => {
    const total = images.length
    setIndex(((i % total) + total) % total)
  }

  return (
    <div className="mx-auto max-w-5xl px-8 pb-24 md:px-0">
      <h2 className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-white/40">Mais telas</h2>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-2">
        {images.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
          >
            <Image src={img} alt={`${title} tela ${i + 1}`} fill className="object-cover object-top" />
          </div>
        ))}

        {images.length > 1 && (
          <>
            {/* Sombras nas bordas laterais, garantem contraste pro botão independente da cor da imagem */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/40 to-transparent" />

            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Tela anterior"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-md transition-colors duration-500 ease-out hover:bg-black/70 hover:border-white/40"
            >
              <ChevronLeft size={18} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Próxima tela"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-md transition-colors duration-500 ease-out hover:bg-black/70 hover:border-white/40"
            >
              <ChevronRight size={18} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir para tela ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                i === index ? 'w-6 bg-accent' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}