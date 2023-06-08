import getCart from '@/services/get-cart'
import useCartState from '@/state/cart'
import React from 'react'

export default function useCart() {
    const { setCart } = useCartState()

    const handleGetCart = async () => {
        const cart = await getCart()
        const cartFormatted = cart.map((item) => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            }
        })

        setCart(cartFormatted)
    }

    React.useEffect(() => {
        handleGetCart()
    }, [])

    return {
        setCart,
    }
}
