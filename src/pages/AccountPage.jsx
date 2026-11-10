import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

export default function AccountPage() {
  const [tab, setTab] = useState('orders') // 'orders' | 'wishlist' | 'appointments' | 'login'
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const { cart } = useCart()

  // Sample order with fabrication stages
  const orders = [
    {
      id: 'HEI-98421',
      date: 'January 14, 2026',
      total: '$1,751 NZD',
      status: 'In Atelier Production',
      stage: 5, // out of 8
      item: {
        name: 'Raised Bezel Pinky Ring',
        specs: '14K Yellow Gold • 1.00ct White Lab Diamond • Size US 4.5',
        image: '/pics/gen-ring.png',
      },
      tracking: 'DHL Express (Pending Dispatch)',
    },
    {
      id: 'HEI-89312',
      date: 'December 2, 2025',
      total: '$15 NZD',
      status: 'Delivered',
      stage: 8,
      item: {
        name: 'Ring + Bracelet Sizing Kit',
        specs: 'Multisizer & Millimeter Band',
        image: '/pics/sizing-kit-1.png',
      },
      tracking: 'NZ Post #940012398401 (Delivered)',
    },
  ]

  const fabricationStages = [
    'Order Confirmed',
    'Gemstone Curation',
    '3D CAD Model',
    'Lost-Wax Casting',
    'Hand Stone Setting',
    'Mirror Polish',
    'Laser Hallmarking',
    'Dispatched',
  ]

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 pb-6 mb-10 gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Client Portal
            </p>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900">
              {isLoggedIn ? 'Welcome Back, Eleanor' : 'Account Sign In'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="font-mono text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 underline"
            >
              {isLoggedIn ? 'Sign Out' : 'Switch to Demo Account'}
            </button>
          </div>
        </div>

        {!isLoggedIn ? (
          /* Sign In / Register Form */
          <div className="max-w-md mx-auto bg-[#FAF9F6] border border-neutral-200 rounded-lg p-8">
            <h2 className="text-2xl font-normal mb-6 text-neutral-900">Sign in to your account</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setIsLoggedIn(true)
              }}
              className="space-y-4 font-mono text-xs"
            >
              <div>
                <label className="block uppercase tracking-wider text-neutral-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  defaultValue="client@heirest.com"
                  className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  defaultValue="••••••••••••"
                  className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded bg-neutral-900 py-3 text-white uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Sign In
                </button>
              </div>

              <div className="text-center pt-2">
                <a href="#forgot" className="text-[11px] text-neutral-500 underline">
                  Forgot your password?
                </a>
              </div>
            </form>
          </div>
        ) : (
          /* Account Portal Tabs */
          <div>
            {/* Nav Tabs */}
            <div className="flex border-b border-neutral-200 gap-8 font-mono text-xs uppercase tracking-widest mb-10 overflow-x-auto pb-1">
              {[
                { id: 'orders', label: 'My Orders & Fabrication' },
                { id: 'wishlist', label: `Saved Pieces (${cart.length})` },
                { id: 'appointments', label: 'Bespoke Consultations' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`pb-3 transition-colors relative whitespace-nowrap ${
                    tab === t.id
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900 -mb-px'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Orders & Fabrication Tracker */}
            {tab === 'orders' && (
              <div className="space-y-8">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="border border-neutral-200 rounded-lg p-6 sm:p-8 bg-white shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-neutral-100 gap-2 mb-6">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                          Order Number
                        </span>
                        <div className="font-mono text-base font-semibold text-neutral-900">
                          {ord.id}
                        </div>
                      </div>
                      <div className="text-left sm:text-right font-mono text-xs">
                        <span className="text-neutral-500">Placed: {ord.date}</span>
                        <div className="font-semibold text-neutral-900">{ord.total}</div>
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mb-6">
                      <div className="size-20 rounded bg-[#FAF9F6] border border-neutral-200 p-2 shrink-0">
                        <img
                          src={ord.item.image}
                          alt={ord.item.name}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-normal text-neutral-900">
                          {ord.item.name}
                        </h3>
                        <p className="font-mono text-xs text-neutral-500 mt-1">
                          {ord.item.specs}
                        </p>
                        <p className="font-mono text-[11px] text-neutral-400 mt-1">
                          Tracking: {ord.tracking}
                        </p>
                      </div>
                      <div className="rounded bg-neutral-100 px-3 py-1 font-mono text-xs uppercase tracking-wider text-neutral-800">
                        {ord.status}
                      </div>
                    </div>

                    {/* Progress Bar of Stages */}
                    <div className="bg-[#FAF9F6] rounded-lg p-4 sm:p-6 border border-neutral-100">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mb-3 flex justify-between">
                        <span>Production Stage:</span>
                        <span className="font-semibold text-neutral-900">
                          Stage {ord.stage} of 8 — {fabricationStages[ord.stage - 1]}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
                        {fabricationStages.map((stg, idx) => (
                          <div key={stg} className="flex flex-col gap-1">
                            <div
                              className={`h-2 rounded-xs ${
                                idx < ord.stage ? 'bg-neutral-900' : 'bg-neutral-200'
                              }`}
                            />
                            <span className="text-[9px] font-mono text-neutral-400 truncate hidden sm:block">
                              {stg}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist / Cart quick view */}
            {tab === 'wishlist' && (
              <div className="bg-[#FAF9F6] border border-neutral-200 rounded-lg p-8">
                <h3 className="text-xl font-normal text-neutral-900 mb-4">Saved Pieces</h3>
                {cart.length === 0 ? (
                  <p className="text-neutral-500 font-mono text-xs">Your wishlist is currently empty.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-neutral-200 rounded p-4 flex gap-4 items-center"
                      >
                        <img src={item.image} alt={item.name} className="size-16 object-contain" />
                        <div>
                          <div className="text-sm font-semibold">{item.name}</div>
                          <div className="text-xs font-mono text-neutral-500">{item.priceDisplay}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Appointments Tab */}
            {tab === 'appointments' && (
              <div className="bg-[#FAF9F6] border border-neutral-200 rounded-lg p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-normal text-neutral-900">Bespoke Design Appointments</h3>
                    <p className="text-xs font-mono text-neutral-500 mt-1">
                      Manage your scheduled private viewings and virtual design sessions.
                    </p>
                  </div>
                  <Link
                    to="/bespoke"
                    className="rounded bg-neutral-900 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white"
                  >
                    Schedule New +
                  </Link>
                </div>

                <div className="border border-neutral-200 rounded bg-white p-5 font-mono text-xs">
                  <div className="flex justify-between items-center text-neutral-500 mb-2">
                    <span>Virtual Design Session</span>
                    <span className="text-emerald-700 font-semibold">Confirmed</span>
                  </div>
                  <div className="text-sm font-semibold text-neutral-900">
                    February 24, 2026 • 2:00 PM NZDT
                  </div>
                  <p className="text-neutral-600 mt-1 normal-case font-sans">
                    With Head Designer • Video conference link emailed 24 hours prior.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
