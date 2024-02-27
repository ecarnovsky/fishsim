export class MutatableTrait {

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

export enum TraitTypes {
    BodyValue,
    ColorChange
}

export enum MutationRates {
    Low,
    Middle,
    High
}
