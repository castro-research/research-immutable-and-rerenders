'use client'
import useCartStateHook from '@/hooks/useCartState'
import useCartState from '@/state/cart'
import ListItem from '../common/ListItem'

export default function Home() {
    useCartStateHook()
    const cart = useCartState((state) => state.cart)
    const handleRemoveQuantity = useCartState(
        (state) => state.handleRemoveQuantity
    )
    const handleAddQuantity = useCartState((state) => state.handleAddQuantity)

    return (
        <main>
            <h1>State App </h1>
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
