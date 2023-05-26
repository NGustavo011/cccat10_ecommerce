import Checkout from "../src/Checkout";
import sinon from 'sinon';
import CurrencyGatewayHttp from "../src/CurrencyGatewayHttp";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase";
import CurrencyGateway from "../src/CurrencyGateway";
import ProductRepository from "../src/ProductRepository";
import crypto from 'crypto';
import GetOrder from "../src/GetOrder";
import OrderRepositoryDatabase from "../src/OrderRepositoryDatabase";
import FreightCalculator from "../src/FreightCalculator";
import SimulateFreight from "../src/SimulateFreight";

let simulateFreight: SimulateFreight;

beforeEach(function(){
    simulateFreight = new SimulateFreight();
})

test("Deve calcular o frete para um pedido com 3 itens", async function(){
    const input = {
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
        ],
        from: "22060030",
        to: "88015600"
    }
    const output = await simulateFreight.execute(input);
    expect(output.freight).toBe(280)
});