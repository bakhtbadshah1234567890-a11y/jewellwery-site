import { Link } from 'react-router-dom'

const standardsDetail = [
  {
    num: '01',
    name: 'Craftsmanship by Hand',
    subtitle: 'Third-Generation Master Jewellers',
    body: 'Every HEIREST piece is finished by hand: set, polished and inspected by master jewellers with decades of heritage experience in fine jewellery creation. Modern engineering guarantees precision, while hand-finishing ensures character, warmth, and enduring quality.',
    bullets: ['Micro-prong and bezel settings secured by hand', 'High-polish mirror finish inspected under 10x magnification', 'Custom laser and hand engravings available'],
    img: '/pics/pic%2011.webp',
  },
  {
    num: '02',
    name: 'Uncompromised Materials',
    subtitle: 'Ethical Diamonds & 100% Recycled Metals',
    body: 'We exclusively work with 100% recycled solid gold (9K, 14K, 18K) and 950 platinum. Our lab-grown diamonds are identical to mined diamonds in chemical, optical, and physical composition — with zero ecological compromise or opaque supply chains.',
    bullets: ['Type IIa lab diamonds of top 2% global purity', 'Full IGI and GIA certification included with every center stone', '100% recycled precious metals certified by the Responsible Jewellery Council'],
    img: '/pics/journal-cert.jpg',
  },
  {
    num: '03',
    name: 'Complimentary Worldwide Shipping',
    subtitle: 'Insured, Discreet & Tracked Delivery',
    body: 'Every commission is prepared with exacting care and packaged in our signature luxury presentation box. We provide complimentary insured express shipping worldwide so your piece arrives securely at your door ready to cherish.',
    bullets: ['Fully insured door-to-door transit', 'Signature required upon delivery for peace of mind', 'Complimentary gift packaging and certificate vault included'],
    img: '/pics/journal-docs.jpg',
  },
  {
    num: '04',
    name: 'Lifetime Manufacturing Warranty',
    subtitle: 'Built for a Lifetime of Wear',
    body: 'Your piece is made to last. Our comprehensive lifetime manufacturing warranty supports the structural integrity and craftsmanship behind every HEIREST design. We stand behind every ring, necklace, bracelet, and earring forever.',
    bullets: ['Lifetime coverage against any manufacturing defects', 'Complimentary annual prong inspection and professional ultrasonic cleaning', 'Full repair and re-sizing support via our Auckland & Sydney studios'],
    img: '/pics/necklace.jpg',
  },
]

export default function StandardsPage() {
  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Header */}
      <div className="px-5 sm:px-10 lg:px-16 mx-auto max-w-7xl mb-16">
        <div className="border-b border-neutral-200 pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            The HEIREST Promise
          </p>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900 max-w-3xl">
            Our Standards
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Fine jewellery has long been defined by high markups and opaque pricing. We exist to reset that standard with modern engineering, total visibility, and craft that lasts generations.
          </p>
        </div>
      </div>

      {/* Standards Sections */}
      <div className="px-5 sm:px-10 lg:px-16 mx-auto max-w-7xl space-y-20">
        {standardsDetail.map((item, idx) => (
          <section
            key={item.num}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <span className="font-mono text-sm text-neutral-400 block mb-2">{item.num} // STANDARD</span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900 mb-1">
                {item.name}
              </h2>
              <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4">
                {item.subtitle}
              </p>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6">
                {item.body}
              </p>
              <ul className="space-y-2.5 font-mono text-xs text-neutral-600">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="text-neutral-900">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`lg:col-span-6 overflow-hidden rounded-lg bg-neutral-100 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-90 sm:h-105 object-cover"
                loading="lazy"
              />
            </div>
          </section>
        ))}
      </div>

      {/* CTA Bottom Banner */}
      <div className="mt-24 bg-[#faf8f5] py-16 px-5 sm:px-10 border-t border-neutral-200 text-center">
        <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 mb-4">
          Authored by you. Made to outlast trends.
        </h2>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto mb-6">
          Ready to design your personal heirloom piece with our bespoke team or 3D configurator?
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/shop"
            className="rounded bg-neutral-900 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white hover:opacity-85"
          >
            Explore Designs
          </Link>
          <Link
            to="/bespoke"
            className="rounded border border-neutral-900 px-6 py-3 font-mono text-xs uppercase tracking-widest text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            Custom Bespoke
          </Link>
        </div>
      </div>
    </div>
  )
}
