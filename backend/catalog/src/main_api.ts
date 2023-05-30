import AxiosAdapater from "./infra/http/AxiosAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromise from "./infra/database/PgPromiserAdapter";
import ProductRepositoryDatabase from "./infra/repository/ProductRepositoryDatabase";
import GetProducts from "./application/usecase/GetProducts";
import GetProduct from "./application/usecase/GetProduct";

const connection = new PgPromise();
const httpClient = new AxiosAdapater();
const productRepository = new ProductRepositoryDatabase(connection);
const getProduct = new GetProduct(productRepository);
const getProducts = new GetProducts(productRepository);
const httpServer =  new ExpressAdapter();
new HttpController(httpServer, getProduct, getProducts);
httpServer.listen(3003);