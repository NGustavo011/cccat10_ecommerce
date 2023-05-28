import CPF from "../src/CPF";
import Order from "../src/Order";
import crypto from "crypto";
import Product from "../src/Product";
import CurrencyTable from "../src/CurrencyTable";

test ("Não deve criar um pedido com CPF inválido", function(){
    const uuid = crypto.randomUUID();
    expect(()=>new Order(uuid, "406.302.170-27")).toThrow("Invalid CPF");
    ;
});

test("Deve criar um pedido vazio", function(){
    const uuid = crypto.randomUUID();
    const order = new Order(uuid, "407.302.170-27");
    expect(order.getTotal()).toBe(0);
});

test("Deve criar um pedido com 3 itens", function(){
    const uuid = crypto.randomUUID();
    const order = new Order(uuid, "407.302.170-27");
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3, "BRL"), 1);
    order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22, "BRL"), 1);
    order.addItem(new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL"), 3);
    expect(order.getTotal()).toBe(6090);
});

test("Não pode adicionar item duplicado", function(){
    const uuid = crypto.randomUUID();
    const order = new Order(uuid, "407.302.170-27");
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3, "BRL"), 1);
    expect(()=>order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3, "BRL"), 1)).toThrow(new Error("Duplicated item"));
});

test("Não pode adicionar item com a quantidade menor ou igual a 0", function(){
    const uuid = crypto.randomUUID();
    const order = new Order(uuid, "407.302.170-27");
    expect(()=>order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3, "BRL"), -1)).toThrow(new Error("Invalid quantity"));
});

test("Deve criar um pedido com 3 itens sendo um em dólar", function(){
    const uuid = crypto.randomUUID();
    const currencyTable = new CurrencyTable();
    currencyTable.addCurrency("USD", 3);
    const order = new Order(uuid, "407.302.170-27", currencyTable);
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3, "BRL"), 1);
    order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22, "USD"), 1);
    order.addItem(new Product(3, "C", 30, 10, 10, 10, 0.9, "BRL"), 3);
    expect(order.getTotal()).toBe(16090);
});

test("Deve criar um pedido e gerar o código", function(){
    const uuid = crypto.randomUUID();
    const order = new Order(uuid, "407.302.170-27", new CurrencyTable(), 1, new Date("2023-10-01T10:00:00"));
    expect(order.getCode()).toBe("202300000001");
});