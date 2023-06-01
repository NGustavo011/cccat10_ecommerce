import StockCalculator from "../../domain/entity/StockCalculator";
import StockEntry from "../../domain/entity/StockEntry";
import StockEntryRepositoy from "../repository/StockEntryRepositoy";

export default class CalculateStock {
    constructor (readonly stockEntryRepository: StockEntryRepositoy) {    
    }

    async execute({idProduct}: Input): Promise<Output>{
        const stockEntries = await this.stockEntryRepository.list(idProduct);
        const total = StockCalculator.calculate(stockEntries);
        return { total };
    }
}

type Input = {
    idProduct: number,
}

type Output = {
    total: number
}