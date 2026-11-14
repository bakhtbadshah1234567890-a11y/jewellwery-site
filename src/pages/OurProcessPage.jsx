import { Link } from 'react-router-dom'

const steps = [
  {
    num: '01',
    title: 'Discovery & Aesthetic Vision',
    subtitle: 'From concept to architectural silhouette',
    description:
      'Every piece begins with an exploration of form, balance, and proportions. Whether commissioning a one-of-a-kind bespoke piece or choosing from our permanent archive, we examine finger contours, stone scale, and bezel depth to ensure ergonomic daily comfort.',
    tag: 'Design Phase',
  },
  {
    num: '02',
    title: 'Gemstone Curation & Sourcing',
    subtitle: 'Type IIa cultivated lab diamonds and fine gemstones',
    description:
      'We individually inspect each gemstone for optical clarity, table symmetry, and pavilion depth. We select exclusively D, E, and F colorless diamonds with VS1+ clarity and triple excellent cut grades, ensuring exceptional fire and scintillation.',
    tag: 'Gemology',
  },
  {
    num: '03',
    title: '3D CAD & Precision Wax Prototyping',
    subtitle: 'Sub-millimeter digital sculpting',
    description:
      'Using advanced stereolithography 3D printers, we generate a high-definition wax model of the piece. This allows us to verify gemstone seat tolerances down to 0.05mm, ensuring a glove-like fit before pouring precious molten gold.',
    tag: 'Technology',
  },
  {
    num: '04',
    title: 'Precious Metal Lost-Wax Casting',
    subtitle: '100% recycled 9K, 14K, 18K gold and 950 platinum',
    description:
      'The wax model is invested in ceramic plaster and burned out at 750°C. Molten recycled gold or platinum is vacuum-cast into the negative void, creating a dense, solid, void-free precious metal core with no hollow cavities.',
    tag: 'Metallurgy',
  },
  {
    num: '05',
    title: 'Master Hand-Setting Under Magnification',
    subtitle: 'Hand-burnished bezels and micro-pavé',
    description:
      'Under 40x stereomicroscopes, our master stone setters hand-seat each diamond. The gold bezel rim is meticulously rolled, hammered, and burnished around the gem girdle, eliminating snagging prongs while protecting the gemstone edges for life.',
    tag: 'Artisanship',
  },
  {
    num: '06',
    title: 'Hand Finishing & Multi-Stage Polishing',
    subtitle: 'Satin brushed shoulders and mirror rims',
    description:
      'Using diamond pastes, muslin wheels, and fine jeweler rouge, our finishers hand-buff every surface. We achieve contrasting textures—mirror-polished bezel borders alongside silky satin-brushed shanks.',
    tag: 'Finishing',
  },
  {
    num: '07',
    title: 'Multi-Point Quality Control & Hallmarking',
    subtitle: 'Tension testing and laser stamping',
    description:
      'Each piece undergoes ultrasonic testing, prong and bezel tension checks, and laser fineness hallmarking to certify metal karat purity and GEMLY authenticity.',
    tag: 'Certification',
  },
  {
    num: '08',
    title: 'Signature Presentation & Insured Delivery',
    subtitle: 'Complimentary worldwide express courier',
    description:
      'Your finished heirloom is nestled in our custom velvet jewel case, accompanied by its digital certificate of authenticity, appraisal paperwork, and lifetime warranty documentation. Dispatched in discreet, tamper-evident security packaging.',
    tag: 'White Glove',
  },
]

export default function OurProcessPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      {/* Page Header */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center pt-8 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3">
          Atelier Methodology
        </p>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900 leading-tight">
          How exceptional fine jewellery is born.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
          From the initial hand sketch to the final mirror polish, explore the eight meticulous stages every GEMLY piece undertakes in our dedicated workshop.
        </p>
      </div>

      {/* Visual Timeline Section */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 mb-24">
        <div className="relative border-l-2 border-neutral-200 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-16">
          {steps.map((step) => (
            <div key={step.num} className="relative group">
              {/* Bullet number badge */}
              <div className="absolute -left-[35px] sm:-left-[59px] top-0 flex size-9 sm:size-10 items-center justify-center rounded-full bg-neutral-900 font-mono text-xs sm:text-sm text-white shadow-md">
                {step.num}
              </div>

              {/* Step content */}
              <div className="bg-[#FAF9F6] border border-neutral-200/80 rounded-lg p-6 sm:p-8 transition-all hover:border-neutral-900 hover:shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#D6C2A1] font-semibold">
                    {step.tag}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                    Stage {step.num} of 08
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 mb-1">
                  {step.title}
                </h2>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4">
                  {step.subtitle}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bespoke Invitation CTA */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center bg-[#FAF9F6] border border-neutral-200 rounded-xl py-16">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Commission a Bespoke Creation
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-normal text-neutral-900">
          Ready to experience the process firsthand?
        </h2>
        <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
          Book an in-studio appointment or virtual video consultation with our head jewelry designer.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/bespoke"
            className="w-full sm:w-auto rounded bg-neutral-900 px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
          >
            Book Bespoke Consultation
          </Link>
          <Link
            to="/standards"
            className="w-full sm:w-auto rounded border border-neutral-300 px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-neutral-900 hover:border-neutral-900 transition-colors"
          >
            Review Material Standards
          </Link>
        </div>
      </div>
    </div>
  )
}
