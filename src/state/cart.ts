import { ICart } from '@/types/Cart'
import { create } from 'zustand'
import { produce } from 'immer'

interface ICartState {
    cart: ICart[]
    setCart: (cart: ICart[]) => void
    handleAddQuantity: (index: number) => void
    handleRemoveQuantity: (index: number) => void
}

const useCartState = create<ICartState>((set, get) => ({
    cart: [],
    setCart: (cart) => set({ cart }),
    handleAddQuantity: (index) =>
    set(
      produce((state: ICartState) => {
        state.cart[index].quantity += 1
      })
    ),
    handleRemoveQuantity: (index) =>
    set(
      produce((state) => {
        state.cart[index].quantity -= 1
      })
    ),
}))

export default useCartState