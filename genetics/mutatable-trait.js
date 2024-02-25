class MutatableTrait {

    constructor(name, type, mutationRate, value){
        this.name = name 
        this.type = type
        this.mutationRate = mutationRate
        this.value = value
    }
}

// enums:

const TraitTypes = {
    BodyValue: "BodyValue",
    ColorChange: "ColorChange"
}

const MutationRates = {
    Low: "Low",
    Middle: "Middle",
    High: "High"
}


module.exports = {MutatableTrait, TraitTypes, MutationRates}