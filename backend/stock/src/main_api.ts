import AxiosAdapater from "./infra/http/AxiosAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromise from "./infra/database/PgPromiserAdapter";
import StockEntry from "./domain/entity/StockEntry";
import StockEntryRepositoy from "./application/repository/StockEntryRepositoy";
import DecrementStock from "./application/usecase/DecrementStock";
import CalculateStock from "./application/usecase/CalculateStock";

const stockEntries: StockEntry[] = [
    new StockEntry(1, "in", 20)
];
const stockEntryRepository: StockEntryRepositoy = {
    async save (stockEntry: StockEntry){
        stockEntries.push(stockEntry);
    },
    async list(idProduct: number){
        return stockEntries.filter((stockEntry: StockEntry) => stockEntry.idProduct === idProduct);
    }
};
const decrementStock = new DecrementStock(stockEntryRepository);
const calculateStock = new CalculateStock(stockEntryRepository);
const httpServer =  new ExpressAdapter();
new HttpController(httpServer, decrementStock, calculateStock);
httpServer.listen(3005);