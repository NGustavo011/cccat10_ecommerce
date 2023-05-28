import pgp from 'pg-promise';
import ProductRepository from './ProductRepository';
import Product from './domain/entity/Product';

export default class ProductRepositoryDatabase implements ProductRepository {
    async getProduct(idProduct: number): Promise<any>{
        const connection = pgp()("postgres://postgres:123456@localhost:5432/postgres");
        const [productData] = await connection.query("select * from cccat10.product where id_product = $1", [idProduct]);
        await connection.$pool.end();
        return new Product(productData.id_product, productData.description, parseFloat(productData.price), productData.width, productData.height, productData.length, parseFloat(productData.weight), productData.currency);
    }
}
