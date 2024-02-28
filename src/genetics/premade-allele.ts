import {Allele} from './allele'

export class PremadeAllele extends Allele {

    petshopProbability: number
    pondProbability: number

    constructor(abbreviation, dominance, petshopProbability, pondProbability, mutatableTraits){
        super(abbreviation, dominance, mutatableTraits)
        this.petshopProbability = petshopProbability
        this.pondProbability = pondProbability
    }
}