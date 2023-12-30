const Fish = require('../models/fish')


class FishClass{

    // All alleles are listed in order of dominance
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

                let fryFinGenome = this.combineGenomes(mother.finGenome, father.finGenome, this.GuppyFinAlleles)
    
                const newFry = new Fish({
                    name: 'Unnamed Fish',
                    species: mother.species,
                    isMale: fryIsMale,
                    ownerId: mother.ownerId,
                    tankId: mother.tankId,
                    age: 0,
                    health: 100, 
                    hunger: 90,
                    finGenome: fryFinGenome
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
    
    
    


}

module.exports = FishClass