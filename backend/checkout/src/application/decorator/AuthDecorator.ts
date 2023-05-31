import AuthGatewayHttp from "../../infra/gateway/AuthGatewayHttp";
import AxiosAdapater from "../../infra/http/AxiosAdapter";
import AuthGateway from "../gateway/AuthGateway";
import Usecase from "../usecase/Usecase";

export default class AuthDecorator implements Usecase {
    constructor (
            readonly usecase: Usecase, 
            readonly authGateway: AuthGateway = new AuthGatewayHttp(new AxiosAdapater())
        ){
    }
    
    async execute(input: any): Promise<any> {
        if(input && input.token){
            try{
                const payload = await this.authGateway.verify(input.token);
                input.email = payload.email;
                return this.usecase.execute(input);
            } catch(error){
                if(error instanceof Error)
                    throw new Error("Authentication error");
            }
        } else {
            return this.usecase.execute(input);
        }
    }
}