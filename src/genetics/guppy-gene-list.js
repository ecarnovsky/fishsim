const GeneExports = require('./gene.js')
const Gene = GeneExports.Gene
const GeneTypes = GeneExports.GeneTypes
const Allele = require('./allele.js')
const MutatableTraitExports = require('./mutatable-trait.js')
const MutatableTrait = MutatableTraitExports.MutatableTrait
const TraitTypes = MutatableTraitExports.TraitTypes
const MutationRates = MutatableTraitExports.MutationRates




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
            new MutatableTrait("tailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 100)
        ]),
        // 80%
        new Allele(undefined, 50, 0.30, 0.10, [
            new MutatableTrait("tailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 80)
        ]),
        // 70%
        new Allele(undefined, 30, 0.20, 0.00, [
            new MutatableTrait("tailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 70)
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
    ])

]



module.exports = GUPPY_GENE_LIST