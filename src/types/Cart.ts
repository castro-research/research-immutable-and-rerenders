export interface ICart {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export default class Cart implements ICart {
    id: number;
    name: string;
    price: number;
    quantity: number;

    constructor(id: number, name: string, price: number, quantity: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;

        this.addQuantity = this.addQuantity.bind(this);
        this.removeQuantity = this.removeQuantity.bind(this);
    }

    addQuantity() {
        this.quantity = this.quantity + 1;
    }

    removeQuantity() {
        this.quantity = this.quantity - 1;
    }
}