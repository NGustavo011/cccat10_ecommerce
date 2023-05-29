import pgp from 'pg-promise';
import ProductRepository from './ProductRepository';
import Product from './domain/entity/Product';
import Connection from './Connection';

export default class ProductRepositoryDatabase implements ProductRepository {
    constructor(readonly connection: Connection){}
    async getProduct(idProduct: number): Promise<any>{
        const [productData] = await this.connection.query("select * from cccat10.product where id_product = $1", [idProduct]);
        return new Product(productData.id_product, productData.description, parseFloat(productData.price), productData.width, productData.height, productData.length, parseFloat(productData.weight), productData.currency);
    }
}
