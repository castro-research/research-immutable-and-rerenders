'use client'
import useCartStateHook from '@/hooks/useCartState'
import useCartState from '@/state/cart'

export default function Home() {
  useCartStateHook()
  const cart = useCartState((state) => state.cart)
  const handleRemoveQuantity = useCartState((state) => state.handleRemoveQuantity)
  const handleAddQuantity = useCartState((state) => state.handleAddQuantity)
  console.log(cart)
  return (
    <main>
      <h1>State App </h1>
      <ul>
        {cart.map((item, index) => (
            <li key={item.id}>
              {item.name} - {item.price}
              <button onClick={() => handleRemoveQuantity(index)}>
                -1
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleAddQuantity(index)}>
                +1
              </button>
            </li>
          )
        )}
      </ul>
    </main>
  )
}
