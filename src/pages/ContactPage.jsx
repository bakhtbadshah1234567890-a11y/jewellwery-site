import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="px-5 sm:px-10 lg:px-16 mx-auto max-w-7xl">
        <div className="border-b border-neutral-200 pb-10 mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Get In Touch
          </p>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900">
            Contact Concierge
          </h1>
          <p className="mt-4 text-base text-neutral-600 max-w-2xl leading-relaxed">
            Whether you want to discuss a custom bespoke ring, book a studio appointment, or check sizing details, our team is here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Showroom & Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-xl font-medium text-neutral-900 mb-3">Studio Locations</h2>
              <div className="space-y-4 font-mono text-xs text-neutral-600">
                <div className="border border-neutral-200 p-4 rounded bg-[#faf9f8]">
                  <span className="font-semibold text-neutral-900 block text-sm">Auckland Studio & HQ</span>
                  <p className="mt-1">Ponsonby, Auckland 1011, New Zealand</p>
                  <p className="mt-1 text-neutral-500">Appointments: Monday – Saturday</p>
                </div>

                <div className="border border-neutral-200 p-4 rounded bg-[#faf9f8]">
                  <span className="font-semibold text-neutral-900 block text-sm">Sydney Design Suite</span>
                  <p className="mt-1">Paddington, Sydney NSW 2021, Australia</p>
                  <p className="mt-1 text-neutral-500">Appointments: Tuesday – Sunday</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium text-neutral-900 mb-3">Direct Contact</h2>
              <div className="space-y-2 font-mono text-xs text-neutral-700">
                <p>
                  <span className="text-neutral-400">Email:</span> concierge@gemly.com
                </p>
                <p>
                  <span className="text-neutral-400">Phone (NZ):</span> +64 9 887 6420
                </p>
                <p>
                  <span className="text-neutral-400">Phone (AU):</span> +61 2 8000 7912
                </p>
                <p>
                  <span className="text-neutral-400">Hours:</span> 9am – 6pm NZT / AEST
                </p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 border border-neutral-200 rounded-lg p-8 sm:p-10 bg-white shadow-xs">
            <h2 className="text-2xl font-normal text-neutral-900 mb-2">Send a Message</h2>
            <p className="text-xs text-neutral-500 mb-6">
              Fill out the form below and our concierge team will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="rounded bg-neutral-50 p-6 text-center border border-neutral-200">
                <h3 className="font-mono text-xs uppercase text-neutral-900 font-semibold mb-1">
                  Message Sent
                </h3>
                <p className="text-xs text-neutral-600">
                  Thank you for reaching out. A client specialist will be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded border border-neutral-300 px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded border border-neutral-300 px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Bespoke Consultation">Bespoke Consultation</option>
                    <option value="Studio Appointment">Studio Appointment Booking</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Sizing Help">Sizing Help</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-neutral-700 mb-1">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you with your piece?"
                    className="w-full rounded border border-neutral-300 px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-neutral-900 py-3 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85"
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
