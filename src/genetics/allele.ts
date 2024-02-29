import {MutatableTrait} from './mutatable-trait.js'

/**
 * A class for creating alleles
 */
export class Allele {

    abbreviation: string
    dominance: number 
    mutatableTraits: InstanceType<typeof MutatableTrait>[]


    /**
     * Creates an allele.
     * @param abbreviation - Some alleles have short abbreviations to help the image generator know how to handle them.
     * @param dominance - A number from 0 to 100 that signifies how likely an allele will show compared to others.
     * @param mutatableTraits - An array of traits that are carried by the allele. 
     */
    constructor(abbreviation, dominance, mutatableTraits){
        this.abbreviation = abbreviation
        this.dominance = dominance
        this.mutatableTraits = mutatableTraits
    }
}
