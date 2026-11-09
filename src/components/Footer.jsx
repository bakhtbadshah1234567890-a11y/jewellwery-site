import { useEffect, useState } from 'react'

const standards = [
  'Clarity and transparency at every step',
  'Complimentary worldwide shipping',
  'Lifetime manufacturing warranty',
  'Every piece crafted by hand',
]

const shopLinks = ['Shop All', 'Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Pendants']
const aboutLinks = ['Our Story', 'Our Standards', 'Our Process', 'Journal', 'Bespoke', 'FAQ']
const customerLinks = ['My Account', 'Contact Us', 'Product Care', 'Shipping', 'Warranty, Repairs & Returns', 'Loyalty']

export default function Footer() {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      )
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="bg-white text-neutral-900 border-t border-neutral-200" aria-label="Site footer">
      {/* Footer Ticker */}
      <div className="overflow-hidden border-b-2 border-dotted border-black py-4 bg-[#fbfaf8]">
        <div className="flex w-max animate-[standards-ticker-scroll_32s_linear_infinite]">
          {[...standards, ...standards, ...standards].map((text, i) => (
            <span
              key={text + i}
              className="flex items-center gap-6 px-8 font-mono text-xs uppercase tracking-widest whitespace-nowrap text-neutral-800"
            >
              <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              className="text-2xl sm:text-3xl font-semibold tracking-[0.14em] text-neutral-900"
            >
              HEIREST
            </a>
            <p className="max-w-sm text-sm text-neutral-600 leading-relaxed">
              Modern engineering with a reverence for craft. Author what others inherit — with complete clarity, visibility, and fine materials made for a lifetime of wear.
            </p>
            <div className="pt-2 font-mono text-xs uppercase tracking-wider text-neutral-500">
              Auckland, New Zealand • Sydney, Australia
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-900 mb-4 font-semibold">
              Shop
            </h4>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wider text-neutral-600">
              {shopLinks.map((label) => (
                <li key={label}>
                  <a href="#shop" className="hover:text-neutral-900 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-900 mb-4 font-semibold">
              About
            </h4>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wider text-neutral-600">
              {aboutLinks.map((label) => (
                <li key={label}>
                  <a href="#about" className="hover:text-neutral-900 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-900 mb-4 font-semibold">
              Customer Care
            </h4>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wider text-neutral-600">
              {customerLinks.map((label) => (
                <li key={label}>
                  <a href="#care" className="hover:text-neutral-900 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#terms" className="hover:text-neutral-900">Terms & Conditions</a>
            <a href="#privacy" className="hover:text-neutral-900">Privacy Policy</a>
            <a href="#cookies" className="hover:text-neutral-900">Cookies</a>
            <span>Site by S/A</span>
          </div>

          <div className="flex items-center gap-6">
            {timeString && (
              <span className="tabular-nums font-mono text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded">
                {timeString}
              </span>
            )}
            <span>© HEIREST, 2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
