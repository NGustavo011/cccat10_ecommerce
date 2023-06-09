import AxiosAdapater from './infra/http/AxiosAdapter';
import CouponRepositoryDatabase from './infra/repository/CouponRepositoryDatabase';
import CurrencyGatewayHttp from './infra/gateway/CurrencyGatewayHttp';
import OrderRepositoryDatabase from './infra/repository/OrderRepositoryDatabase';
import PgPromise from './infra/database/PgPromiserAdapter';
import ProductRepositoryDatabase from './infra/repository/ProductRepositoryDatabase';
import Checkout from './application/usecase/Checkout';

const input: Input = {cpf: "", items: []};
process.stdin.on("data", async function(chunk){
    const command = chunk.toString().replace("\n","");
    if(command.startsWith("set-cpf")){
        input.cpf = command.replace("set-cpf", "").trim()
    }
    if(command.startsWith("add-item")){
        const [idProduct, quantity] = command.replace("add-item", "").trim().split(" ");
        input.items.push({idProduct: parseInt(idProduct), quantity: parseInt(quantity)})
    }
    if(command.startsWith("checkout")){
        try{
            const connection = new PgPromise();
            const httpClient = new AxiosAdapater();
            const currencyGateway = new CurrencyGatewayHttp(httpClient);
            const productRepository = new ProductRepositoryDatabase(connection);
            const couponRepository = new CouponRepositoryDatabase(connection);
            const orderRepository = new OrderRepositoryDatabase(connection);
            const checkout = new Checkout(currencyGateway, productRepository, couponRepository, orderRepository);
           const output = await checkout.execute(input)
           console.log(output)
        } catch(error){
            if(error instanceof Error)
                console.log(error)
        }
    }
    console.log(input);
})

type Input = {
    cpf: string,
    items: {
        idProduct: number,
        quantity: number
    }[],
    coupon?: string,
    from?: string,
    to?: string,
}