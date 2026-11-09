import { useState } from 'react'

export default function TrunkShowPage() {
  const [rsvpData, setRsvpData] = useState({ name: '', email: '', date: 'Friday 20th November', guests: '1' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="px-5 sm:px-10 lg:px-16 mx-auto max-w-7xl">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-10 mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Exclusive Live Event
          </p>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900 max-w-3xl">
            Sisters & Co x HEIREST
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Join us in Mount Maunganui, Tauranga for our summer trunk show! Discover the HEIREST range in person, explore custom options with founder Liam Whittaker, and create a piece entirely yours.
          </p>
        </div>

        {/* Feature Image Banner */}
        <div className="overflow-hidden rounded-lg bg-neutral-100 mb-16">
          <img
            src="/pics/trunkshow-hero.jpg"
            alt="Sisters and Co boutique trunk show event"
            className="w-full h-[360px] sm:h-[480px] object-cover"
          />
        </div>

        {/* Event Schedule & RSVP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Details */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900">
              Event Details
            </h2>

            <div className="border border-neutral-200 rounded-lg p-6 bg-[#faf8f5] space-y-4">
              <div>
                <span className="font-mono text-xs uppercase text-neutral-500 block">Dates</span>
                <span className="text-base font-medium text-neutral-900">Friday 20th & Saturday 21st November</span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase text-neutral-500 block">Location</span>
                <span className="text-base font-medium text-neutral-900">Sisters & Co Boutique, Mount Maunganui, Tauranga</span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase text-neutral-500 block">Highlights</span>
                <ul className="mt-1 space-y-1 text-sm text-neutral-600 font-mono text-xs">
                  <li>• Over 200 fine jewellery pieces available to try on in person</li>
                  <li>• 1-on-1 consultations with founder Liam Whittaker</li>
                  <li>• Live 3D Configurator access with immediate pricing</li>
                  <li>• Complimentary sizing kits and champagne on arrival</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RSVP Form */}
          <div className="lg:col-span-6 border border-neutral-200 rounded-lg p-8 bg-white shadow-xs">
            <h3 className="text-xl font-normal text-neutral-900 mb-2">
              Reserve Your Appointment
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Spaces are limited. RSVP below to confirm your trunk show consultation.
            </p>

            {submitted ? (
              <div className="rounded bg-neutral-50 p-6 text-center border border-neutral-200">
                <span className="font-mono text-xs uppercase text-neutral-900 font-semibold block mb-1">
                  RSVP Confirmed
                </span>
                <p className="text-xs text-neutral-600">
                  We look forward to welcoming you at Sisters & Co. A calendar invite has been sent to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    className="w-full rounded border border-neutral-300 px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                    placeholder="Sarah Miller"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                    className="w-full rounded border border-neutral-300 px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                    placeholder="sarah@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Select Day</label>
                    <select
                      value={rsvpData.date}
                      onChange={(e) => setRsvpData({ ...rsvpData, date: e.target.value })}
                      className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                    >
                      <option value="Friday 20th November">Friday 20th Nov</option>
                      <option value="Saturday 21st November">Saturday 21st Nov</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Guests</label>
                    <select
                      value={rsvpData.guests}
                      onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                      className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3+">3+ People</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-neutral-900 py-3 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85"
                >
                  Confirm RSVP →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
