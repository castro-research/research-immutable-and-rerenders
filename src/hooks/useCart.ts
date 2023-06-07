'use client';
import getCart from "@/services/get-cart";
import { ICart } from "@/types/Cart";
import { produce } from "immer";
import React from "react";

export default function useCart() {
    const [cart, setCart] = React.useState<ICart[]>([]);

    const handleGetCart = async () => {
        const cart = await getCart();
        const cartFormatted = cart.map((item) => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            }
        })

        setCart(cartFormatted);
    }

    React.useEffect(() => {
        handleGetCart();
    }, [])

    const handleAddQuantity = (id: number) => {
        // Try 1 - clone the cart, find the index of the item, and update the quantity
        // const cartCopy = [...cart];
        // const index = cartCopy.findIndex(currentItem => currentItem.id === id)
        // cartCopy[index].quantity += 1
        // setCart(cartCopy);

        // Try 2 - use immer to update the quantity
        setCart(
            produce((state: ICart[]) => {
                const cartItem = state.find(currentItem => currentItem.id === id)
                if(cartItem) {
                    cartItem.quantity += 1
                }
            }
        ))
    }

    const handleRemoveQuantity = (id: number) => {
        const cartCopy = [...cart];
        const index = cartCopy.findIndex(currentItem => currentItem.id === id)
        cartCopy[index].quantity -= 1
        setCart(cartCopy);
    }

    

    return {
        cart,
        setCart,
        handleAddQuantity,
        handleRemoveQuantity
    }
}