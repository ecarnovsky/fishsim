const Fish = require('../models/fish')
const User = require('../models/user')
const GuppyAlleles = require('./guppy-alleles')
const GuppyGeneList = require('../genetics/guppy-gene-list')
const { Gene, GeneTypes } = require('../genetics/gene')
const { Allele } = require('../genetics/allele')
const { PremadeAllele } = require('../genetics/premade-allele')

/**
 * A class providing fish methods
 */
class FishClass{

    /**
     * This function is no longer in use. 
     * @deprecated
     */
    static generateFinDescriptionStr(finGenome, tailSizeGenome, swordTypeGenome){

        let allelesArray = finGenome.split(/\s|-/)

        let descriptionStr = ''
        let smallTail = true
        let suppressLongfin = true
        let dumbo 
        let rose 
        let ribbon
        let swallow
        let round 
        let spade
        let spear
        let pin
        let sword
        let scarf
        let tailShape
        let crown
 

        if (allelesArray.filter(e => e === 'f').length === 2){
            //count how many hh pairs are in the tailSizeGenome 
            
            // Set small tail to false if changed

            suppressLongfin = false
            // always allows dumbo to show when there is no longfin suppressant
            if (allelesArray.filter(e => e === 'd').length === 2){
                dumbo = true
            }
            if (allelesArray. includes('B')){
                ribbon = true
            }
            if (allelesArray.filter(e => e === 'w').length === 2){
                swallow = true
            }
        }

        if (smallTail){

            if (allelesArray.filter(e => e === 'R').length >= 1){
                round = true
            } else if (allelesArray.filter(e => e === 'rc').length >= 1){
               spade = true
            } else if (allelesArray.filter(e => e === 'rs').length >= 1){
                spear = true 
            } else {
                pin = true
            }
        }

        if (allelesArray.filter(e => e === 'o').length === 2){
            rose = true 
        }
        if (allelesArray.filter(e => e === 's').length === 2){
            scarf = true 
        }
        if (allelesArray.filter(e => e === 'S').length >= 1){
            sword = true 
        }
        if (allelesArray.filter(e => e === 'C').length >= 1){
            crown = true 
        }




        //////// Main tail shape ////////
        if (smallTail){
            if (round){
                tailShape = 'Round'
            } else if (spade){
                tailShape = 'Spade'
            } else if (spear){
                tailShape = 'Spear'
            } else {
                tailShape = 'Pin'
            }   
        }
        if (!smallTail){

        }
        if (smallTail && sword){
            tailShape = tailShape + ' Sword'
        } else if (sword){
            tailShape = 'Sword'
        }
        if (!smallTail && scarf){
            tailShape = 'Scarf'
        }
        if (crown){
            tailShape = tailShape + ' Crown'
        }
        if (!suppressLongfin && rose && !crown){
            descriptionStr = "Rose " + descriptionStr
        }
        if (!suppressLongfin && dumbo){
            descriptionStr = "Dumbo " + descriptionStr
        }
        if (!suppressLongfin && swallow){
            if (!smallTail && !crown){
                descriptionStr = "Swallow " + descriptionStr
            } else {
                descriptionStr = "Ribbon " + descriptionStr
            } 
        }
        if (!suppressLongfin && ribbon && !swallow){
            descriptionStr = "Ribbon " + descriptionStr
        }

        return (descriptionStr + " " + tailShape + 'tail').trim()

    }

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

        let newHealth = fish.health
        let newAge 
        let newHunger

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
    
        let numberOfFry
    
