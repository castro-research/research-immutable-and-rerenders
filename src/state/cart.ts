import { ICart } from '@/types/Cart'
import { create } from 'zustand'
import { produce } from 'immer'

interface ICartState {
    cart: ICart[]
    setCart: (cart: ICart[]) => void
    handleAddQuantity: (id: number) => void
    handleRemoveQuantity: (id: number) => void
}

const useCartState = create<ICartState>((set, get) => ({
    cart: [],
    setCart: (cart) => set({ cart }),
    // This is a update with immer
    handleAddQuantity: (id) => {
        const index = get().cart.findIndex((currentItem) => currentItem.id === id)
        set(
            produce((state: ICartState) => {
                state.cart[index].quantity += 1
            })
        )
    },
    // It works without immer, but I'm not sure if it's the best way to do it
    handleRemoveQuantity: (id) => {
        const cartCopy = [...get().cart]
        const index = get().cart.findIndex((currentItem) => currentItem.id === id)

        cartCopy[index] = {
            ...cartCopy[index],
            quantity: cartCopy[index].quantity - 1,
        }
        set({ cart: cartCopy })
    }
}))

export default useCartState
