const Allele = require('./allele.js')
class Gene {

    name: string 
    type: GeneType
    alleles: InstanceType<typeof Allele>[]
    
    constructor(name: string, type: GeneType, alleles: InstanceType<typeof Allele>[]){
        this.name = name
        this.type = type
        this.alleles = alleles
    }
}

enum GeneType {
    Autosomal, 
    XLinked,
    YLinked
}

module.exports =  {Gene, GeneType}