import Product from "./Product";

export default class Item {
    constructor(readonly product: Product, readonly quantity: number){}
}