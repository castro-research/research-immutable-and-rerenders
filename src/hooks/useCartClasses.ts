'use client'
import getCart from '@/services/get-cart'
import Cart from '@/types/Cart'
import React from 'react'

export default function useCartClasses() {
    const [cart, setCart] = React.useState<Cart[]>([])
    
    const handleGetCart = async () => {
        const cart = await getCart()
        const cartFormatted = cart.map((item) => {
            return new Cart(item.id, item.name, item.price, item.quantity)
        })
        setCart(cartFormatted)
    }

    React.useEffect(() => {
        handleGetCart()
    }, [])

    const handleAddQuantity = React.useCallback((id: number) => {
        setCart((prevState) => {
            const cartCopy = [...prevState];
            const index = cartCopy.findIndex(currentItem => currentItem.id === id)
            cartCopy[index].addQuantity()
            
            return cartCopy
        })
      }, [])

      const handleRemoveQuantity = React.useCallback((id: number) => {
        setCart((prevState) => {
            const cartCopy = [...prevState];
            const index = cartCopy.findIndex(currentItem => currentItem.id === id)
            cartCopy[index].removeQuantity()
            
            return cartCopy
        })
      }, [])

    return {
        cart,
        setCart,
        handleAddQuantity,
        handleRemoveQuantity,
    }
}
