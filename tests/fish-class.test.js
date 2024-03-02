const FishClass = require('../built/fish/fish-class')
import { Gene } from '../built/genetics/gene';
import { GeneTypes } from '../built/genetics/gene';
import { PremadeAllele } from '../built/genetics/premade-allele';


let testGene = new Gene("", GeneTypes.Autosomal, [
    new PremadeAllele("", 100, 0.40, 0, []),
    new PremadeAllele("", 0, 0.20, 1, []),
    new PremadeAllele("", 40, 0.30, 0, []),
])

test('picks a random allele based on probability', () => {
    expect(FishClass.pickRandomAllele(testGene, "pondProbability")).toBe(testGene.alleles[1]);
  });