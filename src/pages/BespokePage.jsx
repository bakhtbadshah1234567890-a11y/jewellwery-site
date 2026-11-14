import { useState } from 'react'

const bespokeSteps = [
  {
    step: '01',
    title: 'Consultation & Vision',
    desc: 'Share your inspiration, sketches, or reference pieces. We discuss metal choices, gemstone cuts, and design proportions tailored to your vision.',
  },
  {
    step: '02',
    title: '3D Photorealistic Rendering',
    desc: 'Liam and our design engineering team develop exact 3D models of your bespoke piece, allowing you to review every curve, bezel, and prong setting in photorealistic fidelity.',
  },
  {
    step: '03',
    title: 'Considered Sourcing',
    desc: 'We curate conflict-free lab-grown or certified natural diamonds matched to your exact cut, color, clarity, and carat preferences with full provenance documentation.',
  },
  {
    step: '04',
    title: 'Master Hand-Finishing',
    desc: 'Crafted, set, and hand-polished by third-generation master jewellers. Every piece undergoes thorough quality inspection before complimentary worldwide insured delivery.',
  },
]

const faqs = [
  {
    q: 'What can I create through the bespoke service?',
    a: 'Anything outside the standard configurator: a natural diamond piece, an alternative setting, a colored gemstone, or a fully custom engagement ring or heirloom signet from scratch.',
  },
  {
    q: 'How long does a bespoke commission take?',
    a: 'Typically 4 to 6 weeks from initial design approval to final delivery. Expedited options can be accommodated upon request.',
  },
  {
    q: 'Is there a consultation fee?',
    a: 'No. Initial consultations and 3D concept reviews are complimentary. A deposit is only required once you approve your final design and proceed to production.',
  },
]

export default function BespokePage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', metal: '14k-yellow-gold', budget: '$3,000 - $6,000', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Hero Section */}
      <div className="px-5 sm:px-10 lg:px-16 mx-auto max-w-7xl mb-16">
        <div className="border-b border-neutral-200 pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Custom Commissions
          </p>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900 max-w-3xl leading-tight">
            Build your bespoke GEMLY piece
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Our bespoke service is a dedicated process for commissions that go beyond our configurator — designed with you, made to last a lifetime.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg bg-neutral-100">
          <img
            src="/pics/bespoke-hero.jpg"
            alt="Handcrafting a bespoke diamond ring"
            className="w-full h-95 sm:h-125 object-cover"
          />
        </div>
      </div>

      {/* Brittany & Callum Feature */}
      <section className="bg-[#faf8f5] py-16 px-5 sm:px-10 lg:px-16 border-y border-neutral-200">
        <div className="mx-auto max-w-5xl text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-3">
            Bespoke Archive • Case Study
          </span>
          <blockquote className="text-xl sm:text-3xl font-light text-neutral-900 leading-relaxed italic max-w-4xl mx-auto">
            &ldquo;I came to GEMLY with a sketch and a rough idea of what I wanted. What came back was a design and a 3D render that looked exactly like the ring I had in my head.&rdquo;
          </blockquote>
          <div className="mt-6 font-mono text-xs uppercase tracking-wider text-neutral-600">
            Author: Brittany & Callum • 11:07:26 • Bespoke Oval Engagement Ring
          </div>
        </div>
      </section>

      {/* The Bespoke Process */}
      <section className="py-20 px-5 sm:px-10 lg:px-16 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">How We Work</p>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900">
            The Bespoke Process
          </h2>
          <p className="mt-2 text-sm text-neutral-600">For pieces that don&apos;t fit a template.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bespokeSteps.map((step) => (
            <div key={step.step} className="border border-neutral-200 rounded-lg p-6 bg-white shadow-xs">
              <span className="font-mono text-2xl font-light text-neutral-400 block mb-3">
                {step.step}
              </span>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Commission Inquiry Form */}
      <section className="bg-[#f7f6f4] py-20 px-5 sm:px-10 lg:px-16 border-y border-neutral-200">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">Start A Commission</p>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900">
              Submit Your Bespoke Inquiry
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Tell us what you are envisioning. We typically respond within 24 hours with concept guidance.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-lg p-8 text-center border border-neutral-300">
              <h3 className="font-mono text-base uppercase tracking-wider text-neutral-900 mb-2">
                Inquiry Received
              </h3>
              <p className="text-sm text-neutral-600">
                Thank you for getting in touch. Liam and our bespoke concierge will reach out to you shortly to begin discussing your piece.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 sm:p-10 border border-neutral-200 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded border border-neutral-300 px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded border border-neutral-300 px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Preferred Metal</label>
                  <select
                    value={formData.metal}
                    onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
                    className="w-full rounded border border-neutral-300 px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                  >
                    <option value="14k-yellow-gold">14K Yellow Gold</option>
                    <option value="18k-yellow-gold">18K Yellow Gold</option>
                    <option value="14k-white-gold">14K White Gold</option>
                    <option value="14k-rose-gold">14K Rose Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Target Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full rounded border border-neutral-300 px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                  >
                    <option value="$2,000 - $4,000">$2,000 - $4,000 NZD</option>
                    <option value="$4,000 - $8,000">$4,000 - $8,000 NZD</option>
                    <option value="$8,000 - $15,000">$8,000 - $15,000 NZD</option>
                    <option value="$15,000+">$15,000+ NZD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Describe Your Vision</label>
                <textarea
                  rows={4}
                  required
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about the ring, necklace, stones, engraving or ideas you have in mind..."
                  className="w-full rounded border border-neutral-300 px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded bg-neutral-900 py-3.5 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85"
              >
                Submit Bespoke Commission →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Bespoke FAQ */}
      <section className="py-16 px-5 sm:px-10 lg:px-16 mx-auto max-w-3xl">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={f.q} className="border border-neutral-200 rounded p-4">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between text-left font-medium text-neutral-900 text-sm sm:text-base"
              >
                <span>{f.q}</span>
                <span className="font-mono text-lg">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2 border-t border-neutral-100">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
