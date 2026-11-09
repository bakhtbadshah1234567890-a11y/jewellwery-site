import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, itemCount } = useCart()

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
              Your Cart
            </h2>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-neutral-600">
              {itemCount}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="text-neutral-500 hover:text-neutral-900 p-1"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-[#f7f6f4] px-6 py-2.5 font-mono text-[11px] uppercase tracking-wider text-neutral-700 text-center border-b border-neutral-200">
          Complimentary Worldwide Shipping on All Orders
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <p className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-2">
                Your cart is empty
              </p>
              <p className="text-xs text-neutral-500 mb-6">
                Discover our bespoke designs and fine jewellery collections.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-md bg-neutral-900 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:opacity-85"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-neutral-100 pb-5">
                <div className="size-20 shrink-0 overflow-hidden rounded bg-neutral-100 p-2">
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
                      <p className="font-mono text-[11px] text-neutral-500 uppercase mt-0.5">
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

                    <span className="font-mono text-sm font-medium text-neutral-900">
                      ${(item.price * item.quantity).toLocaleString()} NZD
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-neutral-200 p-6 space-y-4 bg-white">
            <div className="flex justify-between font-mono text-xs uppercase tracking-wider">
              <span className="text-neutral-500">Subtotal</span>
              <span className="font-semibold text-neutral-900 text-sm">
                ${subtotal.toLocaleString()} NZD
              </span>
            </div>

            <p className="font-mono text-[11px] text-neutral-400 text-center uppercase tracking-wide">
              Taxes and duties calculated at checkout
            </p>

            <button
              type="button"
              onClick={() => alert('Proceeding to checkout with HEIREST Secure Pay...')}
              className="w-full rounded-md bg-neutral-900 py-3.5 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85 shadow-sm"
            >
              Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
