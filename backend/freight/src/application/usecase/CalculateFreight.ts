import FreightCalculator from '../../domain/entity/FreightCalculator';

export default class CalculateFreight{

    constructor (
    ){}

    async execute(input: Input): Promise<Output>{
        const output: Output = {
            freight: 0,
        };
        if (input.items){
            for(const item of input.items){
                if(item.width <= 0 || item.height <= 0 || item.length <= 0 || item.weight <= 0)
                    throw new Error("Invalid dimension");
                output.freight += FreightCalculator.calculate(item.width, item.height, item.length, item.weight, item.quantity);
            }
        }
        return output
    }
}

type Input = {
    items: {
        width: number,
        height: number,
        length: number,
        weight: number,
        quantity: number,
        price?: number,
    }[],
}

type Output = {
    freight: number;
}