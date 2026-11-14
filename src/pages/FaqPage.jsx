import { useState } from 'react'
import { Link } from 'react-router-dom'

const faqCategories = [
  {
    category: 'Ordering & Production',
    items: [
      {
        q: 'How long does my order take to produce?',
        a: 'Every piece is made to order specifically for you. Standard orders take 3 to 4 weeks for handcrafted production and hallmarking before dispatch. Bespoke commissions typically take 4 to 6 weeks.',
      },
      {
        q: 'Can I view or try on pieces before purchasing?',
        a: 'Yes. You can visit our trunk shows or book a private appointment at our Auckland and Sydney studios. We also ship physical sizing kits directly to your home with full store credit included.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Because production begins promptly, we allow changes or cancellations within 48 hours of order confirmation. Please contact concierge@gemly.com immediately.',
      },
    ],
  },
  {
    category: 'Materials & Diamonds',
    items: [
      {
        q: 'Are your diamonds real diamonds?',
        a: 'Yes, 100%. Our lab-grown diamonds are real diamonds possessing identical physical, chemical, and optical properties as mined diamonds. They are certified by IGI or GIA.',
      },
      {
        q: 'What metals do you use?',
        a: 'We use 100% recycled 9K, 14K, and 18K solid gold (Yellow, White, and Rose) as well as 950 platinum. We never use gold plating, vermeil, or hollow construction.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'Do you offer worldwide shipping?',
        a: 'Yes, we provide complimentary worldwide shipping with full door-to-door insurance and signature verification on all orders.',
      },
      {
        q: 'How is the package delivered?',
        a: 'Packages arrive in discreet outer packaging with no mention of jewellery or high value to ensure absolute security.',
      },
    ],
  },
  {
    category: 'Warranty & Repairs',
    items: [
      {
        q: 'What is covered under the lifetime warranty?',
        a: 'Our lifetime manufacturing warranty covers any defects in craftsmanship, setting, or materials. We also offer complimentary annual prong inspections and cleaning.',
      },
      {
        q: 'Can rings be resized?',
        a: 'Yes. Most solitaire and bezel rings can be resized within 1 to 2 sizes. Eternity bands with diamonds around the entire circumference require custom remaking, which is why we recommend using our sizing kit first.',
      },
    ],
  },
]

export default function FaqPage() {
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="px-5 sm:px-10 lg:px-16 mx-auto max-w-4xl">
        <div className="border-b border-neutral-200 pb-10 mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Client Support
          </p>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            Everything you need to know about our craftsmanship, ordering process, shipping, and lifetime warranty.
          </p>
        </div>

        <div className="space-y-12">
          {faqCategories.map((cat, catIdx) => (
            <div key={cat.category}>
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4 pb-2 border-b border-neutral-100">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item, itemIdx) => {
                  const isOpen = !!openItems[`${catIdx}-${itemIdx}`]
                  return (
                    <div key={item.q} className="border border-neutral-200 rounded-md p-4 bg-[#faf9f8]">
                      <button
                        type="button"
                        onClick={() => toggleItem(catIdx, itemIdx)}
                        className="flex w-full items-center justify-between text-left font-medium text-neutral-900 text-sm sm:text-base"
                      >
                        <span>{item.q}</span>
                        <span className="font-mono text-lg">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2 border-t border-neutral-200">
                          {item.a}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-[#f7f6f4] p-8 text-center border border-neutral-200">
          <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-neutral-600 mb-4">
            Our concierge team is available 7 days a week to assist with custom requests and sizing guidance.
          </p>
          <Link
            to="/contact"
            className="inline-block rounded bg-neutral-900 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:opacity-85"
          >
            Contact Concierge
          </Link>
        </div>
      </div>
    </div>
  )
}
