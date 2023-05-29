import CLIHandler from "./CLIHandler";

export default class CLIHandlerNode extends CLIHandler {
    constructor () {
        super();
        process.stdin.on("data", (chunk: any)=>{
            const command = chunk.toString().replace("\n","");
            this.type(command);
        });
    }

    write(text: string): void {
        console.log(text);
    }
}