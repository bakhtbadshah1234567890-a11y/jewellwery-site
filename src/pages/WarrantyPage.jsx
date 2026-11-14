import { Link } from 'react-router-dom'

export default function WarrantyPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center pt-8 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3">
          Enduring Commitment
        </p>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900 leading-tight">
          Lifetime Manufacturing Warranty
        </h1>
        <p className="mt-6 text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
          Every GEMLY fine jewellery piece is engineered to become an enduring heirloom. We guarantee every creation against manufacturing and structural defects for life.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 space-y-16">
        {/* Core Warranty Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-neutral-200 rounded-lg p-8 bg-[#FAF9F6]">
            <h2 className="text-xl font-normal text-neutral-900 mb-4 flex items-center gap-2">
              <span className="text-emerald-700">✓</span> What Is Fully Covered
            </h2>
            <ul className="space-y-3 font-mono text-xs text-neutral-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-neutral-900">•</span>
                <span>Structural casting or metallurgical alloy imperfections.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900">•</span>
                <span>Prong or bezel setting loosening through regular everyday wear.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900">•</span>
                <span>Loss of micro-pavé diamonds under 0.05ct due to a setting flaw.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900">•</span>
                <span>Annual ultrasonic steam cleaning, inspection, and polish.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900">•</span>
                <span>White gold rhodium electroplating refresh once per calendar year.</span>
              </li>
            </ul>
          </div>

          <div className="border border-neutral-200 rounded-lg p-8 bg-[#FAF9F6]">
            <h2 className="text-xl font-normal text-neutral-900 mb-4 flex items-center gap-2">
              <span className="text-neutral-400">✕</span> What Is Excluded
            </h2>
            <ul className="space-y-3 font-mono text-xs text-neutral-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-neutral-400">•</span>
                <span>Normal surface scratching and patina of high-polish gold over time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400">•</span>
                <span>Catastrophic trauma, crushing, or heavy blunt impact damages.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400">•</span>
                <span>Loss, theft, or disappearance of the piece (covered by private insurance).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400">•</span>
                <span>Modifications, sizing, or repair attempted by an unauthorized external jeweler.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Complimentary Annual Servicing */}
        <section className="border-t border-neutral-200 pt-12">
          <div className="bg-neutral-900 text-white rounded-xl p-8 sm:p-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D6C2A1]">
              Heirloom Maintenance Service
            </span>
            <h2 className="text-3xl font-normal mt-2 mb-4">
              Annual Spa Care For Your Jewellery
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
              Fine jewellery should be inspected once a year to ensure everyday activities like gym workouts, door handles, or accidental bumps haven't shifted bezel tension. Send your piece to our atelier or visit our studio for a same-day complimentary spa treatment.
            </p>
            <Link
              to="/contact"
              className="inline-block rounded bg-[#EDE8E1] text-neutral-900 px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              Book Complimentary Inspection
            </Link>
          </div>
        </section>

        {/* Care Instructions */}
        <section className="border-t border-neutral-200 pt-12">
          <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 mb-6">
            Recommended Daily Care
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-neutral-600">
            <div className="p-5 border border-neutral-200 rounded">
              <h3 className="text-neutral-900 font-semibold uppercase mb-2">Gentle Cleansing</h3>
              <p className="normal-case font-sans">
                Soak in lukewarm water with mild dish soap. Gently brush around stones with a baby soft toothbrush, rinse, and pat dry with microfiber.
              </p>
            </div>
            <div className="p-5 border border-neutral-200 rounded">
              <h3 className="text-neutral-900 font-semibold uppercase mb-2">Chemical Exposure</h3>
              <p className="normal-case font-sans">
                Remove rings before handling chlorine pools, household bleach, harsh skincare acids, or vigorous weightlifting.
              </p>
            </div>
            <div className="p-5 border border-neutral-200 rounded">
              <h3 className="text-neutral-900 font-semibold uppercase mb-2">Dedicated Storage</h3>
              <p className="normal-case font-sans">
                Store each piece in its own fabric-lined compartment. Diamonds are the hardest material on earth and can scratch other gold or gemstones if rubbing together.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
