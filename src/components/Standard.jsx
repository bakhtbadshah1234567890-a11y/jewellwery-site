import { useState } from 'react'

const standards = [
  {
    name: 'Craft',
    description:
      'Every HEIREST piece is finished by hand: set, polished and inspected by third-generation jewellers with decades of experience in fine jewellery creation. Modern engineering ensures precision and consistency at every step.',
  },
  {
    name: 'Quality',
    description:
      'We select considered materials and carefully inspect every detail, creating fine jewellery made to be worn, treasured and passed down.',
  },
  {
    name: 'Shipping',
    description:
      'Every piece is prepared with care and shipped securely, with complimentary worldwide delivery so your jewellery arrives ready to treasure.',
  },
  {
    name: 'Warranty',
    description:
      'Your piece is made to last. Our lifetime manufacturing warranty supports the quality and craftsmanship behind every HEIREST design.',
  },
]

export default function Standard() {
  const [activeStandard, setActiveStandard] = useState(0)
  const active = standards[activeStandard]

  return (
    <section className="standards-feature" aria-labelledby="standards-feature-title">
      <div className="standards-feature__navigation">
        <p id="standards-feature-title" className="standards-feature__eyebrow">
          Our standards
        </p>
        <div className="standards-feature__tabs" role="tablist" aria-label="Our standards">
          {standards.map((standard, index) => (
            <button
              aria-selected={activeStandard === index}
              className={`standards-feature__tab ${activeStandard === index ? 'is-active' : ''}`}
              id={`standard-tab-${index}`}
              key={standard.name}
              onClick={() => setActiveStandard(index)}
              role="tab"
              type="button"
            >
              {activeStandard === index && <span aria-hidden="true">• </span>}
              {standard.name}
            </button>
          ))}
        </div>
      </div>

      <div
        aria-labelledby={`standard-tab-${activeStandard}`}
        className="standards-feature__content"
        role="tabpanel"
      >
        <p>{active.description}</p>
        <a className="standards-feature__learn-more rounded-md" href="#bespoke">
          Learn more
        </a>
      </div>

      <img
        className="standards-feature__image"
        src="/pics/pic%2011.webp"
        alt="Jeweller carefully measuring a diamond"
        loading="lazy"
      />
    </section>
  )
}