import { useState } from 'react'

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false,
  })
  const [savedBanner, setSavedBanner] = useState(false)

  const handleSave = () => {
    setSavedBanner(true)
    setTimeout(() => setSavedBanner(false), 2500)
  }

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">Legal & Compliance</p>
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-neutral-900 mb-8">
          Cookie Policy & Preferences
        </h1>
        <div className="text-xs font-mono text-neutral-500 mb-10 pb-4 border-b border-neutral-200">
          Last Updated: January 2026 • HEIREST Fine Jewellery Ltd.
        </div>

        <div className="space-y-8 text-neutral-700 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-normal text-neutral-900 mb-3">Understanding Cookies</h2>
            <p>
              Cookies are subtle text files stored on your device that help authenticate your shopping session, preserve your shopping cart selections across visits, and remember your preferred metal and currency configurations.
            </p>
          </section>

          {/* Preferences Box */}
          <section className="bg-[#FAF9F6] border border-neutral-200 rounded-lg p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-normal text-neutral-900">
              Manage Your Cookie Preferences
            </h3>

            {savedBanner && (
              <div className="rounded bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 font-mono uppercase tracking-wider">
                ✓ Preferences updated and saved to your device.
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-neutral-900">
                    Essential & Security Cookies
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Required for the shopping cart, checkout security, and site navigation.
                  </p>
                </div>
                <span className="font-mono text-xs text-neutral-400">Always Active</span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-neutral-900">
                    Functional & Preference Cookies
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Remembers your configured ring sizes, wishlist, and preferred currency.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                  className="size-4 accent-neutral-900 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-neutral-900">
                    Performance & Analytics Cookies
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Helps us understand how clients interact with our design configurators.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="size-4 accent-neutral-900 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-neutral-900">
                    Marketing & Personalized Curation
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Delivers bespoke styling recommendations based on previous engagement.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="size-4 accent-neutral-900 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSave}
                className="rounded bg-neutral-900 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
