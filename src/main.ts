import express, { Request, Response } from 'express';
import CPF from './class/CPF';
import pgp from 'pg-promise';
import Item from './class/Item';

const app = express();
app.use(express.json())

app.post("/checkout", async function(request: Request, response: Response){
    const output: Output = {
        total: 0,
    };
    const connection = pgp()("postgres://postgres:123456@localhost:5432/postgres");
    if (request.body.items){
        for(const item of request.body.items){
            const [productData] = await connection.query("select * from cccat10.product where id_product = $1", item.idProduct);
            output.total += parseFloat(productData.price) * item.quantity; 
        }
    }
    if(request.body.coupon){
        const [couponData] = await connection.query("select * from cccat10.coupon where code = $1", [request.body.coupon]);
        const percentage = parseFloat(couponData.percentage);
        output.total -= (output.total * percentage)/100; 
    }
    try{
        new CPF(request.body.cpf);
        output.message = "Valid CPF";
        await connection.$pool.end();
    } catch (error){
        if(error instanceof Error)
            output.message = error.message;
    }
    response.json(output);
});

type Output = {
    total: number;
    message?: string;
}

app.listen(3000);