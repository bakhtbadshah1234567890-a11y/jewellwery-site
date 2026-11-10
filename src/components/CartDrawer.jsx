import { useState } from 'react'
import { useCart } from '../context/useCart'
import { Link } from 'react-router-dom'
import { formatNZD } from '../utils/pricing'

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, itemCount } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end" aria-labelledby="cart-drawer-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white text-neutral-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div className="flex items-center gap-2">
            <h2 id="cart-drawer-title" className="font-mono text-xs uppercase tracking-widest font-semibold">
              Shopping Bag
            </h2>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-neutral-600">
              {itemCount}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="text-neutral-500 hover:text-neutral-900 p-1 font-mono text-xs uppercase"
            aria-label="Close cart"
          >
            ✕ Close
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-[#FAF9F6] px-6 py-2.5 font-mono text-[11px] uppercase tracking-wider text-neutral-700 text-center border-b border-neutral-200">
          Complimentary Insured Worldwide Shipping
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <p className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-2">
                Your shopping bag is empty
              </p>
              <p className="text-xs text-neutral-500 mb-6 max-w-xs">
                Discover our permanent archive of bezel settings and made-to-order fine jewellery.
              </p>
              <Link
                to="/shop"
                onClick={() => setIsCartOpen(false)}
                className="rounded-md bg-neutral-900 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:opacity-85"
              >
                Explore Archive
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-neutral-100 pb-5">
                <div className="size-20 shrink-0 overflow-hidden rounded bg-[#FAF9F6] border border-neutral-100 p-2">
                  <img src={item.image} alt={item.name} className="size-full object-contain" />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-normal text-neutral-900 leading-snug">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-neutral-400 hover:text-neutral-700 ml-2"
                        aria-label={`Remove ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>
                    {item.details && (
                      <p className="font-mono text-[11px] text-neutral-500 uppercase mt-1 leading-relaxed">
                        {item.details}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-neutral-200 rounded font-mono text-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2.5 py-0.5 text-neutral-600 hover:bg-neutral-100"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2.5 py-0.5 text-neutral-600 hover:bg-neutral-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-xs font-semibold text-neutral-900">
                      {formatNZD(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-neutral-200 p-6 space-y-4 bg-white">
            <div className="flex justify-between font-mono text-xs uppercase tracking-wider">
              <span className="text-neutral-500">Subtotal</span>
              <span className="font-semibold text-neutral-900 text-sm">
                {formatNZD(subtotal)}
              </span>
            </div>

            <p className="font-mono text-[10px] text-neutral-400 text-center uppercase tracking-wide">
              All taxes, duties & insured shipping included
            </p>

            {checkingOut ? (
              <div className="rounded bg-neutral-900 p-4 text-white font-mono text-xs text-center space-y-2">
                <p className="uppercase tracking-widest text-[#D6C2A1]">Secure Checkout Initialized</p>
                <p className="text-[11px] text-neutral-300">
                  Redirecting to encrypted 256-bit payment gateway...
                </p>
                <button
                  type="button"
                  onClick={() => setCheckingOut(false)}
                  className="text-[10px] underline text-neutral-400 hover:text-white"
                >
                  Return to bag
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCheckingOut(true)}
                className="w-full rounded bg-neutral-900 py-3.5 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85 shadow-sm font-semibold"
              >
                Proceed to Checkout →
              </button>
            )}

            <div className="text-center">
              <Link
                to="/shop"
                onClick={() => setIsCartOpen(false)}
                className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 hover:text-neutral-900 underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
