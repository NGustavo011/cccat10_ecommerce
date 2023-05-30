import HttpServer from "./HttpServer";
import CalculateFreight from "../../application/usecase/CalculateFreight";

export default class HttpController {
    constructor(readonly httpServer: HttpServer, readonly calculateFreight: CalculateFreight) {
        httpServer.on("post", "/calculateFreight", async function(params: any, body: any){
            const output = await calculateFreight.execute(body);
            return output;
        });
    }
}