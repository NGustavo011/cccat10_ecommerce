import Checkout from "../src/Checkout";
import sinon from 'sinon';
import CurrencyGatewayHttp from "../src/CurrencyGatewayHttp";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase";
import CurrencyGateway from "../src/CurrencyGateway";
import ProductRepository from "../src/ProductRepository";

let checkout: Checkout;

beforeEach(function(){
    checkout = new Checkout();
})

test("Não deve aceitar um pedido com cpf inválido", async function(){
    const input = {
        cpf: "123.456.789-12",
        items: []
    }
    expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid CPF"));
});

test("Deve criar um pedido vazio", async function(){
    const input = {
        cpf: "407.302.170-27",
        items: []
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(0)
});

test("Deve criar um pedido com 3 produtos", async function(){
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
        ]
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(6090)
});

test("Deve criar um pedido com 3 produtos com cupom de desconto", async function(){
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
        ],
        coupon: "VALE20"
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(4872)
});

test("Deve criar um pedido com 3 produtos com cupom de desconto expirado", async function(){
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
        ],
        coupon: "VALE10"
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(6090)
});

test("Não deve criar um pedido com quantidade negativa em um dos produtos", async function(){
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: -1 },
        ]
    }
    expect(()=>checkout.execute(input)).rejects.toThrow("Invalid quantity");
});

test("Não deve criar um pedido com item duplicado", async function(){
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 1, quantity: 1 },
        ]
    }
    expect(()=> checkout.execute(input)).rejects.toThrow("Duplicated item");
});

test("Deve criar um pedido com 1 produto calculando o frete", async function(){
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 3 },
        ],
        from: "22060030",
        to: "88015600"
    }
    const output = await checkout.execute(input);
    expect(output.freight).toBe(90);
    expect(output.total).toBe(3090);
});

test("Não deve criar um pedido se o produto possuir alguma dimensão negativa", async function(){
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 4, quantity: 1 },
        ]
    }
    expect(()=>checkout.execute(input)).rejects.toThrow("Invalid dimension");
});

test("Deve criar um pedido com 1 produto calculando o frete com o valor mínimo", async function(){
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 3, quantity: 1 },
        ],
        from: "22060030",
        to: "88015600"
    }
    const output = await checkout.execute(input);
    expect(output.freight).toBe(10);
    expect(output.total).toBe(40);
});

test("Deve criar um pedido com 1 produto em dólar usando stub", async function(){
    const stubCurrencyGateway = sinon.stub(CurrencyGatewayHttp.prototype, "getCurrencies").resolves({
        usd: 3,
    });
    const stubProductRepositoryDatabase = sinon.stub(ProductRepositoryDatabase.prototype, "getProduct").resolves(
        { idProduct: 1, description: "A", price: 1000, width: 10, height: 10, length: 10, weight: 10, currency: "USD" }
    )
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 5, quantity: 1 },
        ]
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(3000)
    stubCurrencyGateway.restore();
    stubProductRepositoryDatabase.restore();
});

test("Deve criar um pedido com 3 produtos com cupom de desconto com spy", async function(){
    const spyProductRepository = sinon.spy(ProductRepositoryDatabase.prototype, "getProduct");
    const spyCouponRepository = sinon.spy(CouponRepositoryDatabase.prototype, "getCoupon");
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 1, quantity: 1 },
            { idProduct: 2, quantity: 1 },
            { idProduct: 3, quantity: 3 },
        ],
        coupon: "VALE20"
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(4872);
    expect(spyCouponRepository.calledOnce).toBeTruthy();
    expect(spyCouponRepository.calledWith("VALE20")).toBeTruthy();
    expect(spyProductRepository.calledThrice).toBeTruthy();
    spyCouponRepository.restore();
    spyProductRepository.restore();
});

test("Deve criar um pedido com 1 produto em dólar usando mock", async function(){
    const mockCurrencyGateway = sinon.mock(CurrencyGatewayHttp.prototype);
    mockCurrencyGateway.expects("getCurrencies").once().resolves({
        usd: 3
    });
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 5, quantity: 1 },
        ]
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(3000);
    mockCurrencyGateway.verify();
    mockCurrencyGateway.restore();
});

test("Deve criar um pedido com 1 produto em dólar usando fake", async function(){
    const currencyGateway: CurrencyGateway = {
        async getCurrencies(): Promise<any>{
            return { usd: 3 }
        }
    }
    const productRepository: ProductRepository = {
        async getProduct(idProduct: number): Promise<any> {
            return { idProduct: 1, description: "A", price: 1000, width: 10, height: 10, length: 10, weight: 10, currency: "USD" }
        }
    }
    checkout = new Checkout(currencyGateway, productRepository);
    const input = {
        cpf: "407.302.170-27",
        items: [
            { idProduct: 5, quantity: 1 },
        ]
    }
    const output = await checkout.execute(input);
    expect(output.total).toBe(3000);
});