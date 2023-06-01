import StockEntry from "../../domain/entity/StockEntry";

export default interface StockEntryRepositoy {
    save(stockEntry: StockEntry): Promise<void>;
    list(idProduct: number): Promise<StockEntry[]>;
}