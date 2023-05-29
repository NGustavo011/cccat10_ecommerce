import CLIController from "../src/CLIController";
import CLIHandler from "../src/CLIHandler";
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase";
import CurrencyGatewayHttp from "../src/CurrencyGatewayHttp";
import OrderRepositoryDatabase from "../src/OrderRepositoryDatabase";
import PgPromise from "../src/PgPromiserAdapter";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import Checkout from "../src/application/usecase/Checkout";

test("Deve testar o cli", async function(){
    const connection = new PgPromise();
    const currencyGateway = new CurrencyGatewayHttp();
    const productRepository = new ProductRepositoryDatabase(connection);
    const couponRepository = new CouponRepositoryDatabase(connection);
    const orderRepository = new OrderRepositoryDatabase(connection);
    const checkout = new Checkout(currencyGateway, productRepository, couponRepository, orderRepository);
    let output: any;
    const handler = new class extends CLIHandler{
        write(text: string): void {
            output = JSON.parse(text);
        }
    };
    new CLIController(handler, checkout);

    handler.type("set-cpf 407.302.170-27");
    handler.type("add-item 1 1");
    handler.type("add-item 2 1");
    handler.type("add-item 3 3");
    await handler.type("checkout");
    expect(output.total).toBe(6090);
    expect(output.freight).toBe(280);
    await connection.close();
});