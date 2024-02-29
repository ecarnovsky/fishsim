import {Allele} from './allele.js'

/**
 * A class for representing genes.
 */
export class Gene {

    name: string 
    type: GeneTypes
    alleles: InstanceType<typeof Allele>[]
    
    /**
     * Creates a gene.
     * @param name - The name of the gene. 
     * @param type - Whether the gene autosomal, x-linked, or y-linked.
     * @param alleles - An array of the alleles the gene has. 
     */
    constructor(name: string, type: GeneTypes, alleles: InstanceType<typeof Allele>[]){
        this.name = name
        this.type = type
        this.alleles = alleles
    }
}

export enum GeneTypes {
    Autosomal, 
    XLinked,
    YLinked
}
