import CPF from "../../src/domain/entity/CPF";
let cpf: CPF;

beforeEach(function(){
})

test.each([
	"407.302.170-27",
	"684.053.160-00",
	"746.971.314-01"
])("Deve testar um cpf válido", function (value) {
	expect(() => new CPF(value)).not.toThrow();
});

test.each([
	"406.302.170-27",
	"406302170",
	"406302170123456789",
	"406302170123456789"
])("Deve testar um cpf inválido", function (value) {
	expect(() => new CPF(value)).toThrow(new Error("Invalid CPF"));
});

test.each([
	"111.111.111-11",
	"222.222.222-22"
])("Deve testar um cpf inválido com todos os dígitos iguais", function (value) {
	expect(() => new CPF(value)).toThrow(new Error("Invalid CPF"));
});