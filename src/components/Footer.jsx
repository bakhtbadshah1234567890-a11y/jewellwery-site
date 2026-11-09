import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FooterLogo from './FooterLogo.jsx'

const shopLinks = [
  { name: 'Shop All', href: '/shop' },
  { name: 'Rings', href: '/shop?cat=RINGS' },
  { name: 'Earrings', href: '/shop?cat=EARRINGS' },
  { name: 'Necklaces', href: '/shop?cat=NECKLACES' },
  { name: 'Bracelets', href: '/shop?cat=BRACELETS' },
  { name: 'Pendants', href: '/shop?cat=PENDANTS' },
]

const aboutLinks = [
  { name: 'Our Story', href: '/journal' },
  { name: 'Our Standards', href: '/standards' },
  { name: 'Our Process', href: '/standards' },
  { name: 'Journal', href: '/journal' },
  { name: 'Bespoke', href: '/bespoke' },
  { name: 'FAQ', href: '/faq' },
]

const customerLinks = [
  { name: 'My Account', href: '/contact' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Product Care', href: '/standards' },
  { name: 'Shipping', href: '/standards' },
  { name: 'Warranty, Repairs & Returns', href: '/standards' },
  { name: 'Loyalty', href: '/contact' },
]

export default function Footer() {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const d = new Date()
      let h = d.getHours()
      const ampm = h >= 12 ? 'PM' : 'AM'
      h = h % 12
      if (h === 0) h = 12
      const pad = (n) => (n < 10 ? '0' + n : n)
      setTimeString(`${pad(h)}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${ampm}`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer
      aria-label="Site footer"
      className="bg-[#68001e] text-[#fefdfc] border-t border-dotted border-white/40 font-mono"
    >
      <div className="w-full px-5 sm:px-8 lg:px-14 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-y-10 gap-x-6 lg:gap-x-8">
          {/* Column 1: SHOP */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <p className="text-[13px] uppercase tracking-wider text-white/50 mb-4 font-normal">
              SHOP
            </p>
            <ul className="space-y-2 text-[13px] leading-relaxed">
              {shopLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-[#fefdfc] transition-opacity hover:opacity-70"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: ABOUT */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <p className="text-[13px] uppercase tracking-wider text-white/50 mb-4 font-normal">
              ABOUT
            </p>
            <ul className="space-y-2 text-[13px] leading-relaxed">
              {aboutLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-[#fefdfc] transition-opacity hover:opacity-70"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <p className="text-[13px] uppercase tracking-wider text-white/50 mb-4 font-normal">
              CUSTOMER CARE
            </p>
            <ul className="space-y-2 text-[13px] leading-relaxed">
              {customerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-[#fefdfc] transition-opacity hover:opacity-70"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Dotted Monogram */}
          <div className="col-span-2 md:col-span-6 lg:col-span-5 flex justify-center lg:justify-end items-start pt-2 lg:pr-8">
            <FooterLogo className="w-40 sm:w-48 lg:w-52 h-auto" />
          </div>
        </div>

        {/* Bottom Bar: Legal & Clock */}
        <div className="mt-20 sm:mt-28 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] sm:text-xs uppercase tracking-wider text-white">
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 sm:gap-x-10 gap-y-2">
            <Link to="/faq" className="hover:opacity-70 transition-opacity">
              TERMS &amp; CONDITIONS
            </Link>
            <Link to="/faq" className="hover:opacity-70 transition-opacity">
              PRIVACY POLICY
            </Link>
            <Link to="/faq" className="hover:opacity-70 transition-opacity">
              COOKIES
            </Link>
            <span className="hover:opacity-70 transition-opacity">
              SITE BY S/A
            </span>
          </nav>

          <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10">
            <span className="tabular-nums font-mono text-white/90">{timeString}</span>
            <span>© HEIREST, 2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
