import { useState } from 'react'

const socialImages = [
  { src: '/pics/social-1.png', alt: 'HEIREST bespoke diamond ring' },
  { src: '/pics/social-2.jpg', alt: 'HEIREST tennis bracelet style' },
  { src: '/pics/social-3.jpg', alt: 'HEIREST layered tennis necklace' },
  { src: '/pics/social-4.jpg', alt: 'Editorial jewellery workshop' },
  { src: '/pics/social-5.png', alt: 'HEIREST community lifestyle' },
  { src: '/pics/social-6.png', alt: 'HEIREST drop earrings in gold' },
]

export default function SocialGrid() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <section className="border-b-2 border-dotted border-black bg-white py-16 px-5 sm:px-10 lg:px-16" aria-labelledby="social-title">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">Follow Us</p>
          <h2 id="social-title" className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-900">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              @heirest__
            </a>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-16">
          {socialImages.map((img) => (
            <a
              key={img.src}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-md bg-neutral-100"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center text-white font-mono text-xs">
                View ↗
              </div>
            </a>
          ))}
        </div>

        <div className="mx-auto max-w-xl text-center rounded-lg bg-[#f7f6f4] p-8 sm:p-10 border border-neutral-200">
          <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-900 mb-2">
            Sign up to our newsletter
          </h3>
          <p className="text-sm text-neutral-600 mb-6">
            Receive private preview access to trunk shows, new collections, and bespoke design releases.
          </p>

          {subscribed ? (
            <p className="font-mono text-xs uppercase tracking-wider text-green-700 bg-green-50 py-3 rounded">
              Thank you for subscribing to HEIREST.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-neutral-900 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-opacity hover:opacity-85 shrink-0"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
