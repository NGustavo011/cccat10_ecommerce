export default class CPF{
    cpf: string;

    constructor(cpf: string){
        this.cpf = cpf
        this.cpfIsValid()
    }

    cpfIsNullOrUndefined(){
        return this.cpf === null || this.cpf === undefined;
    }

    cpfLenghtIsValid(){
        return this.cpf.length >= 11 || this.cpf.length <= 14;
    }

    cpfCharactersIsValid(){
        return !this.cpf.split("").every(c => c === this.cpf[0]);
    }

    cpfIsValid() {
        if (this.cpfIsNullOrUndefined() || !this.cpfLenghtIsValid())
            throw new Error("Invalid CPF")
        this.cpf=this.cpf.replace(/[^\d]/g, "")
        if(!this.cpfCharactersIsValid())
            throw new Error("Invalid CPF")
        try{  
            let d1, d2;  
            let dg1, dg2, rest;  
            let digito;  
            let nDigResult;  
            d1 = d2 = 0;  
            dg1 = dg2 = rest = 0;    
            for (let nCount = 1; nCount < this.cpf.length -1; nCount++) {  
                digito = parseInt(this.cpf.substring(nCount -1, nCount));  							
                d1 = d1 + ( 11 - nCount ) * digito;  
                d2 = d2 + ( 12 - nCount ) * digito;  
            };     
            rest = (d1 % 11);  
            dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;  
            d2 += 2 * dg1;  
            rest = (d2 % 11);  
            if (rest < 2)  
                dg2 = 0;  
            else  
                dg2 = 11 - rest;  
                let nDigVerific = this.cpf.substring(this.cpf.length-2, this.cpf.length);  
            nDigResult = "" + dg1 + "" + dg2;
            if(nDigVerific != nDigResult)
                throw new Error("Invalid CPF")
        }catch (e){  
            console.error("Erro: "+e);
            throw new Error("Invalid CPF")
        }  
        
    }
}