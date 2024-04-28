import { Allele } from "../genetics/allele"
import { Gene } from "../genetics/gene"

const Fish = require('../models/fish')
const GuppyGeneList = require('../genetics/guppy-gene-list')
const { GeneTypes } = require('../genetics/gene')


/**
 * A class providing fish methods
 */
class FishClass{

    /**
     * Computes the effects of each fish aging. 
     * Things like changing hunger levels, health levels, and life status are included here.
     * @param {Fish} fish - The fish that the actions and checks are being performed on.
     * @param {Fish[]} tankMates - An array of all the other fish that reside in the same tank.
     * @param {User} owner - The owner of the fish.
     */
    static async ageFish(fish, tankMates, owner){

        // tests if a fish has died due to zero health
        if (fish.health <= 0){
            await Fish.findOneAndRemove({_id: fish._id})
            owner.numberOfFish--
            return 
        }

        let newHealth: number = fish.health
        let newAge: number
        let newHunger: number

        // reduces health if hunger is too low
        if (fish.hunger <= 0){
            newHealth = newHealth - 30
        } else if (fish.hunger <= 25){
            newHealth = newHealth - 20
        } else if (fish.hunger <= 50){
            newHealth = newHealth - 10
        }
 

        if (fish.species == 'Guppy' && !fish.isMale && fish.age > 4 && owner.numberOfFish < owner.fishLimit){
            
            
            // add && el.health => 20 once done testing
            let maleGuppies = tankMates.filter( el => el.isMale && el.species === 'Guppy' ) 
            
    
            if (maleGuppies.length != 0){
                
                FishClass.breedFish(fish, maleGuppies[0], owner)
    
                newHealth = fish.health - 20
            }
            
        }
    

        newAge = fish.age + 1
        newHunger = fish.hunger - 15
        await Fish.findOneAndUpdate({_id: fish._id}, {age: newAge, hunger: newHunger, health: newHealth})

    }
    
    /**
     * Createsthe offsping of two fish and stores them in the database.
     * @param {Fish} mother 
     * @param {Fish} father 
     * @param {User} owner 
     */
    
    static async breedFish(mother, father, owner){
    
        let numberOfFry: number
    
        if (mother.species === 'Guppy'){
            numberOfFry = 3 + (Math.floor((Math.random() * 5)) - 2) // 3 plus or minus 2
            owner.numberOfFish += numberOfFry
    
            for(let i = 0; i < numberOfFry; i++){

                const fryIsMale: boolean = Math.round(Math.random())? true : false


                let fryFinGenome = this.combineMainGenomes(fryIsMale, mother.mainGenome, father.mainGenome)
    
                const newFry = new Fish({
                    name: 'Unnamed Fish',
                    species: mother.species,
                    isMale: fryIsMale,
                    ownerId: mother.ownerId,
                    tankId: mother.tankId,
                    age: 0,
                    health: 100, 
                    hunger: 90,
                    mainGenome: fryFinGenome,
                    petshopFish: false,
                    forSale: false,
                    salePrice: -1
                })
    
                Fish.create(newFry)
    
            }

        }
    
    }

    /**
     * Combines the genomes of two fish into the genomes of their offspring.
     * @param {Boolean} isMale - True if the offspring is male.
     * @param {Object} mothersGenome - The mother's genome.
     * @param {Object} fathersGenome - The father's genome.
     * @returns {Object} The newly formed genome of the offspring.
     */
    static combineMainGenomes(isMale: boolean, mothersGenome, fathersGenome){

        let newGenome = []

        for(let i = 0; i < mothersGenome.length; i++){

            let newGene: Gene = new Gene(mothersGenome[i].name, mothersGenome[i].type, [])

            let allelesInNewGene: Allele[] = []


            if( !(newGene.type === GeneTypes.YLinked) ){
                if(Math.random() < .5){
                    allelesInNewGene.push(mothersGenome[i].alleles[0])
                } else {
                    allelesInNewGene.push(mothersGenome[i].alleles[mothersGenome[i].alleles.length - 1])
                }
            }

            if( !(newGene.type === GeneTypes.XLinked && isMale) || !(newGene.type === GeneTypes.YLinked && !(isMale))){
                if(Math.random() < .5){
                    allelesInNewGene.push(fathersGenome[i].alleles[0])
                } else {
                    allelesInNewGene.push(fathersGenome[i].alleles[fathersGenome[i].alleles.length - 1])
                }
            }

            newGene.alleles = this.orderAllelesByDominance(allelesInNewGene)

            newGenome.push(newGene)

        }

        return newGenome
    }

