'use client'
import useCart from '@/hooks/useCart'
import useCartClasses from '@/hooks/useCartClasses';
import React from 'react'
import ListItem from '../common/ListItem';

export default function Home() {
    const { cart, handleAddQuantity, handleRemoveQuantity } = useCartClasses()

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
                        handleRemoveQuantity={handleRemoveQuantity}
                        handleAddQuantity={handleAddQuantity}
                    />
                ))}
            </ul>
        </main>
    )
}

// export default function HomeFail() {
//     const { cart, handleAddQuantity, handleRemoveQuantity } = useCart()

//     return (
//         <main>
//             <h1>Hook App</h1>
//             <ul>
//             {cart.map((item) => {
//                     const { id, name, quantity } = item
//                     return (
//                         <li key={id}>
//                             <p>{name}</p>
//                             <p role="timer">{new Date().getTime()}</p>
//                             <button
//                                 aria-label={`item-${id}-remove`}
//                                 onClick={() => handleRemoveQuantity(id)}
//                             >
//                                 -1
//                             </button>
//                             <span>{quantity}</span>
//                             <button
//                                 aria-label={`item-${id}-add`}
//                                 onClick={() => handleAddQuantity(id)}
//                             >
//                                 +1
//                             </button>
//                         </li>
//                     )
//                 })}
//             </ul>
//         </main>
//     )
// }