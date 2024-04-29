import {Gene} from './gene.js'
import {GeneTypes} from './gene.js'
import {PremadeAllele} from './premade-allele.js'
import {MutatableTrait} from './mutatable-trait.js'
import {TraitTypes} from './mutatable-trait.js'
import {MutationRates} from './mutatable-trait.js'

/**
 * An array of all guppy genes.
 * Each gene hold a array of all unmutated alleles.
 */
const GUPPY_GENE_LIST = [


    new Gene("longfin suppressor", GeneTypes.Autosomal, [
        // suppresses longfin
        new PremadeAllele("Sup", 100, 0.60, 1, []),
        // no suppressant
        new PremadeAllele("sup", 0, 0.40, 0, [])
    ]),

    new Gene("tail angle", GeneTypes.Autosomal, [
        // 100% (base is a full half circle)
        new PremadeAllele(undefined, 80, 0.49, 0.90, [
            new MutatableTrait("varInTailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 0)
        ]),
        // 80%
        new PremadeAllele(undefined, 50, 0.25, 0.10, [
            new MutatableTrait("varInTailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, -10)
        ]),
        // 70%
        new PremadeAllele(undefined, 30, 0.20, 0.00, [
            new MutatableTrait("varInTailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, -20)
        ]),
        new PremadeAllele(undefined, 20, 0.05, 0.00, [
            new MutatableTrait("varInTailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, -30)
        ]),
        new PremadeAllele(undefined, 15, 0.01, 0.00, [
            new MutatableTrait("varInTailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, -40)
        ])
    ]),

    new Gene("black pigment", GeneTypes.Autosomal, [
        // allows black pigment
        new PremadeAllele("M", 100, 0.70, 0.90, []),
        // doesn't allow black pigment
        new PremadeAllele("m", 0, 0.30, 0.10, [])
    ]),

    new Gene("red pigment", GeneTypes.Autosomal, [
        // allows red pigment
        new PremadeAllele('E', 100, 0.70, 0.90, []),
        // doesn't allow red pigment
        new PremadeAllele('e', 0, 0.30, 0.10, [])
    ]),

    new Gene("yellow pigment", GeneTypes.Autosomal, [
        // allows yellow pigment
        new PremadeAllele('X', 100, 0.70, 0.30, []),
        // doesn't allow yellow pigment
        new PremadeAllele('x', 0, 0.30, 0.70, [])
    ]),

    new Gene("blue pigment", GeneTypes.Autosomal, [
        // allows blue pigment
        new PremadeAllele('G', 100, 0.30, 0.40, []),
        // doesn't allow blue pigment
        new PremadeAllele('g', 0, 0.70, 0.60, [])
    ]),

    new Gene("tuxedo", GeneTypes.XLinked, [
        // tuxedo / half-black
        new PremadeAllele("Ni2", 70, 0.10, 0.00, [
            new MutatableTrait("varInTuxTopLength", TraitTypes.BodyValue, MutationRates.Middle, 0),
            new MutatableTrait("varInTuxLowLength", TraitTypes.BodyValue, MutationRates.Middle, 0)
        ]),
        new PremadeAllele("Ni2", 65, 0.05, 0.00, [
            new MutatableTrait("varInTuxTopLength", TraitTypes.BodyValue, MutationRates.Middle, -5),
            new MutatableTrait("varInTuxLowLength", TraitTypes.BodyValue, MutationRates.Middle, -1)
        ]),
        new PremadeAllele("Ni2", 60, 0.05, 0.00, [
            new MutatableTrait("varInTuxTopLength", TraitTypes.BodyValue, MutationRates.Middle, 10),
            new MutatableTrait("varInTuxLowLength", TraitTypes.BodyValue, MutationRates.Middle, 1)
        ]),
        // no tuxedo / half-black
        new PremadeAllele("ni2", 0, 0.80, 1, [])
    ]),

    new Gene("moscow", GeneTypes.YLinked, [
        // moscow
        new PremadeAllele('Mw', 100, 0.01, 0.00, []),
        // no moscow
        new PremadeAllele('mw', 0, 0.99, 1, [])
    ]),    
    
    new Gene("albino 1", GeneTypes.Autosomal, [
        // not albino
        new PremadeAllele('A1', 100, 0.96, 0.99, []),
        // albino
        new PremadeAllele('a1', 0, 0.04, 0.01, [])
    ]),

    new Gene("albino 2", GeneTypes.Autosomal, [
        // not albino
        new PremadeAllele('A2', 100, 0.95, 1, []),
        // albino
        new PremadeAllele('a2', 0, 0.05, 0.00, [])
    ]),



]



module.exports = GUPPY_GENE_LIST