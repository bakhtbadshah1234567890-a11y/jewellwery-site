export default function PrivacyPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">Legal & Compliance</p>
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-neutral-900 mb-8">
          Privacy Policy
        </h1>
        <div className="text-xs font-mono text-neutral-500 mb-10 pb-4 border-b border-neutral-200">
          Last Updated: January 2026 • HEIREST Fine Jewellery Ltd.
        </div>

        <div className="space-y-8 text-neutral-700 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">1. Overview & Commitment</h2>
            <p>
              At HEIREST ("we", "our", or "us"), protecting your privacy and confidential purchase data is fundamental. This Privacy Policy outlines the personal data we collect when you browse our boutique website, consult for bespoke commissions, or purchase fine jewellery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-600">
              <li>Contact details: Name, email address, physical delivery address, and telephone contact for secure courier dispatch.</li>
              <li>Custom specifications: Ring sizing, bespoke design reference files, engraving instructions.</li>
              <li>Payment verification: Encrypted billing tokenization handled through certified Level 1 PCI-DSS payment gateways. We never store raw credit card numbers.</li>
              <li>Technical analytics: IP address, device viewport, browser type, and anonymous browsing journey to enhance UI usability.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">3. How We Use Your Information</h2>
            <p>
              Your data is utilized strictly for custom manufacturing, processing payments, arranging insured high-security courier delivery, providing warranty authentication, and updating you regarding order fabrication milestones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">4. Information Sharing & Third Parties</h2>
            <p>
              We do not sell, rent, or monetize your personal data. Data is shared exclusively with necessary operational partners: insured couriers (DHL Express, FedEx, NZ Post), payment gateways (Stripe, Apple Pay), and certified diamond appraisal grading registries where requested.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">5. Data Retention & Your Rights</h2>
            <p>
              You maintain the right to access, rectify, or request the deletion of your personal records at any time. For lifetime warranty tracking, purchase serial numbers are securely archived unless you request their revocation. For inquiries, email concierge@heirest.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
