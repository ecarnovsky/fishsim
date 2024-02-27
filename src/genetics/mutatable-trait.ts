class MutatableTrait {

    name: string
    type: TraitTypes
    mutationRate: MutationRates
    value: number


    constructor(name: string, type: TraitTypes, mutationRate: MutationRates, value: number){
        this.name = name 
        this.type = type
        this.mutationRate = mutationRate
        this.value = value
    }
}


enum TraitTypes {
    BodyValue,
    ColorChange
}

enum MutationRates {
    Low,
    Middle,
    High
}


module.exports = {MutatableTrait, TraitTypes, MutationRates}