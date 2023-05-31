import DistanceCalculator from '../../domain/entity/DistanceCalculator';
import FreightCalculator from '../../domain/entity/FreightCalculator';
import ZipCodeRepository from '../repository/ZipCodeRepository';

export default class CalculateFreight{

    constructor (
        readonly zipCodeRepository: ZipCodeRepository
    ){}

    async execute(input: Input): Promise<Output>{
        const output: Output = {
            freight: 0,
        };
        let distance = 1000;
        if (input.from && input.to){
            const from = await this.zipCodeRepository.get(input.from);
            const to = await this.zipCodeRepository.get(input.to);
            if (from && to) {
                distance = DistanceCalculator.calculate(from.coord, to.coord);
            }
        }
        if (input.items){
            for(const item of input.items){
                if(item.width <= 0 || item.height <= 0 || item.length <= 0 || item.weight <= 0)
                    throw new Error("Invalid dimension");
                output.freight += FreightCalculator.calculate(distance, item.width, item.height, item.length, item.weight, item.quantity);
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
    from?: string,
    to?: string
}

type Output = {
    freight: number;
}