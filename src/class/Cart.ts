import Item from "./Item";
import Product from "./Product";

export default class Cart {
    items: Item[] = []

    addItem(produto: Product, quantity: number){
        this.items.push(new Item(produto, quantity));
    }

    calculateProductsPrice(){
        let totalOrder = 0;
        this.items.map((item => {
            totalOrder += item.quantity * item.product.preco
        }))
        return totalOrder;
    }
}