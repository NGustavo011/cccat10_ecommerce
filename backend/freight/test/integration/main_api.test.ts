import axios from "axios"

test("Deve testar o cálculo do frete via API sem CEP", async function(){
    const input = {
        items: [
            { width: 100, height: 30, length: 10, weight: 3, quantity: 2 },
        ],
    }
    const response = await axios.post("http://localhost:3002/calculateFreight", input);
    const output = response.data;
    expect(output.freight).toBe(60);
})

test("Deve testar o cálculo do frete via API com CEP", async function(){
    const input = {
        items: [
            { width: 100, height: 30, length: 10, weight: 3, quantity: 1 },
        ],
        from: "22060030",
        to: "88015600"
    }
    const response = await axios.post("http://localhost:3002/calculateFreight", input);
    const output = response.data;
    expect(output.freight).toBe(22.446653340244893);
})