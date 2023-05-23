import CPF from "../src/classes/CPF";
import Cart from "../src/classes/Cart";
import Item from "../src/classes/Item";
import Order from "../src/classes/Order";
import Product from "../src/classes/Product"

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

test("Deve lançar um erro por tentar criar um inválido (por conta do seu tamanho)", function(){
    expect(() => new CPF("222")).toThrow(new Error("Invalid CPF"))
})

test("Deve lançar um erro por tentar criar um CPF inválido (por conta dos caracteres repetidos)", function(){
    expect(() => new CPF("222.222.222-22")).toThrow(new Error("Invalid CPF"))
})

test("Deve lançar um erro por tentar criar um CPF inválido (por conta da regra de números no CPF)", function(){
    expect(() => new CPF("123.456.789-12")).toThrow(new Error("Invalid CPF"))
})

test("Não deve ser encontrado nenhum throw ao criar um CPF com valor válido", function(){
    expect(() => new CPF("490.106.218-20")).not.toThrow()
})