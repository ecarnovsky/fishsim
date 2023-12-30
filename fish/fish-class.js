const Fish = require('../models/fish')


class FishClass{

    static GuppyFinAlleles = [
        [
            // suppresses longfin
            {'abbreviation':'F', 'probability': 0.60},
            // no suppressant
            {'abbreviation':'f', 'probability': 0.40}
        ],
        [
            // round tail
            {'abbreviation':'R', 'probability': 0.50},
            // spade (aka coffer) tail
            {'abbreviation':'rc', 'probability': 0.35},
            // spear tail
            {'abbreviation':'rs', 'probability': 0.10},
            // pin tail
            {'abbreviation':'rp', 'probability': 0.05}
        ]
    ]

    static async ageFish(fish, tankMates){

        if (fish.health <= 0){
            await Fish.findOneAndRemove({_id: fish._id})
            return 
        }

        let newHealth = fish.health
        let newAge 
        let newHunger

        if (fish.hunger <= 0){
            newHealth = newHealth - 10
        }

        // test if hunger reduces health


    
        if (fish.species == 'Guppy' && !fish.isMale && fish.age > 4){
            
            // add restriction health over 20
            let maleGuppies = tankMates.filter( el => el.isMale && el.species === 'Guppy' )
    
            if (maleGuppies){
                // 
                FishClass.breedFish(fish, maleGuppies[0])
    
                newHealth = fish.health - 20
            }
            
        }
    
        newAge = fish.age + 1
        newHunger = fish.hunger - 15
        await Fish.findOneAndUpdate({_id: fish._id}, {age: newAge, hunger: newHunger, health: newHealth})

    }
    
    
    static async breedFish(mother, father){
    
        let numberOfFry
    
        if (mother.species === 'Guppy'){
            numberOfFry = 3 + (Math.floor((Math.random() * 5)) - 2) // 3 plus or minus 2
    
            for(let i = 0; i < numberOfFry; i++){
                //combine genes
                // generate color and fins 
    
                
    
                let fryIsMale = Math.round(Math.random())? true : false
    
                const newFry = new Fish({
                    name: 'Unnamed Fish',
                    species: mother.species,
                    isMale: fryIsMale,
                    ownerId: mother.ownerId,
                    tankId: mother.tankId,
                    age: 0,
                    health: 100, 
                    hunger: 90
                })
    
                Fish.create(newFry)
    
            }
        }
    
    }

    static randomGuppyFinGenome(){

        return FishClass.createRandomGenome(this.GuppyFinAlleles)

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
    
    
    


}

module.exports = FishClass