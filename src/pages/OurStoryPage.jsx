import { Link } from 'react-router-dom'

export default function OurStoryPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      {/* Hero Header */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center pt-8 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3">
          Our Heritage & Ethos
        </p>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900 leading-tight">
          Fine jewellery reimagined for modern heirlooms.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto">
          GEMLY was founded on a singular conviction: that extraordinary fine jewellery should be defined by impeccable craftsmanship, transparent integrity, and personal storytelling—not antiquated markups or opaque supply chains.
        </p>
      </div>

      {/* Editorial Split Hero Imagery */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="aspect-4/5 overflow-hidden rounded-lg bg-neutral-100 shadow-lg">
            <img
              src="/pics/pic 2.jpg"
              alt="Artisan sculpting fine ring at bench"
              className="size-full object-cover"
            />
          </div>
          <div className="space-y-6 md:pl-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D6C2A1]">
              Pillar 01 • Transparent Luxury
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 leading-snug">
              Direct from the master bench to your hands.
            </h2>
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
              Traditional luxury jewellery travels through brokers, wholesalers, and retail boutiques, multiplying its cost by up to eight times before reaching the wearer. We operate our own dedicated workshop and work directly with ethical diamond laboratories.
            </p>
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
              By investing every dollar directly into superior diamond grades, solid substantial gold weights, and master hand-setting, we deliver pieces of museum-grade quality at accessible direct-to-consumer pricing.
            </p>
            <div className="pt-2">
              <Link
                to="/standards"
                className="font-mono text-xs uppercase tracking-widest text-neutral-900 underline hover:opacity-70"
              >
                Inspect our craftsmanship standards →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Statement Band */}
      <section className="bg-[#FAF9F6] border-y border-neutral-200 py-20 px-5 sm:px-8 lg:px-12 mb-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            Conscious Creation
          </span>
          <blockquote className="mt-6 text-2xl sm:text-3xl font-light text-neutral-900 leading-relaxed italic font-serif">
            "Jewellery should not be preserved in dark velvet boxes for rare occasions. We design pieces of architectural balance and tactile comfort intended to be lived in, layered, and loved every single day."
          </blockquote>
          <div className="mt-6 font-mono text-xs uppercase tracking-widest text-neutral-500">
            — GEMLY Atelier Guild
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="border-t border-neutral-200 pt-6">
            <span className="font-mono text-sm text-neutral-400">01</span>
            <h3 className="text-xl font-normal text-neutral-900 mt-2 mb-3">
              Certified Cultivated Diamonds
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We exclusively select Type IIa lab-grown diamonds of D/E/F color and VS1+ clarity. Atomically, chemically, and optically identical to mined diamonds, without ecological degradation or conflict.
            </p>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <span className="font-mono text-sm text-neutral-400">02</span>
            <h3 className="text-xl font-normal text-neutral-900 mt-2 mb-3">
              100% Recycled Precious Gold
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Every ring, pendant, and clasp is cast using refined, certified recycled 9K, 14K, 18K gold and 950 platinum, eliminating reliance on virgin metal extraction and minimizing carbon footprint.
            </p>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <span className="font-mono text-sm text-neutral-400">03</span>
            <h3 className="text-xl font-normal text-neutral-900 mt-2 mb-3">
              Lifetime Guarantee
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Because every piece is crafted with solid metal chambers and burnished bezel settings, we stand behind our work for a lifetime with complimentary annual maintenance and prong inspections.
            </p>
          </div>
        </div>
      </div>

      {/* Atelier CTA */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center pt-8">
        <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900">
          Begin your heirloom journey.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
          Explore our permanent archive of bezel-set designs or collaborate with our designers on a bespoke one-of-a-kind commission.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto rounded bg-neutral-900 px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
          >
            Explore The Archive
          </Link>
          <Link
            to="/bespoke"
            className="w-full sm:w-auto rounded border border-neutral-300 px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-neutral-900 hover:border-neutral-900 transition-colors"
          >
            Design Bespoke
          </Link>
        </div>
      </div>
    </div>
  )
}
