import Connection from "../src/Connection";
import PgPromise from "../src/PgPromiserAdapter";
import ProductRepository from "../src/ProductRepository";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import SimulateFreight from "../src/application/usecase/SimulateFreight";

let simulateFreight: SimulateFreight;
let connection: Connection;
let productRepository: ProductRepository;

beforeEach(function(){
    connection = new PgPromise();
    productRepository = new ProductRepositoryDatabase(connection);
    simulateFreight = new SimulateFreight(productRepository);
})

afterEach(async function(){
    await connection.close();
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