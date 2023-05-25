import Checkout from './Checkout';

const input: Input = {cpf: "", items: []};
process.stdin.on("data", async function(chunk){
    const command = chunk.toString().replace("\n","");
    if(command.startsWith("set-cpf")){
        input.cpf = command.replace("set-cpf", "").trim()
    }
    if(command.startsWith("add-item")){
        const [idProduct, quantity] = command.replace("add-item", "").trim().split(" ");
        input.items.push({idProduct: parseInt(idProduct), quantity: parseInt(quantity)})
    }
    if(command.startsWith("checkout")){
        try{
           const checkout = new Checkout();
           const output = await checkout.execute(input)
           console.log(output)
        } catch(error){
            if(error instanceof Error)
                console.log(error)
        }
    }
    console.log(input);
})

type Input = {
    cpf: string,
    items: {
        idProduct: number,
        quantity: number
    }[],
    coupon?: string,
    from?: string,
    to?: string,
}