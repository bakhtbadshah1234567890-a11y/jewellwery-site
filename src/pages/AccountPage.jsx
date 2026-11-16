import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/useCart'
import { api } from '../utils/api'
import { formatNZD } from '../utils/pricing'

const FABRICATION_STAGES = [
  'Order Received',
  'Metallurgical Casting',
  'Gemstone Setting',
  'Hand Polishing',
  'Hallmarking & QA',
  'Insured Dispatch',
  'Delivered',
]

const STAGE_INDEX_MAP = {
  received: 1,
  metallurgical_casting: 2,
  gemstone_setting: 3,
  hand_polishing: 4,
  hallmarking_inspection: 5,
  dispatched: 6,
  delivered: 7,
}

export default function AccountPage() {
  const { user, isAuthenticated, login, register, logout, updateProfile, authError, clearError } = useAuth()
  const { cart } = useCart()

  // Form states
  const [authMode, setAuthMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [localMessage, setLocalMessage] = useState('')

  // Portal tabs
  const [activeTab, setActiveTab] = useState('orders') // 'orders' | 'profile' | 'wishlist'
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  // Profile edit states
  const [editStreet, setEditStreet] = useState('')
  const [editCity, setEditCity] = useState('')
  const [editPostal, setEditPostal] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState(false)

  // Load user orders when logged in
  useEffect(() => {
    let isMounted = true
    if (isAuthenticated) {
      setOrdersLoading(true)
      api.orders
        .getMyOrders()
        .then((res) => {
          if (isMounted && res.success) {
            setOrders(res.orders || [])
          }
        })
        .catch(() => {
          // If network error, keep empty
        })
        .finally(() => {
          if (isMounted) setOrdersLoading(false)
        })

      // Populate address edit form
      if (user) {
        setEditStreet(user.shippingAddress?.street || '')
        setEditCity(user.shippingAddress?.city || '')
        setEditPostal(user.shippingAddress?.postalCode || '')
        setEditPhone(user.phone || '')
      }
    }
    return () => {
      isMounted = false
    }
  }, [isAuthenticated, user])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setLocalMessage('')
    clearError()
    const res = await login(email, password)
    setFormLoading(false)
    if (!res.success) {
      setLocalMessage(res.error)
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setLocalMessage('')
    clearError()
    const res = await register({ name, email, password, phone })
    setFormLoading(false)
    if (!res.success) {
      setLocalMessage(res.error)
    }
  }

  const handleDemoLogin = async () => {
    setFormLoading(true)
    clearError()
    await login('admin@gemly.com', 'gemlyadmin123')
    setFormLoading(false)
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setProfileSaving(true)
    setProfileSuccess(false)
    const res = await updateProfile({
      phone: editPhone,
      shippingAddress: {
        street: editStreet,
        city: editCity,
        postalCode: editPostal,
        country: 'New Zealand',
      },
    })
    setProfileSaving(false)
    if (res.success) {
      setProfileSuccess(true)
      setTimeout(() => setProfileSuccess(false), 3000)
    }
  }

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 pb-6 mb-10 gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
              GEMLY Client Portal
            </p>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900">
              {isAuthenticated ? `Welcome Back, ${user?.name || 'Client'}` : 'Client Account & Authentication'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="font-mono text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-3 py-1.5 rounded transition shadow-xs"
            >
              Atelier Admin Portal →
            </Link>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={logout}
                className="font-mono text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 underline"
              >
                Sign Out
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDemoLogin}
                className="font-mono text-xs uppercase tracking-wider text-[#9b6b2e] hover:underline"
              >
                Sign In As Atelier Admin (Demo)
              </button>
            )}
          </div>
        </div>

        {!isAuthenticated ? (
          /* ================= LOGIN & REGISTRATION ================= */
          <div className="max-w-md mx-auto bg-[#FAF9F6] border border-neutral-200/90 rounded-xl p-8 sm:p-10 shadow-sm">
            {/* Tab switch */}
            <div className="flex border-b border-neutral-200 mb-6 font-mono text-xs uppercase tracking-wider">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login')
                  clearError()
                  setLocalMessage('')
                }}
                className={`flex-1 pb-3 text-center border-b-2 font-medium transition-colors ${
                  authMode === 'login'
                    ? 'border-neutral-900 text-neutral-900 font-bold'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register')
                  clearError()
                  setLocalMessage('')
                }}
                className={`flex-1 pb-3 text-center border-b-2 font-medium transition-colors ${
                  authMode === 'register'
                    ? 'border-neutral-900 text-neutral-900 font-bold'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error alerts */}
            {(authError || localMessage) && (
              <div className="mb-4 rounded bg-rose-50 border border-rose-200 p-3 text-rose-800 font-mono text-xs">
                {authError || localMessage}
              </div>
            )}

            {authMode === 'login' ? (
              /* Sign In Form */
              <form onSubmit={handleLoginSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@gemly.com"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full rounded bg-neutral-900 py-3 text-white uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-opacity disabled:opacity-50"
                  >
                    {formLoading ? 'Authenticating...' : 'Sign In'}
                  </button>
                </div>
              </form>
            ) : (
              /* Create Account Form */
              <form onSubmit={handleRegisterSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                    className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1">
                    Contact Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+64 21 000 0000"
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
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full rounded bg-neutral-900 py-3 text-white uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-opacity disabled:opacity-50"
                  >
                    {formLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* ================= AUTHENTICATED PORTAL ================= */
          <div>
            {/* Tabs */}
            <div className="flex border-b border-neutral-200 gap-8 font-mono text-xs uppercase tracking-widest mb-10 overflow-x-auto pb-1">
              {[
                { id: 'orders', label: `My Orders & Fabrication (${orders.length})` },
                { id: 'profile', label: 'Shipping & Client Details' },
                { id: 'wishlist', label: `Shopping Bag Items (${cart.length})` },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`pb-3 transition-colors relative whitespace-nowrap ${
                    activeTab === t.id
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900 -mb-px'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* TAB 1: ORDERS & FABRICATION */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {ordersLoading ? (
                  <p className="font-mono text-xs text-neutral-500 py-8 text-center">
                    Fetching your bespoke orders from atelier database...
                  </p>
                ) : orders.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-neutral-300 p-12 text-center bg-[#FAF9F6]">
                    <h3 className="text-xl font-normal text-neutral-900 mb-2">No active commissions yet</h3>
                    <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
                      Explore our handcrafted collections or author your own piece in our live 3D configurator.
                    </p>
                    <Link
                      to="/shop"
                      className="inline-block rounded bg-neutral-900 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-white hover:bg-neutral-800"
                    >
                      Explore Boutique
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => {
                    const currentStageIdx = STAGE_INDEX_MAP[order.orderStatus] || 1
                    return (
                      <article
                        key={order._id}
                        className="rounded-xl border border-neutral-200 bg-[#FAF9F6] p-6 sm:p-8 space-y-6"
                      >
                        {/* Order Top Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block">
                              Order Reference
                            </span>
                            <span className="font-mono text-base font-semibold text-neutral-900">
                              {order.orderNumber}
                            </span>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block">
                              Total Investment
                            </span>
                            <span className="font-mono text-base font-semibold text-neutral-900">
                              {formatNZD(order.total)}
                            </span>
                          </div>
                        </div>

                        {/* Items in this order */}
                        <div className="space-y-4">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="size-16 rounded border border-neutral-200 object-contain p-2 bg-white"
                              />
                              <div className="flex-1">
                                <h4 className="font-mono text-xs font-semibold text-neutral-900 uppercase tracking-wide">
                                  {item.name}
                                </h4>
                                <p className="font-mono text-[11px] text-neutral-500 mt-0.5">
                                  {item.details || `${item.metal} • ${item.carat} ${item.gemstone}`}
                                </p>
                              </div>
                              <span className="font-mono text-xs font-medium text-neutral-900">
                                {formatNZD(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Live Fabrication Stages Progress Bar */}
                        <div className="pt-4 border-t border-neutral-200">
                          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider mb-2">
                            <span className="text-neutral-500">Atelier Fabrication Progress:</span>
                            <span className="text-[#9b6b2e] font-semibold">
                              Stage {currentStageIdx} of 7: {FABRICATION_STAGES[currentStageIdx - 1]}
                            </span>
                          </div>
                          <div className="grid grid-cols-7 gap-1.5 h-2">
                            {FABRICATION_STAGES.map((_, i) => (
                              <div
                                key={i}
                                className={`rounded-full transition-colors ${
                                  i < currentStageIdx ? 'bg-neutral-900' : 'bg-neutral-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </article>
                    )
                  })
                )}
              </div>
            )}

            {/* TAB 2: PROFILE & SHIPPING ADDRESS */}
            {activeTab === 'profile' && (
              <div className="max-w-xl bg-[#FAF9F6] border border-neutral-200 rounded-xl p-8">
                <h3 className="text-xl font-normal text-neutral-900 mb-6">Default Insured Delivery Address</h3>

                {profileSuccess && (
                  <div className="mb-4 rounded bg-emerald-50 border border-emerald-200 p-3 text-emerald-800 font-mono text-xs">
                    ✓ Shipping preferences updated successfully
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-600 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={editStreet}
                      onChange={(e) => setEditStreet(e.target.value)}
                      placeholder="e.g. 14 Customs Street East"
                      className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-wider text-neutral-600 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        placeholder="Auckland"
                        className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block uppercase tracking-wider text-neutral-600 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={editPostal}
                        onChange={(e) => setEditPostal(e.target.value)}
                        placeholder="1010"
                        className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-600 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="+64 9 000 0000"
                      className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={profileSaving}
                      className="rounded bg-neutral-900 px-6 py-2.5 text-white uppercase tracking-widest font-semibold hover:bg-neutral-800 disabled:opacity-50"
                    >
                      {profileSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: WISHLIST / CART */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                {cart.length === 0 ? (
                  <p className="font-mono text-xs text-neutral-500 py-8 text-center">
                    Your shopping bag is currently empty.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-neutral-200 bg-[#FAF9F6] p-4 flex gap-4 items-center"
                      >
                        <img src={item.image} alt={item.name} className="size-16 object-contain" />
                        <div>
                          <h4 className="font-mono text-xs font-semibold text-neutral-900 uppercase">
                            {item.name}
                          </h4>
                          <p className="font-mono text-xs text-neutral-500 mt-1">{item.priceDisplay}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
