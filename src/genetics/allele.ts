import {MutatableTrait} from './mutatable-trait.js'

export class Allele {

    abbreviation: string
    dominance: number 
    mutatableTraits: InstanceType<typeof MutatableTrait>[]


    
    constructor(abbreviation, dominance, mutatableTraits){
        this.abbreviation = abbreviation
        this.dominance = dominance
        this.mutatableTraits = mutatableTraits
    }
}
