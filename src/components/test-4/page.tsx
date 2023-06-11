'use client'
import CartProvider, { useCartContext } from '@/provider'
import React from 'react';

const ListItem = React.memo(({id, name, quantity, handleRemoveQuantity, handleAddQuantity}) => {
// It will make the component re-render every time the cart changes
//   const {cart, handleRemoveQuantity, handleAddQuantity} = useCartContext()
//   const item = cart.find((item) => item.id === id)
//   const {name, quantity} = item

  return (
      <li key={id}>
          <p>{name}</p>
          <p role="timer">{new Date().getTime()}</p>
          <button
              aria-label={`item-${id}-remove`}
              onClick={() => handleRemoveQuantity(id)}
          >
              -1
          </button>
          <span>{quantity}</span>
          <button
              aria-label={`item-${id}-add`}
              onClick={() => handleAddQuantity(id)}
          >
              +1
          </button>
      </li>
  );
});

ListItem.displayName = 'ListItem'

function Home() {
  const {cart, handleRemoveQuantity, handleAddQuantity } = useCartContext()
  return (
        <main>
            <h1>Provider App </h1>
            <ul>
                {cart.map((item) => (
                    <ListItem
                        id={item.id}
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        handleRemoveQuantity={handleRemoveQuantity}
                        handleAddQuantity={handleAddQuantity}
                    />
                ))}
            </ul>
        </main>
    )
}

export default function HomeWrapper() {
    return (
        <CartProvider>
            <Home />
        </CartProvider>
    )
}