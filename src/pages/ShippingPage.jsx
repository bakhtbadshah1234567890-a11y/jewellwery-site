import { Link } from 'react-router-dom'

export default function ShippingPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center pt-8 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3">
          Customer Care & Concierge
        </p>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900 leading-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="mt-6 text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
          We provide complimentary, fully insured express delivery worldwide on every single order, ensuring your fine jewellery arrives safely, securely, and discreetly.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 space-y-16">
        {/* Shipping Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border border-neutral-200 rounded-lg p-6 bg-[#FAF9F6]">
            <span className="font-mono text-2xl text-neutral-900 font-light">100%</span>
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-neutral-900 mt-2 mb-1">
              Fully Insured
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every parcel is protected against loss, damage, or theft throughout transit until delivered to your hands.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-lg p-6 bg-[#FAF9F6]">
            <span className="font-mono text-2xl text-neutral-900 font-light">DHL</span>
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-neutral-900 mt-2 mb-1">
              Express Worldwide
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Dispatched with premium couriers including DHL Express, FedEx Priority, and NZ Post Secure Courier.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-lg p-6 bg-[#FAF9F6]">
            <span className="font-mono text-2xl text-neutral-900 font-light">FREE</span>
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-neutral-900 mt-2 mb-1">
              Complimentary Transit
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No hidden shipping fees, fuel surcharges, or handling fees added at checkout.
            </p>
          </div>
        </div>

        {/* Manufacturing & Transit Timelines */}
        <section className="border-t border-neutral-200 pt-12">
          <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 mb-6">
            Production & Delivery Timelines
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm border border-neutral-200">
              <thead className="bg-[#FAF9F6] border-b border-neutral-200 text-neutral-700 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Item Type</th>
                  <th className="p-4">Crafting Time</th>
                  <th className="p-4">Transit Time (NZ / AU)</th>
                  <th className="p-4">Transit Time (Global)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-600">
                <tr>
                  <td className="p-4 font-semibold text-neutral-900">Sizing Kits & Ready-to-Ship</td>
                  <td className="p-4">24 - 48 Hours</td>
                  <td className="p-4">1 - 2 Business Days</td>
                  <td className="p-4">3 - 5 Business Days</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-900">Made-to-Order Archive (Rings, Necklaces)</td>
                  <td className="p-4">3 - 4 Weeks</td>
                  <td className="p-4">1 - 2 Business Days</td>
                  <td className="p-4">3 - 5 Business Days</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-neutral-900">Custom Bespoke Commissions</td>
                  <td className="p-4">4 - 6 Weeks</td>
                  <td className="p-4">Overnight Courier</td>
                  <td className="p-4">2 - 4 Business Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Packaging & Security */}
        <section className="border-t border-neutral-200 pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 mb-4">
              Discreet, Tamper-Evident Packaging
            </h2>
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base mb-4">
              To safeguard surprise proposals and prevent security concerns, the exterior packaging reveals no mention of "jewellery", "diamonds", or "HEIREST".
            </p>
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
              Inside the protective security box, your piece arrives enclosed in our signature keepsake box, velvet jewel pouch, polishing cloth, and signed certificate of authenticity.
            </p>
          </div>

          <div className="bg-[#FAF9F6] border border-neutral-200 rounded-lg p-8 font-mono text-xs space-y-4">
            <div className="text-neutral-900 font-semibold uppercase tracking-wider">
              Delivery Security Protocols:
            </div>
            <ul className="space-y-2 text-neutral-600">
              <li className="flex items-start gap-2">
                <span className="text-neutral-900">✓</span>
                <span>Mandatory adult signature required upon courier delivery.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900">✓</span>
                <span>Real-time SMS & email tracking updates with courier live map.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900">✓</span>
                <span>Hold-for-pickup available at local DHL Express stations upon request.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Questions CTA */}
        <div className="border-t border-neutral-200 pt-12 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Have questions regarding delivery or rush orders?
          </p>
          <Link
            to="/contact"
            className="font-mono text-xs uppercase tracking-widest text-neutral-900 underline hover:opacity-70 font-semibold"
          >
            Contact our concierge team →
          </Link>
        </div>
      </div>
    </div>
  )
}
