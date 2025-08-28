import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { clearCart, getCart, removeFromCart } from '../api'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, setCart, USER_ID } = useCart()

  const refresh = () => getCart(USER_ID).then(res => {
    const cartData = { items: res.data || [] }
    setCart(cartData)
  })

  useEffect(() => { refresh() }, [])

  const remove = async (id) => {
    await removeFromCart(USER_ID, id)
    await refresh()
  }

  const clear = async () => {
    await clearCart(USER_ID)
    await refresh()
  }

  const total = cart.items?.reduce((sum, it) => sum + (it.book?.price * it.quantity), 0) || 0

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.items?.length === 0 && <p>Cart is empty.</p>}
      {cart.items?.map(it => (
        <div key={it.id} style={{display:'flex', alignItems:'center', gap:12, borderTop:'1px solid #eee', padding:'8px 0'}}>
          <div style={{flex:1}}>{it.book?.title}</div>
          <div>x{it.quantity}</div>
          <div>${it.book?.price?.toFixed(2)}</div>
          <button onClick={() => remove(it.id)}>Remove</button>
        </div>
      ))}
      <div style={{marginTop:16, display:'flex', gap:12, alignItems:'center'}}>
        <strong>Total: ${total.toFixed(2)}</strong>
        <Link to="/checkout"><button disabled={total===0}>Proceed to Checkout</button></Link>
        <button onClick={clear} disabled={(cart.items?.length||0)===0}>Clear</button>
      </div>
    </div>
  )
}
