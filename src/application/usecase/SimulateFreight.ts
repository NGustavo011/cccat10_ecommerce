import FreightCalculator from '../../domain/entity/FreightCalculator';
import ProductRepository from '../../ProductRepository';
import ProductRepositoryDatabase from '../../ProductRepositoryDatabase';

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
                const product = await this.productRepository.getProduct(item.idProduct);
                if(product.width <= 0 || product.height <= 0 || product.length <= 0 || product.weight <= 0)
                    throw new Error("Invalid dimension");
                const itemFreight = FreightCalculator.calculate(product);
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