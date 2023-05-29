import express, { Request, Response } from 'express';
import Checkout from './application/usecase/Checkout';
import PgPromise from './PgPromiserAdapter';
import CurrencyGatewayHttp from './CurrencyGatewayHttp';
import ProductRepositoryDatabase from './ProductRepositoryDatabase';
import CouponRepositoryDatabase from './CouponRepositoryDatabase';
import OrderRepositoryDatabase from './OrderRepositoryDatabase';

const app = express();
app.use(express.json())

app.post("/checkout", async function(request: Request, response: Response){
    try{
        const connection = new PgPromise();
        const currencyGateway = new CurrencyGatewayHttp();
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