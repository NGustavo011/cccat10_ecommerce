import express, { Request, Response } from 'express';
import Checkout from './application/usecase/Checkout';

const app = express();
app.use(express.json())

app.post("/checkout", async function(request: Request, response: Response){
    try{
        const checkout = new Checkout();
        const output = await checkout.execute(request.body);
        response.json(output);
    } catch(error){
        if(error instanceof Error){
            response.status(422).json({
                message: error.message
            });
        }
    }
});

app.listen(3000);