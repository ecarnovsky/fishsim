const FishClass = require('../built/fish/fish-class')
import { Gene } from '../built/genetics/gene';
import { GeneTypes } from '../built/genetics/gene';
import { PremadeAllele } from '../built/genetics/premade-allele';


let testGene = new Gene("longfin suppressor", GeneTypes.Autosomal, [
    new PremadeAllele("Sup", 100, 0.60, 1, []),
    new PremadeAllele("sup", 0, 0.40, 0, [])
])

test('picks a random allele based on probability', () => {
    expect(FishClass.pickRandomAllele(testGene, "pondProbability")).toBe(testGene.alleles[0]);
  });