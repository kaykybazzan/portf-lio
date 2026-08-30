import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function ContactCTA() {
  return (
    <div className="border-t border-white/10 px-8 py-16 text-center md:px-16">
      <p className="text-2xl font-medium tracking-tight sm:text-3xl">
        Gostou do que viu? Vamos conversar.
      </p>
      <Link
        href="/#footer"
        className="group mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm text-white transition-colors duration-500 ease-out hover:bg-white hover:text-black"
      >
        Entrar em contato
        <ArrowUpRight
          size={14}
          className="transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </div>
  )
}