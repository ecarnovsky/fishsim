import {Allele} from './allele'

/**
 * Class creating alleles that appear in randomly generated fish
 * @extends Allele
 */
export class PremadeAllele extends Allele {

    petshopProbability: number
    pondProbability: number

    /**
     * 
     * @param abbreviation 
     * @param dominance 
     * @param petshopProbability - The probability of the allele generating in a petshop generated fish.
     * @param pondProbability - The probability of the allele generating in a pond generated fish.
     * @param mutatableTraits 
     */
    constructor(abbreviation, dominance, petshopProbability, pondProbability, mutatableTraits){
        super(abbreviation, dominance, mutatableTraits)
        this.petshopProbability = petshopProbability
        this.pondProbability = pondProbability
    }
}