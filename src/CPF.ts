export default class CPF{
    private _cpf: string;

    constructor(readonly cpf: string){
        this._cpf = cpf;
        this.cpfIsValid();
    }

    private cpfIsNullOrUndefined(){
        return !this._cpf;
    }

    private cpfLenghtIsValid(){
        return this._cpf.length >= 11 && this._cpf.length <= 14;
    }

    private cpfAllDigitsTheSame(){
        return this._cpf.split("").every(c => c === this._cpf[0]);
    }

    private clean(){
        this._cpf=this._cpf.replace(/[^\d]/g, "")
    }

    private calculateDigit(factor: number){
        let total = 0;
        for(const digit of this._cpf){
            if(factor>1) total += parseInt(digit) * factor--;
        }
        const rest = total % 11;
        return (rest<2) ? 0 : 11 - rest;
    }

    private extractCheckDigit(){
        return this._cpf.substring(this._cpf.length-2, this._cpf.length);
    }

    private cpfIsValid() {
        if (this.cpfIsNullOrUndefined() || !this.cpfLenghtIsValid()) throw new Error("Invalid CPF")
        this.clean();
        if(this.cpfAllDigitsTheSame()) throw new Error("Invalid CPF")
        const digit1 = this.calculateDigit(10);
        const digit2 = this.calculateDigit(11);
        let actualDigit = this.extractCheckDigit();
        const calculatedDigit = `${digit1}${digit2}`;
        if(actualDigit != calculatedDigit) throw new Error("Invalid CPF")
    }
}