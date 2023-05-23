import CPF from "./CPF";
import Cart from "./Cart";

export default class Order {
    coupon=0;
    constructor(readonly cpf: CPF, readonly cart: Cart){}
    
    applyCoupon(percentageValue: number){
        this.coupon=percentageValue;
    }

    calculateOrderPrice(){
        const productsPrice = this.cart.calculateProductsPrice();
        const orderPrice = productsPrice-(productsPrice*this.coupon/100);
        return orderPrice;
    }
}