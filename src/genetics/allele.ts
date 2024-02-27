import {MutatableTrait} from './mutatable-trait.js'

export class Allele {

    abbreviation: string
    dominance: number 
    petshopProbability: number
    pondProbability: number
    mutatableTraits: InstanceType<typeof MutatableTrait>[]


    
    constructor(abbreviation, dominance, petshopProbability, pondProbability, mutatableTraits){
        this.abbreviation = abbreviation
        this.dominance = dominance
        this.petshopProbability = petshopProbability
        this.pondProbability = pondProbability 
        this.mutatableTraits = mutatableTraits
    }
}
