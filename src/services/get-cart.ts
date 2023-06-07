import { ICart } from "@/types/Cart"

export default function getCart(): Promise<ICart[]> {
    return new Promise((resolve) => {
        const cart = [{
            id: 1,
            name: 'Product 1',
            price: 100,
            quantity: 1
        }, {
            id: 2,
            name: 'Product 2',
            price: 100,
            quantity: 1
        }]
        setTimeout(() => {
            resolve(cart)
        }, 1000)
    })
}