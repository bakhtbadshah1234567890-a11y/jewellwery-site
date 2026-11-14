export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">Legal & Compliance</p>
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-neutral-900 mb-8">
          Terms & Conditions
        </h1>
        <div className="text-xs font-mono text-neutral-500 mb-10 pb-4 border-b border-neutral-200">
          Last Updated: January 2026 • GEMLY Fine Jewellery Ltd.
        </div>

        <div className="space-y-8 text-neutral-700 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing our website or purchasing pieces from GEMLY, you agree to comply with and be bound by these Terms and Conditions. Please review them carefully before commissioning fine jewellery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">2. Made-to-Order Manufacturing & Sizing</h2>
            <p>
              Each GEMLY piece is individually cast and hand-set to order. While we endeavor to meet estimated fabrication windows of 3 to 4 weeks, hand craftsmanship timelines may vary during high-demand seasons. Customers are responsible for verifying their ring size using our physical sizing kit prior to casting.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">3. Pricing & Currency</h2>
            <p>
              All prices shown on the store default to New Zealand Dollars (NZD) and include applicable taxes unless specified otherwise. We reserve the right to correct accidental pricing errors resulting from gold market fluctuations or technical discrepancies prior to order confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">4. Intellectual Property</h2>
            <p>
              All designs, CAD models, photography, typography, brand marks, and software code remain the exclusive intellectual property of GEMLY Fine Jewellery Ltd. No replication or commercial reproduction is permitted without written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">5. Governing Law</h2>
            <p>
              These Terms and any transactions with GEMLY are governed by and construed in accordance with the laws of New Zealand, subject to the jurisdiction of the Auckland courts.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
