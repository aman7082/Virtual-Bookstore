import { createContext, useContext, useEffect, useState } from 'react'
import { getCart } from '../api'

const CartCtx = createContext()

export function CartProvider({ children }) {
  const USER_ID = 1 // demo user
  const [cart, setCart] = useState({ items: [] })

  useEffect(() => {
    getCart(USER_ID).then(res => {
      // Transform backend response to match frontend expectations
      const cartData = { items: res.data || [] }
      setCart(cartData)
    }).catch(()=>{})
  }, [])

  return <CartCtx.Provider value={{ cart, setCart, USER_ID }}>{children}</CartCtx.Provider>
}

export const useCart = () => useContext(CartCtx)
