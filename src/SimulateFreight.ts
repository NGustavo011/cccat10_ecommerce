import ProductRepository from './ProductRepository';
import ProductRepositoryDatabase from './ProductRepositoryDatabase';

export default class SimulateFreight{

    constructor (
        readonly productRepository: ProductRepository = new ProductRepositoryDatabase(),
    ){}

    async execute(input: Input): Promise<Output>{
        const output: Output = {
            freight: 0,
        };
        if (input.items){
            for(const item of input.items){
                const productData = await this.productRepository.getProduct(item.idProduct);
                if(productData.width <= 0 || productData.height <= 0 || productData.length <= 0 || parseFloat(productData.weight) <= 0)
                    throw new Error("Invalid dimension");
                //const itemFreight = FreightCalculator.calculate(productData);
                const volume = productData.width/100 * productData.height/100 * productData.length/100;
                const density = parseFloat(productData.weight)/volume;
                const itemFreight = 1000*volume*(density/100);
                output.freight += Math.max(itemFreight, 10) * item.quantity;
            }
        }
        return output
    }
}

type Input = {
    items: {
        idProduct: number,
        quantity: number,
        price?: number,
    }[],
}

type Output = {
    freight: number;
}