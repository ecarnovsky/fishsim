/**
 * Class representing a quality of an allele that can mutate.
 */
export class MutatableTrait {

    name: string
    type: TraitTypes
    mutationRate: MutationRates
    value: number

    /**
     * Creates the mutatable trait.
     * @param {string} name - The name of the variable in the image generator the trait is associated with.
     * @param {TraitTypes} type - What type of value the trait affects(color, point values, percentages).
     * @param {MutationRates} mutationRate - How frequently the trait mutates. Can be high, medium, or low.
     * @param {number} value - The value of the trait.
     */
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
