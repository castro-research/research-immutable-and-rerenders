'use client'
import useCart from '@/hooks/useCart'
import React from 'react'

const RenderItem = React.memo((props) => {
  const { id, name, quantity, onAdd, onRemove } = props
  return (
    <li key={id}> 
        <p>{name}</p>
        <p role='timer'>{new Date().getTime()}</p>
        <button onClick={onRemove}>
          -1
        </button>
        <span>{quantity}</span>
        <button aria-label={`item-${id}-add`} onClick={onAdd}>
          +1
        </button>
    </li>
  )
})

export default function Home() {
  const { cart, handleAddQuantity, handleRemoveQuantity } = useCart()

  return (
    <main>
      <h1>Hook App</h1>
      <ul>
        {cart.map((item) => 
          <RenderItem 
            key={item.id}
            name={item.name}
            id={item.id}
            quantity={item.quantity}
            onAdd={() => handleAddQuantity(item.id)}
            onRemove={() => handleRemoveQuantity(item.id)}
          />)}
      </ul>
    </main>
  )
}
