class Allele {
    constructor(abbreviation, dominance, petshopProbability, pondProbability, mutatableTraits){
        this.abbreviation = abbreviation
        this.dominance = dominance
        this.petshopProbability = petshopProbability
        this.pondProbability = pondProbability
        this.mutatableTraits = mutatableTraits
    }
}

module.exports = Allele