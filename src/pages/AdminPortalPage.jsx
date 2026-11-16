import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminPortalPage() {
  const { user, login } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Overview Data
  const [overview, setOverview] = useState({
    stats: {
      totalRevenue: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalUsers: 0,
      totalReviews: 0,
      totalSubscribers: 0,
      totalInquiries: 0,
      unreadInquiries: 0,
      ordersByStatus: {},
      productsByCategory: {},
    },
    recentOrders: [],
    recentInquiries: [],
  })

  // Entity Lists
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [reviews, setReviews] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [subscribers, setSubscribers] = useState([])

  // Product Search & Filter
  const [productSearch, setProductSearch] = useState('')

  // Modal State for Add / Edit Product
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'RINGS',
    price: '',
    stock: 10,
    image: '/pics/prod-ring1.png',
    description: '',
  })

  // Load Overview
  const loadOverview = useCallback(async () => {
    try {
      const data = await api.admin.getOverview()
      if (data.success) {
        setOverview(data)
      }
    } catch (err) {
      console.warn('Overview load warning:', err.message)
    }
  }, [])

  // Load Products
  const loadProducts = useCallback(async () => {
    try {
      const data = await api.admin.getProducts()
      if (data.success) {
        setProducts(data.products || [])
      }
    } catch (err) {
      console.warn('Products load warning:', err.message)
    }
  }, [])

  // Load Orders
  const loadOrders = useCallback(async () => {
    try {
      const data = await api.admin.getOrders()
      if (data.success) {
        setOrders(data.orders || [])
      }
    } catch (err) {
      console.warn('Orders load warning:', err.message)
    }
  }, [])

  // Load Reviews
  const loadReviews = useCallback(async () => {
    try {
      const data = await api.admin.getReviews()
      if (data.success) {
        setReviews(data.reviews || [])
      }
    } catch (err) {
      console.warn('Reviews load warning:', err.message)
    }
  }, [])

  // Load Inquiries
  const loadInquiries = useCallback(async () => {
    try {
      const data = await api.admin.getInquiries()
      if (data.success) {
        setInquiries(data.inquiries || [])
      }
    } catch (err) {
      console.warn('Inquiries load warning:', err.message)
    }
  }, [])

  // Load Subscribers
  const loadSubscribers = useCallback(async () => {
    try {
      const data = await api.admin.getSubscribers()
      if (data.success) {
        setSubscribers(data.subscribers || [])
      }
    } catch (err) {
      console.warn('Subscribers load warning:', err.message)
    }
  }, [])

  // Initial Data Fetch
  useEffect(() => {
    setLoading(true)
    Promise.all([
      loadOverview(),
      loadProducts(),
      loadOrders(),
      loadReviews(),
      loadInquiries(),
      loadSubscribers(),
    ]).finally(() => setLoading(false))
  }, [loadOverview, loadProducts, loadOrders, loadReviews, loadInquiries, loadSubscribers])

  // One-click demo admin login
  const handleQuickAdminLogin = async () => {
    try {
      await login('admin@gemly.com', 'gemlyadmin123')
      loadOverview()
    } catch (err) {
      setError(err.message)
    }
  }

  // Fabrication Stages Definition
  const FABRICATION_STAGES = [
    { key: 'received', label: 'Received', icon: '📥' },
    { key: 'metallurgical_casting', label: 'Casting', icon: '🔥' },
    { key: 'gemstone_setting', label: 'Setting', icon: '💎' },
    { key: 'hand_polishing', label: 'Polishing', icon: '✨' },
    { key: 'hallmarking_inspection', label: 'Hallmarking', icon: '🔍' },
    { key: 'dispatched', label: 'Dispatched', icon: '🚀' },
    { key: 'delivered', label: 'Delivered', icon: '🎁' },
  ]

  // Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct(null)
    setProductForm({
      name: '',
      category: 'RINGS',
      price: '',
      stock: 10,
      image: '/pics/prod-ring1.png',
      description: '',
    })
    setProductModalOpen(true)
  }

  const handleOpenEditProduct = (p) => {
    setEditingProduct(p)
    setProductForm({
      name: p.name,
      category: p.category,
      price: p.price,
      stock: p.stock || 10,
      image: p.image || '/pics/prod-ring1.png',
      description: p.description || '',
    })
    setProductModalOpen(true)
  }

  const handleSaveProduct = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await api.admin.updateProduct(editingProduct._id, productForm)
      } else {
        await api.admin.createProduct(productForm)
      }
      setProductModalOpen(false)
      loadProducts()
      loadOverview()
    } catch (err) {
      alert('Error saving product: ' + err.message)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this piece from the GEMLY catalog?')) return
    try {
      await api.admin.deleteProduct(id)
      loadProducts()
      loadOverview()
    } catch (err) {
      alert(err.message)
    }
  }

  // Order Fabrication Stage Update
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.admin.updateOrderStatus(orderId, { orderStatus: newStatus })
      loadOrders()
      loadOverview()
    } catch (err) {
      alert(err.message)
    }
  }

  // Order Payment Status Update
  const handleUpdatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      await api.admin.updateOrderStatus(orderId, { paymentStatus })
      loadOrders()
      loadOverview()
    } catch (err) {
      alert(err.message)
    }
  }

  // Reviews Actions
  const handleToggleVerifyReview = async (id) => {
    try {
      await api.admin.verifyReview(id)
      loadReviews()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this client review?')) return
    try {
      await api.admin.deleteReview(id)
      loadReviews()
      loadOverview()
    } catch (err) {
      alert(err.message)
    }
  }

  // Inquiries Actions
  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      await api.admin.updateInquiryStatus(id, status)
      loadInquiries()
      loadOverview()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return
    try {
      await api.admin.deleteInquiry(id)
      loadInquiries()
      loadOverview()
    } catch (err) {
      alert(err.message)
    }
  }

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (!productSearch) return true
    const q = productSearch.toLowerCase()
    return (
      p.name?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-[#0E0E11] text-neutral-200 pt-24 pb-20 selection:bg-amber-500/30">
      {/* Header Banner */}
      <div className="border-b border-neutral-800 bg-[#141418] px-5 sm:px-10 lg:px-16 py-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-[#68001e] border border-amber-500/30 flex items-center justify-center text-[#A2D4F3] font-serif font-bold text-2xl shadow-lg">
              G
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl font-bold tracking-wider text-white">
                  GEMLY ATELIER PORTAL
                </h1>
                <span className="text-[10px] uppercase font-mono tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded">
                  Live DB
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">
                Bespoke Fabrication Operations, Catalog & Client Order Management
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>MongoDB Connected</span>
            </div>

            <a
              href="http://localhost:5000/admin"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3.5 py-2 rounded border border-neutral-700 transition"
            >
              Backend Portal (Port 5000) ↗
            </a>

            {!user?.role?.includes('admin') && (
              <button
                onClick={handleQuickAdminLogin}
                className="text-xs font-mono bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-3.5 py-2 rounded transition"
              >
                Sign In as Admin
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mx-auto max-w-7xl mt-6 flex space-x-2 border-t border-neutral-800/80 pt-2 overflow-x-auto">
          {[
            { id: 'overview', label: '📊 Overview', count: null },
            { id: 'products', label: '💎 Catalog', count: products.length },
            { id: 'orders', label: '📦 Bespoke Orders', count: orders.length },
            { id: 'reviews', label: '⭐ Reviews', count: reviews.length },
            { id: 'inquiries', label: '✉️ Inquiries', count: inquiries.length },
            { id: 'subscribers', label: '📰 Subscribers', count: subscribers.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider rounded-lg transition shrink-0 ${
                activeTab === tab.id
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              {tab.label} {tab.count !== null ? `(${tab.count})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16 py-8">
        {error && (
          <div className="mb-6 rounded-lg bg-rose-950/60 border border-rose-800 p-4 text-xs font-mono text-rose-300">
            {error}
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="rounded-xl border border-neutral-800 bg-[#141418] p-5 shadow-xs">
                <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Gross Pipeline Revenue
                </p>
                <p className="mt-2 text-3xl font-serif font-bold text-white">
                  ${(overview.stats?.totalRevenue || 0).toLocaleString()}
                </p>
                <p className="mt-1 text-[11px] text-emerald-400 font-mono">Bespoke Orders Value</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-[#141418] p-5 shadow-xs">
                <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Active Orders
                </p>
                <p className="mt-2 text-3xl font-serif font-bold text-white">
                  {overview.stats?.totalOrders || 0}
                </p>
                <p className="mt-1 text-[11px] text-amber-300 font-mono">In Fabrication Queue</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-[#141418] p-5 shadow-xs">
                <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Catalog Pieces
                </p>
                <p className="mt-2 text-3xl font-serif font-bold text-white">
                  {overview.stats?.totalProducts || 0}
                </p>
                <p className="mt-1 text-[11px] text-neutral-400 font-mono">Live In MongoDB</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-[#141418] p-5 shadow-xs">
                <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Concierge Inquiries
                </p>
                <p className="mt-2 text-3xl font-serif font-bold text-white">
                  {overview.stats?.totalInquiries || 0}
                </p>
                <p className="mt-1 text-[11px] text-rose-400 font-mono">
                  {overview.stats?.unreadInquiries || 0} Unread Inquiries
                </p>
              </div>
            </div>

            {/* Fabrication Stage Breakdown */}
            <div className="rounded-xl border border-neutral-800 bg-[#141418] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-serif font-bold text-white">
                    Bespoke Atelier Fabrication Stages
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Real-time count of orders progressing through the Auckland & Sydney ateliers
                  </p>
                </div>
                <button
                  onClick={loadOverview}
                  className="text-xs font-mono text-amber-400 hover:text-amber-300 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded"
                >
                  🔄 Refresh
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {FABRICATION_STAGES.map((st) => {
                  const count = overview.stats?.ordersByStatus?.[st.key] || 0
                  return (
                    <div
                      key={st.key}
                      className="rounded-lg border border-neutral-800/80 bg-neutral-900/40 p-4 text-center"
                    >
                      <div className="text-2xl">{st.icon}</div>
                      <div className="text-xl font-bold font-serif text-white mt-1">{count}</div>
                      <div className="text-[10px] uppercase font-mono text-neutral-400 mt-1">
                        {st.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick Actions & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 rounded-xl border border-neutral-800 bg-[#141418] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-serif font-bold text-white">Recent Bespoke Orders</h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-mono text-amber-400 hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b border-neutral-800 text-neutral-400 uppercase">
                      <tr>
                        <th className="py-2.5">Order #</th>
                        <th className="py-2.5">Client</th>
                        <th className="py-2.5">Items</th>
                        <th className="py-2.5">Total</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                      {overview.recentOrders?.length > 0 ? (
                        overview.recentOrders.map((o) => (
                          <tr key={o._id} className="hover:bg-neutral-900/40">
                            <td className="py-3 font-bold text-amber-300">{o.orderNumber}</td>
                            <td className="py-3">{o.shippingAddress?.fullName || 'Guest'}</td>
                            <td className="py-3 text-neutral-400">
                              {o.items?.length || 0} bespoke piece(s)
                            </td>
                            <td className="py-3 font-bold text-white">
                              ${o.total?.toLocaleString()}
                            </td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded text-[10px] uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                {o.orderStatus?.replace(/_/g, ' ')}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="py-6 text-center text-neutral-500">
                            No orders placed yet. Place a test order via Cart drawer on the site!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Atelier Controls */}
              <div className="lg:col-span-4 rounded-xl border border-neutral-800 bg-[#141418] p-6 space-y-4">
                <h2 className="text-lg font-serif font-bold text-white">Atelier Quick Controls</h2>
                <div className="space-y-2.5 text-xs font-mono">
                  <button
                    onClick={handleOpenAddProduct}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-2.5 px-4 rounded transition flex items-center justify-center space-x-2"
                  >
                    <span>+</span>
                    <span>Add New Jewellery Piece</span>
                  </button>
                  <Link
                    to="/shop"
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 py-2.5 px-4 rounded border border-neutral-800 transition flex items-center justify-center space-x-2 block text-center"
                  >
                    <span>💎</span>
                    <span>View Storefront Shop</span>
                  </Link>
                </div>

                <div className="border-t border-neutral-800 pt-4 mt-4">
                  <p className="text-[11px] font-mono text-neutral-400 uppercase mb-2">
                    Backend Connection Info
                  </p>
                  <div className="space-y-1 text-xs font-mono text-neutral-500">
                    <p>
                      REST API: <span className="text-neutral-300">http://localhost:5000/api</span>
                    </p>
                    <p>
                      Database: <span className="text-emerald-400">MongoDB Connected</span>
                    </p>
                    <p>
                      Admin Account:{' '}
                      <span className="text-amber-300">admin@gemly.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">Jewellery Catalog</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Manage solid gold & platinum pieces stored in MongoDB
                </p>
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search pieces..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 px-3.5 py-2 rounded focus:border-amber-400 focus:outline-none w-full sm:w-64"
                />
                <button
                  onClick={handleOpenAddProduct}
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded text-xs font-mono uppercase tracking-wider shrink-0 transition"
                >
                  + Add Piece
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-[#141418] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Piece Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Base Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p) => (
                        <tr key={p._id} className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4">
                            <img
                              src={p.image || '/pics/prod-ring1.png'}
                              alt=""
                              className="w-10 h-10 object-contain rounded bg-neutral-900 border border-neutral-800"
                              onError={(e) => {
                                e.target.src = '/pics/prod-ring1.png'
                              }}
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{p.name}</div>
                            <div className="text-[10px] text-neutral-500">{p.slug}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase bg-neutral-800 text-neutral-300 border border-neutral-700">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-amber-300">
                            ${p.price.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={p.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}
                            >
                              {p.stock || 10} in stock
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="text-amber-400 hover:text-amber-300 px-2 py-1 rounded bg-neutral-900 border border-neutral-800"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p._id)}
                              className="text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-neutral-900 border border-neutral-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-6 text-center text-neutral-500">
                          No products found matching &ldquo;{productSearch}&rdquo;
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BESPOKE ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">Bespoke Client Orders</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Track and advance fabrication stages from metallurgical casting to white-glove courier dispatch
                </p>
              </div>
              <button
                onClick={loadOrders}
                className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 px-3.5 py-2 rounded text-xs font-mono border border-neutral-800"
              >
                🔄 Refresh Orders
              </button>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-[#141418] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Order #</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Client / Shipping</th>
                      <th className="py-3 px-4">Bespoke Customization</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Fabrication Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    {orders.length > 0 ? (
                      orders.map((o) => (
                        <tr key={o._id} className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 font-bold text-amber-300">{o.orderNumber}</td>
                          <td className="py-3 px-4 text-neutral-400">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">
                              {o.shippingAddress?.fullName || 'Guest Client'}
                            </div>
                            <div className="text-[11px] text-neutral-400">
                              {o.shippingAddress?.city}, {o.shippingAddress?.country}
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              {o.guestEmail || o.user?.email}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[11px] text-neutral-300">
                            {(o.items || []).map((item, idx) => (
                              <div key={idx} className="truncate max-w-[220px]">
                                • {item.name} ({item.metal || '14K Gold'})
                              </div>
                            ))}
                          </td>
                          <td className="py-3 px-4 font-bold text-white">
                            ${o.total?.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={o.paymentStatus || 'pending'}
                              onChange={(e) => handleUpdatePaymentStatus(o._id, e.target.value)}
                              className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[11px] text-white focus:outline-none"
                            >
                              <option value="pending">⏳ Pending</option>
                              <option value="paid">✓ Paid</option>
                              <option value="refunded">Refunded</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={o.orderStatus || 'received'}
                              onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                              className="bg-neutral-900 border border-amber-500/30 rounded px-2 py-1 text-[11px] text-amber-300 font-medium focus:outline-none"
                            >
                              {FABRICATION_STAGES.map((st) => (
                                <option key={st.key} value={st.key}>
                                  {st.label.toUpperCase()}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="py-6 text-center text-neutral-500">
                          No bespoke orders in MongoDB yet. Test checkout via cart drawer on port 5173!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">Client Reviews</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Moderate verified purchaser ratings and feedback
                </p>
              </div>
              <button
                onClick={loadReviews}
                className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 px-3.5 py-2 rounded text-xs font-mono border border-neutral-800"
              >
                🔄 Refresh
              </button>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-[#141418] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Product Slug</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Review Details</th>
                      <th className="py-3 px-4">Verified</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    {reviews.length > 0 ? (
                      reviews.map((r) => (
                        <tr key={r._id} className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 font-bold text-amber-300">{r.productSlug}</td>
                          <td className="py-3 px-4">
                            <div className="text-white font-semibold">{r.author}</div>
                            <div className="text-[10px] text-neutral-500">{r.location}</div>
                          </td>
                          <td className="py-3 px-4 text-amber-400 font-bold">
                            {'★'.repeat(r.rating || 5)}
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <div className="font-bold text-neutral-200">{r.title}</div>
                            <div className="text-neutral-400 text-[11px] truncate">
                              {r.comment}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleVerifyReview(r._id)}
                              className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                                r.verified
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              {r.verified ? '✓ Verified' : 'Pending'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteReview(r._id)}
                              className="text-rose-400 hover:text-rose-300 text-[11px] px-2 py-1 rounded bg-neutral-900 border border-neutral-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-6 text-center text-neutral-500">
                          No client reviews submitted yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">Concierge Inquiries</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Client consultation requests submitted through the contact page
                </p>
              </div>
              <button
                onClick={loadInquiries}
                className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 px-3.5 py-2 rounded text-xs font-mono border border-neutral-800"
              >
                🔄 Refresh
              </button>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-[#141418] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Message</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    {inquiries.length > 0 ? (
                      inquiries.map((iq) => (
                        <tr key={iq._id} className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 text-neutral-400">
                            {new Date(iq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{iq.name}</div>
                            <div className="text-[10px] text-neutral-500">{iq.email}</div>
                          </td>
                          <td className="py-3 px-4 text-amber-300 font-medium">
                            {iq.subject || 'Consultation'}
                          </td>
                          <td className="py-3 px-4 max-w-sm text-neutral-300 text-[11px]">
                            {iq.message}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={iq.status || 'unread'}
                              onChange={(e) => handleUpdateInquiryStatus(iq._id, e.target.value)}
                              className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[11px] text-white focus:outline-none"
                            >
                              <option value="unread">🔴 Unread</option>
                              <option value="read">🟡 Read</option>
                              <option value="replied">🟢 Replied</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteInquiry(iq._id)}
                              className="text-rose-400 hover:text-rose-300 text-[11px] px-2 py-1 rounded bg-neutral-900 border border-neutral-800"
                            >
                              Archive
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-6 text-center text-neutral-500">
                          No concierge inquiries received yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">Private Circle Newsletter</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Subscribed client email addresses for trunk show previews
                </p>
              </div>
              <button
                onClick={loadSubscribers}
                className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 px-3.5 py-2 rounded text-xs font-mono border border-neutral-800"
              >
                🔄 Refresh
              </button>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-[#141418] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Subscriber Email</th>
                      <th className="py-3 px-4">Joined At</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    {subscribers.length > 0 ? (
                      subscribers.map((s) => (
                        <tr key={s._id} className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 font-bold text-white">{s.email}</td>
                          <td className="py-3 px-4 text-neutral-400">
                            {new Date(s.subscribedAt || s.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {s.status || 'Active'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="py-6 text-center text-neutral-500">
                          No subscribers yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {productModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-xl w-full rounded-2xl p-6 border border-neutral-700 bg-[#141418] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Add New Fine Jewellery Piece'}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="text-neutral-400 hover:text-white font-mono text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-neutral-400 uppercase mb-1">Piece Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. The Atelier Solitaire Bezel Ring"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 uppercase mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="RINGS">Rings</option>
                    <option value="NECKLACES">Necklaces</option>
                    <option value="EARRINGS">Earrings</option>
                    <option value="PENDANTS">Pendants</option>
                    <option value="BRACELETS">Bracelets</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 uppercase mb-1">Base Price (NZD) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="1850"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 uppercase mb-1">Inventory Stock</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 uppercase mb-1">Image URL or Path</label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Bespoke solid gold piece..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider"
                >
                  Save Piece
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
