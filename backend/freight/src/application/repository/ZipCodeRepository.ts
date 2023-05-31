import Zipcode from "../../domain/entity/ZipCode";

export default interface ZipCodeRepository {
    get (code: string): Promise<Zipcode | undefined>
}