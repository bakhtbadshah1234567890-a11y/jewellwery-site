import { useState, useEffect } from 'react'
import { CartContext } from './cartContextDefinition.js'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('gemly_cart')
      return saved ? JSON.parse(saved) : [
        {
          id: 'sizing-kit-1',
          name: 'Ring + Bracelet Sizing Kit',
          price: 15,
          priceDisplay: '$15 NZD',
          image: '/pics/sizing-kit-1.png',
          quantity: 1,
          details: 'Physical multisizer + millimeter bracelet band'
        }
      ]
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('gemly_cart', JSON.stringify(cart))
    } catch {
      // ignore
    }
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        )
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        itemCount,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
