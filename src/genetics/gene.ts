import {Allele} from './allele.js'

export class Gene {

    name: string 
    type: GeneTypes
    alleles: InstanceType<typeof Allele>[]
    
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
