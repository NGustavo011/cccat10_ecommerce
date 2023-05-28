import CPF from "../src/CPF";
let cpf: CPF;

beforeEach(function(){
})

test.each(["407.302.170-27", "684.053.160-00"])("Deve testar um cpf válido", function(value){
    expect(()=>cpf = new CPF(value)).not.toThrow();
});

test.each(["222", "222.222.222-22", "123.456.789-12", "123.456.78a-12"])("Deve lançar um erro por tentar criar um inválido - %s", function(cpf){
    expect(() => new CPF(cpf)).toThrow(new Error("Invalid CPF"));
})