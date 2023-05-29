import CLIController from "./CLIController";
import CLIHandlerNode from "./CLIHandlerNode";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import CurrencyGatewayHttp from "./CurrencyGatewayHttp";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import PgPromise from "./PgPromiserAdapter";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import Checkout from "./application/usecase/Checkout";

const handler = new CLIHandlerNode();
const connection = new PgPromise();
const currencyGateway = new CurrencyGatewayHttp();
const productRepository = new ProductRepositoryDatabase(connection);
const couponRepository = new CouponRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryDatabase(connection);
const checkout = new Checkout(currencyGateway, productRepository, couponRepository, orderRepository);
new CLIController(handler, checkout);