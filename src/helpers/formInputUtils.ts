import { isNumber } from 'util';

export class FormInput {
    constructor() { };

    numberOnly(event){
        if(!isNumber(event.target.value)){
            
        }
    }
}