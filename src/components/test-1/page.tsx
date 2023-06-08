'use client'
import useCart from '@/hooks/useCart'
import React from 'react'

// const RenderItem = React.memo((props) => {
//   const { id, name, quantity, onAdd, onRemove } = props
//   return (
//     <li key={id}>
//         <p>{name}</p>
//         <p role='timer'>{new Date().getTime()}</p>
//         <button onClick={onRemove}>
//           -1
//         </button>
//         <span>{quantity}</span>
//         <button aria-label={`item-${id}-add`} onClick={onAdd}>
//           +1
//         </button>
//     </li>
//   )
// })

// RenderItem.displayName = 'RenderItem'

export default function Home() {
    const { cart, handleAddQuantity, handleRemoveQuantity } = useCart()

    return (
        <main>
            <h1>Hook App</h1>
            <button onClick={() => handleAddQuantity(1)}>teste</button>
            <ul>
                {cart.map((item) => {
                    const { id, name, quantity } = item
                    return (
                        <li key={id}>
                            <p>{name}</p>
                            <p role="timer">{new Date().getTime()}</p>
                            <button
                                aria-label={`item-${id}-remove`}
                                onClick={() => handleRemoveQuantity(item.id)}
                            >
                                -1
                            </button>
                            <span>{quantity}</span>
                            <button
                                aria-label={`item-${id}-add`}
                                onClick={() => handleAddQuantity(item.id)}
                            >
                                +1
                            </button>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}
