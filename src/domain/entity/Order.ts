import CPF from "./CPF";
import Coupon from "./Coupon";
import CurrencyTable from "./CurrencyTable";
import Item from "./Item";
import Product from "./Product";
import crypto from "crypto";

export default class Order {
    readonly items: Item[];
    readonly cpf: CPF;
    readonly code: string;
    coupon?: Coupon;
    freight = 0;
    
    constructor(readonly idOrder: string | undefined, cpf: string, readonly currencyTable: CurrencyTable = new CurrencyTable(), readonly sequence: number = 1, readonly date: Date = new Date()){
        if(!idOrder) this.idOrder = crypto.randomUUID();
        this.items = [];
        this.cpf = new CPF(cpf);
        this.code = `${date.getFullYear()}${sequence.toString().padStart(8, "0")}`;
    }

    addItem(product: Product, quantity: number){
        if(this.items.some((item: Item) => item.idProduct===product.idProduct))
            throw new Error("Duplicated item");
        if(quantity <= 0)
            throw new Error("Invalid quantity");
        this.items.push(new Item(product.idProduct, product.price, quantity, product.currency));
    }

    addCoupon(coupon: Coupon){
        if(!coupon.isExpired(this.date))
            this.coupon = coupon
    }

    getTotal(){
        let total = 0;
        for (const item of this.items){
            total += item.price * item.quantity * this.currencyTable.getCurrency(item.currency);
        }
        if(this.coupon)
            total -= this.coupon.calculateDiscount(total);
        total += this.freight;
        return total;
    }

    getCode(){
        return this.code;
    }
}