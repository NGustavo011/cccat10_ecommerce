import CPF from "../src/class/CPF";
import Cart from "../src/class/Cart";
import Order from "../src/class/Order";
import Product from "../src/class/Product"

test("Deve criar um pedido com 3 produtos (com descrição, preço e quantidade) e calcular o valor total corretamente", function(){
    const product1 = new Product("Legend of zelda BOTW", 300);
    const product2 = new Product("Elden Ring", 1000);
    const product3 = new Product("God of war 4", 250);
    const order = new Order(new CPF("490.106.218-20"), new Cart());
    order.cart.addItem(product1, 5)
    order.cart.addItem(product2, 2)
    order.cart.addItem(product3, 2)
    const orderPrice = order.calculateOrderPrice()
    expect(orderPrice).toBe(4000)
})

test("Deve criar um pedido com 3 produtos, associar um cupom de desconto e calcular o total (percentual sobre o total do pedido)", function(){
    const product1 = new Product("Legend of zelda BOTW", 300);
    const product2 = new Product("Elden Ring", 1000);
    const product3 = new Product("God of war 4", 250);
    const order = new Order(new CPF("490.106.218-20"), new Cart());
    order.cart.addItem(product1, 5)
    order.cart.addItem(product2, 2)
    order.cart.addItem(product3, 2)
    order.applyCoupon(25)
    const orderPrice = order.calculateOrderPrice()
    expect(orderPrice).toBe(3000)
})