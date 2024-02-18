const Fish = require('../models/fish')
const User = require('../models/user')
const GuppyAlleles = require('./guppy-alleles')


class FishClass{

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
            ////////////code once tail sizes added/////////////////
        }
        if (smallTail && sword){
            tailShape = tailShape + ' Sword'
        } else if (sword){
            tailShape = 'Sword'
        }
        // add change to perfect lyre tail later
        if (!smallTail && scarf){
            tailShape = 'Scarf'
        }
        if (crown){
            tailShape = tailShape + ' Crown'
        }
        //////// Description /////////
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

    static async ageFish(fish, tankMates, req){

        // tests if a fish has died due to zero health
        if (fish.health <= 0){
            await Fish.findOneAndRemove({_id: fish._id})
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
 
        if (fish.species == 'Guppy' && !fish.isMale && fish.age > 4 && req.user.fishLimit > req.user.numberOfFish){
            
            
            // add && el.health => 20 once done testing
            let maleGuppies = tankMates.filter( el => el.isMale && el.species === 'Guppy' ) 
            
    
            if (maleGuppies.length != 0){
                
                FishClass.breedFish(fish, maleGuppies[0], req)
    
                newHealth = fish.health - 20
            }
            
        }
    

        newAge = fish.age + 1
        newHunger = fish.hunger - 15
        await Fish.findOneAndUpdate({_id: fish._id}, {age: newAge, hunger: newHunger, health: newHealth})

    }
    
    
    static async breedFish(mother, father, req){
    
        let numberOfFry
    
        if (mother.species === 'Guppy'){
            numberOfFry = 3 + (Math.floor((Math.random() * 5)) - 2) // 3 plus or minus 2
    
            for(let i = 0; i < numberOfFry; i++){

                let fryIsMale = Math.round(Math.random())? true : false

                let fryFinGenome = this.combineGenomes(mother.finGenome, father.finGenome, GuppyAlleles.GUPPY_FIN_ALLELES)
    
                const newFry = new Fish({
                    name: 'Unnamed Fish',
                    species: mother.species,
                    isMale: fryIsMale,
                    ownerId: mother.ownerId,
                    tankId: mother.tankId,
                    age: 0,
                    health: 100, 
                    hunger: 90,
                    finGenome: fryFinGenome, 
                    finDescription: this.generateFinDescriptionStr(fryFinGenome),
                    petshopFish: false,
                    forSale: false,
                    salePrice: -1
                })
    
                Fish.create(newFry)
    
            }

        }
    
    }

    static randomGuppyFinGenome(){

        return FishClass.createRandomGenome(GuppyAlleles.GUPPY_FIN_ALLELES)

    }

    static createRandomGenome(alleles){

        let newGenome = ''
        
        // loops through each gene
        for (let i = 0; i < alleles.length; i++){


            let newAllelePair = ''
            let firstAlleleIndex
            let randNum = Math.random(); 

            // first allele

            // loops through all possible alleles for each gene

            for (let j = 0; j < alleles[i].length; j++){

                if (alleles[i][j].probability >= randNum){
                    newAllelePair += alleles[i][j].abbreviation
                    firstAlleleIndex = j
                    break
                } else {
                    randNum = randNum - alleles[i][j].probability 
                }
            }


            // second allele

            randNum = Math.random(); 

            for (let j = 0; j < alleles[i].length; j++){

                if (alleles[i][j].probability >= randNum){
                    // Move the dominant allele to the front
                    newAllelePair = j < firstAlleleIndex ? alleles[i][j].abbreviation + '-' + newAllelePair : newAllelePair + '-' + alleles[i][j].abbreviation
                    break
                } else {
                    randNum = randNum - alleles[i][j].probability 
                }
            }

            newGenome += newAllelePair + ' '
        }
        return newGenome.trim()
    }

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



    static generateRandomFish(type , isMale, ownerId, tankId){

        let age
        let name 
        let species
        let health
        let petshopFish
        let hunger
        let finGenome
        let finDescription
        let forSale
        let salePrice = -1
        

        if (type === 'starter'){

            name = isMale ? 'Starter Fish 1' : 'Starter Fish 2'
            species = 'Guppy'
            health = 90
            hunger = 85
            age = 5
            petshopFish = false
            finGenome = this.randomGuppyFinGenome()
            finDescription = this.generateFinDescriptionStr(finGenome)
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
            finGenome = this.randomGuppyFinGenome()
            finDescription = this.generateFinDescriptionStr(finGenome)
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
            finGenome: finGenome,
            finDescription: finDescription,
            petshopFish: petshopFish,
            tankId: tankId,
            forSale: forSale,
            salePrice: salePrice
        })
    }
    
    
    


}

module.exports = FishClass