import express, { Request, Response } from 'express';
import Checkout from './application/usecase/Checkout';
import PgPromise from './infra/database/PgPromiserAdapter';
import CurrencyGatewayHttp from './infra/gateway/CurrencyGatewayHttp';
import ProductRepositoryDatabase from './infra/repository/ProductRepositoryDatabase';
import CouponRepositoryDatabase from './infra/repository/CouponRepositoryDatabase';
import OrderRepositoryDatabase from './infra/repository/OrderRepositoryDatabase';
import AxiosAdapater from './infra/http/AxiosAdapter';

const app = express();
app.use(express.json())

app.post("/checkout", async function(request: Request, response: Response){
    try{
        const connection = new PgPromise();
        const httpClient = new AxiosAdapater();
        const currencyGateway = new CurrencyGatewayHttp(httpClient);
        const productRepository = new ProductRepositoryDatabase(connection);
        const couponRepository = new CouponRepositoryDatabase(connection);
        const orderRepository = new OrderRepositoryDatabase(connection);
        const checkout = new Checkout(currencyGateway, productRepository, couponRepository, orderRepository);
        const output = await checkout.execute(request.body);
        response.json(output);
    } catch(error){
        if(error instanceof Error){
            response.status(422).json({
                message: error.message
            });
        }
    }
});

app.listen(3000);