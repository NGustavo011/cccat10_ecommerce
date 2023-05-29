import AxiosAdapater from "./infra/http/AxiosAdapter";
import CouponRepositoryDatabase from "./infra/repository/CouponRepositoryDatabase";
import CurrencyGatewayHttp from "./infra/gateway/CurrencyGatewayHttp";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import OrderRepositoryDatabase from "./infra/repository/OrderRepositoryDatabase";
import PgPromise from "./infra/database/PgPromiserAdapter";
import ProductRepositoryDatabase from "./infra/repository/ProductRepositoryDatabase";
import Checkout from "./application/usecase/Checkout";
import GetProducts from "./application/usecase/GetProducts";

const connection = new PgPromise();
const httpClient = new AxiosAdapater();
const currencyGateway = new CurrencyGatewayHttp(httpClient);
const productRepository = new ProductRepositoryDatabase(connection);
const couponRepository = new CouponRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryDatabase(connection);
const checkout = new Checkout(currencyGateway, productRepository, couponRepository, orderRepository);
const getProducts = new GetProducts(productRepository);
const httpServer =  new ExpressAdapter();
new HttpController(httpServer, checkout, getProducts);
httpServer.listen(3000);