        if (mother.species === 'Guppy'){
            numberOfFry = 3 + (Math.floor((Math.random() * 5)) - 2) // 3 plus or minus 2
            owner.numberOfFish += numberOfFry
    
            for(let i = 0; i < numberOfFry; i++){

                let fryIsMale = Math.round(Math.random())? true : false


                let fryFinGenome = this.combineMainGenomes(fryIsMale, JSON.parse(mother.mainGenome), JSON.parse(father.mainGenome))
    
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
     * @returns {Objcect} The new;y formed genome of the offspring.
     */
    static combineMainGenomes(isMale, mothersGenome, fathersGenome){

        let newGenome = []

        for(let i = 0; i < mothersGenome.length; i++){

            let newGene = new Gene(mothersGenome[i].name, mothersGenome[i].type, [])

            let allelesInNewGene = []


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

            newGene.alleles = allelesInNewGene

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
    static createRandomMainGenome(isMale, species, source){

        let probabilityType
        let listOfPremadeGenes

        if (species === "guppy"){
            listOfPremadeGenes = GuppyGeneList
        }
        if(source === "petshop"){
            probabilityType = "petshopProbability"
        }

        let newGenome = []
        let newGene
        let pickedPremadeAllele
        let newAllele
        let numOfAlleles

        for(let i = 0; i < listOfPremadeGenes.length; i++){

            newGene = new Gene(listOfPremadeGenes[i].name, listOfPremadeGenes[i].type, [])

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

            for (let i = 0; i < numOfAlleles; i++){
                pickedPremadeAllele = this.pickRandomAllele(listOfPremadeGenes[i], probabilityType)
                // This removes the probability fields
                newAllele = new Allele(pickedPremadeAllele.abbreviation, pickedPremadeAllele.dominance, pickedPremadeAllele.mutatableTraits)
                newGene.alleles.push(newAllele)
            }



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
    static pickRandomAllele(Gene, probabilityType){

        let randNum
        let allele

        randNum = Math.random()

        for(let j = 0; j < Gene.alleles.length; j++){

            allele = Gene.alleles[j]

            if(randNum <= allele[probabilityType]){
                return allele
            } else {
                randNum -= allele[probabilityType]
            }
        }
    }

    static orderAllelesByDominance(alleles){

    }


    /**
     * This function is no longer in use. 
     * @deprecated
     */
    static createRandomGenome(species, type, source){

        let alleles
        let probabilityType

        if(species === "guppy"){
            if(type === "fin"){
                alleles = GuppyAlleles.GUPPY_FIN_ALLELES
            }
        }
        if(source === "petshop"){
            probabilityType = "petshopProbability"
        }


        let newGenome = ''
        
        // loops through each gene
        for (let i = 0; i < alleles.length; i++){


            let newAllelePair = ''
            let firstAlleleIndex
            let randNum = Math.random(); 

            // first allele

            // loops through all possible alleles for each gene

            for (let j = 0; j < alleles[i].length; j++){

                if (alleles[i][j][probabilityType] >= randNum){
                    newAllelePair += alleles[i][j].abbreviation
                    firstAlleleIndex = j
                    break
                } else {
                    randNum = randNum - alleles[i][j][probabilityType]
                }
            }


            // second allele

            randNum = Math.random(); 

            for (let j = 0; j < alleles[i].length; j++){

                if (alleles[i][j][probabilityType] >= randNum){
                    // Move the dominant allele to the front
                    newAllelePair = j < firstAlleleIndex ? alleles[i][j].abbreviation + '-' + newAllelePair : newAllelePair + '-' + alleles[i][j].abbreviation
                    break
                } else {
                    randNum = randNum - alleles[i][j][probabilityType]
                }
            }

            newGenome += newAllelePair + ' '
        }
        return newGenome.trim()
    }

     /**
     * This function is no longer in use. 
     * @deprecated
     */
    static combineGenomes(genome1, genome2, allelesDominance){

        let newGenome = ''

        // splits the gemome into pairs of alleles
        let allelePairsArray1 = genome1.split(' ')
        let allelePairsArray2 = genome2.split(' ')

        for (let i = 0; i < allelePairsArray1.length; i++){

            // separates the alleles
            let separatedAlleles1 = allelePairsArray1[i].split('-')
            let separatedAlleles2 = allelePairsArray2[i].split('-')

            // picks a random allele to be inherited 
            let inheritedAllele1 = Math.random() < .5 ? separatedAlleles1[0] : separatedAlleles1[1]
            let inheritedAllele2 = Math.random() < .5 ? separatedAlleles2[0] : separatedAlleles2[1]

            
            let indexOfAllele1 = allelesDominance[i].map(e => e.abbreviation).indexOf(inheritedAllele1);
            let indexOfAllele2 = allelesDominance[i].map(e => e.abbreviation).indexOf(inheritedAllele2);

            if (indexOfAllele1 < indexOfAllele2){
                newGenome += inheritedAllele1 + '-' + inheritedAllele2 + " "
            } else {
                newGenome += inheritedAllele2 + '-' + inheritedAllele1 + " "
            }

        }
        return newGenome.trim()
    }



    /**
     * Generates a new fish. This function is not used for fish born to other in-game fish.
     * @param {string} type - The source of the fish, e.g. petshop, starter, or pond.
     * @param {boolean} isMale - True if male.
     * @param {number} ownerId - The id of the owner of the new fish.
     * @param {number} tankId - The id of the tank of the new fish.
     * @returns {Fish} - The new fish.
     */
    static generateRandomFish(type , isMale, ownerId, tankId){

        let age
        let name 
        let species
        let health
        let petshopFish
        let hunger
        let mainGenome
        let forSale
        let salePrice = -1
        

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
            isMale = Math.round(Math.random())
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