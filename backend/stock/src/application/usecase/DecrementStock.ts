import StockEntry from "../../domain/entity/StockEntry";
import StockEntryRepositoy from "../repository/StockEntryRepositoy";

export default class DecrementStock {
    constructor (readonly stockEntryRepository: StockEntryRepositoy) {    
    }

    async execute(input: Input){
        for (const item of input.items){
            await this.stockEntryRepository.save(new StockEntry(item.idProduct, "out", item.quantity));
        }
    }
}

type Input = {
    items: {
        idProduct: number,
        quantity: number
    }[]
}