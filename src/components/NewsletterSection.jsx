import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email.trim())) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    // Simulate API subscription delay
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setErrorMessage('')
    }, 600)
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="border-b-2 border-dotted border-black bg-[#FAF9F6] py-20 px-5 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
          Private Client Access
        </p>
        <h2
          id="newsletter-heading"
          className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900 leading-tight"
        >
          Join the HEIREST Circle
        </h2>
        <p className="mt-4 text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-xl mx-auto">
          Receive confidential previews of rare gemstone releases, private trunk show invitations, and editorial essays on artisanal jewellery design.
        </p>

        {status === 'success' ? (
          <div className="mt-8 rounded-lg bg-emerald-50 border border-emerald-200 p-6 text-emerald-800 font-mono text-xs uppercase tracking-wider max-w-md mx-auto">
            ✓ Welcome to the Circle. A confirmation note has been dispatched to your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                placeholder="Enter your email address"
                className="flex-1 rounded border border-neutral-300 bg-white px-4 py-3 font-mono text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded bg-neutral-900 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors disabled:opacity-50 shrink-0 font-medium"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-left font-mono text-[11px] text-rose-600 mt-1">
                {errorMessage}
              </p>
            )}

            <p className="text-left sm:text-center text-[10px] text-neutral-400 font-mono mt-2">
              We respect your privacy. You may opt out at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
