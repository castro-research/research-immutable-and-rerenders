import getCart from "@/services/get-cart"
import { ICart } from "@/types/Cart"
import React from "react"

interface ICartContext {
  cart: ICart[]
  handleAddQuantity: (id: number) => void
  handleRemoveQuantity: (id: number) => void
}

const cartContext = React.createContext<ICartContext>({} as ICartContext)

export default function CartProvider({ children }: React.PropsWithChildren) {
    const [cart, setCart] = React.useState<ICart[]>([])

    const handleAddQuantity = React.useCallback((id: number) => {
        // Another way to do the same thing
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }, [])

    const handleRemoveQuantity = React.useCallback((id: number) => {
        // Another way to do the same thing
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
        )
    }, [])

    const getAllCart = async () => {
        const cart = await getCart()
        setCart(cart)
    }

    React.useEffect(() => {
        getAllCart()
    }, [])

    return (
        <cartContext.Provider value={{ cart, handleAddQuantity, handleRemoveQuantity }}>
            {children}
        </cartContext.Provider>
    )
}

export const useCartContext = () => React.useContext(cartContext)