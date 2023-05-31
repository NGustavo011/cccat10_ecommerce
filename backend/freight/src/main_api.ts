import AxiosAdapater from "./infra/http/AxiosAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromise from "./infra/database/PgPromiserAdapter";
import CalculateFreight from "./application/usecase/CalculateFreight";
import ZipCodeRepository from "./application/repository/ZipCodeRepository";
import Zipcode from "./domain/entity/ZipCode";

const connection = new PgPromise();
const httpClient = new AxiosAdapater();
const zipCodeRepository: ZipCodeRepository = {
    async get(code: string): Promise<Zipcode | undefined> {
        if(code === "22060030"){
            return new Zipcode("22060030", "", "", -27.5945, -48.5477)
        }
        if(code === "88015600"){
            return new Zipcode("88015600", "", "", -22.9129, -43.2003)
        }
    }
}
const calculateFreight = new CalculateFreight(zipCodeRepository);
const httpServer =  new ExpressAdapter();
new HttpController(httpServer, calculateFreight);
httpServer.listen(3002);