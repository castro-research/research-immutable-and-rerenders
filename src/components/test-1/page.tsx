'use client'
import useCart from '@/hooks/useCart'
import React from 'react'

const ListItem = React.memo(({ id, name, quantity, handleRemoveQuantity, handleAddQuantity }) => {
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

export default function Home() {
    const { cart, handleAddQuantity, handleRemoveQuantity } = useCart()

    // If you wont use the useCallback hook, the function will change reference
    // and the ListItem will be re-rendered
    const handleAdd = React.useCallback((id: number) => {
      handleAddQuantity(id)
    }, [])

    // If you wont use the useCallback hook, the function will change reference
    // and the ListItem will be re-rendered
    const handleRemove = React.useCallback((id: number) => {
      handleRemoveQuantity(id)
    }, [])

    return (
        <main>
            <h1>Hook App</h1>
            <ul>
              {cart.map((item) => (
                    <ListItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        handleRemoveQuantity={handleRemove}
                        handleAddQuantity={handleAdd}
                    />
                ))}
            </ul>
        </main>
    )
}
