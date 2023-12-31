const Fish = require('../models/fish')
const User = require('../models/user')


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
            // spade/coffer tail
            {'abbreviation':'rc', 'probability': 0.35},
            // spear tail
            {'abbreviation':'rs', 'probability': 0.10},
            // pin tail
            {'abbreviation':'rp', 'probability': 0.05}
        ],
        [
            // sword/lyre tail
            {'abbreviation':'S', 'probability': 0.01},
            // no sword/lyre tail
            {'abbreviation':'s', 'probability': 0.99}
        ], 
        [
            // no scarf/flag tail
            {'abbreviation':'A', 'probability': 0.80},
            // scarf/flag tail
            {'abbreviation':'a', 'probability': 0.20}
        ],
        [
            // no dumbo
            {'abbreviation':'D', 'probability': 0.99},
            // dumbo
            {'abbreviation':'d', 'probability': 0.01}
        ],
        [
            // crowntail 
            {'abbreviation':'C', 'probability': 0.01},
            // no crowntail
            {'abbreviation':'c', 'probability': 0.99}
        ],
        [
            // no swallow tail
            {'abbreviation':'W', 'probability': 0.99},
            // swallow tail
            {'abbreviation':'w', 'probability': 0.01}
        ],
        [
            // ribbon
            {'abbreviation':'B', 'probability': 0.01},
            // no ribbon
            {'abbreviation':'b', 'probability': 0.99}
        ],
        [
            // no rose
            {'abbreviation':'O', 'probability': 0.99},
            // rose
            {'abbreviation':'o', 'probability': 0.01}
        ]
    ]

    static GuppyTailSizeAlleles = [
        // smaller tail
        {'abbreviation':'H', 'probability': 0.40},
        // bigger tail
        {'abbreviation':'h', 'probability': 0.60}
    ]

    static GuppySwordTypeAlleles = [
        // closer to bad lyre tail
        {'abbreviation':'H', 'probability': 0.40},
        // closer to perfect lyre tail
        {'abbreviation':'h', 'probability': 0.60}
    ]

    static generateFinDescriptionStr(finGenome, tailSizeGenome, swordTypeGenome){

        let allelesArray = finGenome.split(/\s|-/)

        let descriptionStr = ''
        let smallTail = true
        let suppressLongfin 
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




        if (smallTail){
            if (round){
                tailShape = 'round'
            } else if (spade){
                tailShape = 'spade'
            } else if (spear){
                tailShape = 'spear'
            } else {
                tailShape = 'pin'
            }   
        }
        if (!smallTail){
            ////////////code once tail sizes added/////////////////
        }
        if (smallTail && sword){
            tailShape = tailShape + 'sword'
        } else if (sword){
            tailShape = 'sword'
        }
        // add change to perfect lyre tail later
        if (!smallTail && scarf){
            tailShape = 'scarf'
        }
        if (!suppressLongfin && rose){
            descriptionStr = "rose " + descriptionStr
        }
        if (!suppressLongfin && dumbo){
            descriptionStr = "dumbo " + descriptionStr
        }
        if (!suppressLongfin && swallow){
            if (!smallTail){
                descriptionStr = "swallow " + descriptionStr
            } else {
                descriptionStr = "ribbon " + descriptionStr
            } 
        }
        if (!suppressLongfin && ribbon && !swallow){
            descriptionStr = "ribbon " + descriptionStr
        }


        return descriptionStr + " " + tailShape + " " + 'tail'

    }

    static async ageFish(fish, tankMates, req){

        // tests if fish died due to zero health
        if (fish.health <= 0){
            await Fish.findOneAndRemove({_id: fish._id})
            //await User.findOneAndUpdate({_id: req.user._id}, {numberOfFish: req.user.numberOfFish - 1})
            return 
        }

        let newHealth = fish.health
        let newAge 
        let newHunger

        // reduces health if hunger low
        if (fish.hunger <= 0){
            newHealth = newHealth - 30
        } else if (fish.hunger <= 25){
            newHealth = newHealth - 20
        } else if (fish.hunger <= 50){
            newHealth = newHealth - 10
        }
 
        if (fish.species == 'Guppy' && !fish.isMale && fish.age > 4 && req.user.fishLimit > req.user.numberOfFish){
            
            // add restriction health over 20
            let maleGuppies = tankMates.filter( el => el.isMale && el.species === 'Guppy' )
    
            if (maleGuppies){
                // 
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
                    finGenome: fryFinGenome, 
                    finDescription: this.generateFinDescriptionStr(fryFinGenome)
                })
    
                Fish.create(newFry)
    
            }

            // let user = await User.findOne({_id:  req.user._id})
            // console.log(user.numberOfFish)
            // await User.findOneAndUpdate({_id:  req.user._id}, {numberOfFish: user.numberOfFish + numberOfFry})

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


            // second alleles

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
        console.log(newGenome)
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