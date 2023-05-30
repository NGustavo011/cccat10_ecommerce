import AxiosAdapater from "./infra/http/AxiosAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromise from "./infra/database/PgPromiserAdapter";
import CalculateFreight from "./application/usecase/CalculateFreight";

const connection = new PgPromise();
const httpClient = new AxiosAdapater();
const calculateFreight = new CalculateFreight();
const httpServer =  new ExpressAdapter();
new HttpController(httpServer, calculateFreight);
httpServer.listen(3002);