import {Gene} from './gene.js'
import {GeneTypes} from './gene.js'
import {Allele} from './allele.js'
import {MutatableTrait} from './mutatable-trait.js'
import {TraitTypes} from './mutatable-trait.js'
import {MutationRates} from './mutatable-trait.js'


const GUPPY_GENE_LIST = [


    new Gene("longfin suppressor", GeneTypes.Autosomal, [
        // suppresses longfin
        new Allele("Sup", 100, 0.60, 1, []),
        // no suppressant
        new Allele("sup", 0, 0.40, 0, [])
    ]),

    new Gene("tail angle", GeneTypes.Autosomal, [
        // 100% (base is a full half circle)
        new Allele(undefined, 80, 0.50, 0.90, [
            new MutatableTrait("tailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 0)
        ]),
        // 80%
        new Allele(undefined, 50, 0.30, 0.10, [
            new MutatableTrait("varInTailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, -20)
        ]),
        // 70%
        new Allele(undefined, 30, 0.20, 0.00, [
            new MutatableTrait("varInTailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, -30)
        ])
    ]),

    new Gene("black pigment", GeneTypes.Autosomal, [
        // allows black pigment
        new Allele("M", 100, 0.70, 0.90, []),
        // doesn't allow black pigment
        new Allele("m", 0, 0.30, 0.10, [])
    ]),

    new Gene("red pigment", GeneTypes.Autosomal, [
        // allows red pigment
        new Allele('E', 100, 0.70, 0.90, []),
        // doesn't allow red pigment
        new Allele('e', 0, 0.30, 0.10, [])
    ]),

    new Gene("yellow pigment", GeneTypes.Autosomal, [
        // allows yellow pigment
        new Allele('X', 100, 0.70, 0.30, []),
        // doesn't allow yellow pigment
        new Allele('x', 0, 0.30, 0.70, [])
    ]),

    new Gene("blue pigment", GeneTypes.Autosomal, [
        // allows blue pigment
        new Allele('G', 100, 0.30, 0.40, []),
        // doesn't allow blue pigment
        new Allele('g', 0, 0.70, 0.60, [])
    ]),

    new Gene("tuxedo", GeneTypes.XLinked, [
        // tuxedo / half-black
        new Allele("Ni2", 70, 0.20, 0.00, [
            new MutatableTrait("varInTuxTopPoint", TraitTypes.BodyValue, MutationRates.Middle, 0),
            new MutatableTrait("varInTuxLowPoint", TraitTypes.BodyValue, MutationRates.Middle, 0)
        ]),
        // no tuxedo / half-black
        new Allele("ni2", 0, 0.80, 1, [])
    ]),

    new Gene("moscow", GeneTypes.YLinked, [
        // moscow
        new Allele('Mw', 100, 0.01, 0.00, []),
        // no moscow
        new Allele('mw', 0, 0.99, 1, [])
    ]),    
    
    new Gene("albino 1", GeneTypes.Autosomal, [
        // not albino
        new Allele('A1', 100, 0.96, 0.99, []),
        // albino
        new Allele('a1', 0, 0.04, 0.01, [])
    ]),

    new Gene("albino 2", GeneTypes.Autosomal, [
        // not albino
        new Allele('A2', 100, 0.95, 1, []),
        // albino
        new Allele('a2', 0, 0.05, 0.00, [])
    ]),



]



module.exports = GUPPY_GENE_LIST