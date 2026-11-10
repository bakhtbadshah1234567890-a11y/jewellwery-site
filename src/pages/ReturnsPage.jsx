import { Link } from 'react-router-dom'

export default function ReturnsPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      {/* Header */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center pt-8 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3">
          Customer Care & Concierge
        </p>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900 leading-tight">
          Returns & Exchanges
        </h1>
        <p className="mt-6 text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
          We want you to feel entirely confident in your heirloom investment. We offer a 30-day return window and complimentary resizing within 60 days.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12 space-y-16">
        {/* Three Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border border-neutral-200 rounded-lg p-6 bg-[#FAF9F6]">
            <span className="font-mono text-2xl text-neutral-900 font-light">30</span>
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-neutral-900 mt-2 mb-1">
              Days Return Window
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Standard catalog items may be returned within 30 days of receipt in pristine unworn condition.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-lg p-6 bg-[#FAF9F6]">
            <span className="font-mono text-2xl text-neutral-900 font-light">FREE</span>
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-neutral-900 mt-2 mb-1">
              Complimentary Resizing
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              One complimentary ring resize is provided on eligible models within 60 days of delivery.
            </p>
          </div>

          <div className="border border-neutral-200 rounded-lg p-6 bg-[#FAF9F6]">
            <span className="font-mono text-2xl text-neutral-900 font-light">100%</span>
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-neutral-900 mt-2 mb-1">
              Return Transit Covered
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We provide a prepaid, fully insured courier return label for approved exchanges.
            </p>
          </div>
        </div>

        {/* Policy Details */}
        <section className="border-t border-neutral-200 pt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-normal text-neutral-900 mb-3">
              Standard Catalog Returns
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              To be eligible for a refund or store credit, pieces must be in original unworn condition, free from scratches, blemishes, or resizing by third-party jewelers, and returned in all original packaging with certificates intact.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-normal text-neutral-900 mb-3">
              Complimentary Resizing Program
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Getting the ring size exact can be challenging, especially for surprise proposals. If your ring feels slightly snug or loose, our master bench jewelers will resize it up or down by up to two full sizes completely free of charge. Full 360-degree pavé eternity rings are size-specific and cannot be resized, but may be exchanged for a new size within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-normal text-neutral-900 mb-3">
              Bespoke & Custom Engraved Commissions
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Because bespoke pieces and custom-engraved items are created to unique personal specifications, they are final sale and non-refundable. However, our Lifetime Manufacturing Warranty and complimentary resizing still fully apply.
            </p>
          </div>
        </section>

        {/* Step by Step Process */}
        <section className="border-t border-neutral-200 pt-12">
          <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 mb-6">
            How to Initiate a Return or Exchange
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
            <div className="bg-[#FAF9F6] p-5 rounded border border-neutral-200">
              <span className="text-neutral-400 text-sm">Step 01</span>
              <h3 className="font-semibold text-neutral-900 uppercase mt-2 mb-1">Contact Concierge</h3>
              <p className="text-neutral-600 normal-case font-sans">
                Email care@heirest.com with your order reference number and reason for return.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-5 rounded border border-neutral-200">
              <span className="text-neutral-400 text-sm">Step 02</span>
              <h3 className="font-semibold text-neutral-900 uppercase mt-2 mb-1">Prepaid Label</h3>
              <p className="text-neutral-600 normal-case font-sans">
                We email you an insured DHL/FedEx return label and customs documentation.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-5 rounded border border-neutral-200">
              <span className="text-neutral-400 text-sm">Step 03</span>
              <h3 className="font-semibold text-neutral-900 uppercase mt-2 mb-1">Secure Dispatch</h3>
              <p className="text-neutral-600 normal-case font-sans">
                Pack the piece in its original box and schedule a complimentary courier pickup.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-5 rounded border border-neutral-200">
              <span className="text-neutral-400 text-sm">Step 04</span>
              <h3 className="font-semibold text-neutral-900 uppercase mt-2 mb-1">Inspection & Refund</h3>
              <p className="text-neutral-600 normal-case font-sans">
                Our gemologists inspect the item within 48 hours and process your refund.
              </p>
            </div>
          </div>
        </section>

        {/* Concierge Link */}
        <div className="border-t border-neutral-200 pt-12 text-center">
          <Link
            to="/contact"
            className="rounded bg-neutral-900 px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors inline-block"
          >
            Start Return with Concierge
          </Link>
        </div>
      </div>
    </div>
  )
}