    /**
     * Creates a random genome for a game-generated fish.
     * @param {boolean} isMale - Helps determine how to handle sex-linked genes.
     * @param {string} species - The type of fish: "guppy", "koi", or "betta".
     * @param {string} source - Where the game is generating the fish: "petshop" or "pond".
     * @returns {string} The fish's newly created genome.
     */
    static createRandomMainGenome(isMale: boolean, species: string, source: string){

        let probabilityType: string
        let listOfPremadeGenes: Gene[]

        if (species === "guppy"){
            listOfPremadeGenes = GuppyGeneList
        }
        if(source === "petshop"){
            probabilityType = "petshopProbability"
        }

        let newGenome: Gene[] = []
        let newGene: Gene
        let pickedPremadeAllele: Allele
        let newAllele: Allele
        let numOfAlleles: number
        let allelesInNewGene: Allele[] = []

        for(let i = 0; i < listOfPremadeGenes.length; i++){

            newGene = new Gene(listOfPremadeGenes[i].name, listOfPremadeGenes[i].type, [])
            allelesInNewGene = []

            if(listOfPremadeGenes[i].type === GeneTypes.Autosomal){
                numOfAlleles = 2
            } else if (listOfPremadeGenes[i].type === GeneTypes.XLinked){
                if(isMale){
                    numOfAlleles = 1
                } else {
                    numOfAlleles = 2
                }
            } else {
                if(isMale){
                    numOfAlleles = 1
                } else {
                    numOfAlleles = 0
                }
            }

            for (let j = 0; j < numOfAlleles; j++){

                pickedPremadeAllele = this.pickRandomAllele(listOfPremadeGenes[i], probabilityType)
                // This removes the probability fields
                newAllele = new Allele(pickedPremadeAllele.abbreviation, pickedPremadeAllele.dominance, pickedPremadeAllele.mutatableTraits)
                allelesInNewGene.push(newAllele)
                
            }   

            newGene.alleles = this.orderAllelesByDominance(allelesInNewGene)

            newGenome.push(newGene)

        }

        return newGenome


    }

    /**
     * Given a gene, picks a random allele from its array of alleles based on the probability type.
     * @param {Gene} Gene - The gene that contains the array of alleles.
     * @param {string} probabilityType - Determines which probabilty type to use to determine the chance of each allele being picked. Example: "petshopProbabilty" or "pondProbability".
     * @returns {Allele} - The allele that was picked.
     */
    static pickRandomAllele(gene: Gene, probabilityType: string){

        let randNum: number
        let allele: Allele

        randNum = Math.random()

        for(let j = 0; j < gene.alleles.length; j++){

            allele = gene.alleles[j]

            if(randNum <= allele[probabilityType]){
                return allele
            } else {
                randNum -= allele[probabilityType]
            }
        }
    }

    /**
     * Sorts an array of alleles so the more dominant one is in the front.
     * @param {Allele[]} alleles - An array of 0, 1, or 2 alleles.
     * @returns {Allele[]} alleles - An array of the same alleles but sorted by most dominant.
     */
    static orderAllelesByDominance(alleles: Allele[]){
        if(alleles.length <= 1 || alleles[0].dominance > alleles[1].dominance){
            return alleles
        } else {
            return alleles.reverse()
        }
    }



    /**
     * Generates a new fish. This function is not used for fish born to other in-game fish.
     * @param {string} type - The source of the fish, e.g. petshop, starter, or pond.
     * @param {boolean} isMale - True if male.
     * @param {string} ownerId - The id of the owner of the new fish.
     * @param {string} tankId - The id of the tank of the new fish.
     * @returns {Fish} - The new fish.
     */
    static generateRandomFish(type: string, isMale: boolean, ownerId: string, tankId: string){

        let age: number
        let name: string
        let species: string
        let health: number
        let petshopFish: boolean
        let hunger: number
        let mainGenome
        let forSale: boolean
        let salePrice: number = -1
        

        if (type === 'starter'){

            name = isMale ? 'Starter Fish 1' : 'Starter Fish 2'
            species = 'Guppy'
            health = 90
            hunger = 85
            age = 5
            petshopFish = false
            mainGenome = this.createRandomMainGenome(isMale, "guppy", "petshop")
            forSale = false 
            
        }
        if (type === 'petshop'){

            name = "Petshop Fish"
            health = Math.ceil(Math.random() * 60) + 40 
            hunger = Math.ceil(Math.random() * 15) + 85 
            petshopFish = true
            ownerId = ''
            tankId = ''
            isMale = Math.random() > .5 ? true : false 
            forSale = true
            

            // for guppies
            species = 'Guppy'
            age = Math.ceil(Math.random() * 9) + 2
            mainGenome = this.createRandomMainGenome(isMale, "guppy", "petshop")
            salePrice = 10
        }


        return new Fish({
            name: name,
            species: species,
            isMale: isMale,
            ownerId: ownerId,
            age: age,
            health: health,
            hunger: hunger,
            mainGenome: mainGenome,
            petshopFish: petshopFish,
            tankId: tankId,
            forSale: forSale,
            salePrice: salePrice
        })
    }
    
    
    


}

module.exports = FishClass