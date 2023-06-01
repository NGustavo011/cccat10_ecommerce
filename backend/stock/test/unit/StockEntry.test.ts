import StockEntry from "../../src/domain/entity/StockEntry"

test("Não deve criar uma entrada no estoque com quantidade menor que 1", function(){
    expect(()=> new StockEntry(1, "in", -10)).toThrow(new Error("Invalid quantity"));
})