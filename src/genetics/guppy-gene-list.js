const Gene = require('./gene.js')
const Allele = require('./allele.js')
const MutatableTraitExports = require('./mutatable-trait.js')
const MutatableTrait = MutatableTraitExports.MutatableTrait
const TraitTypes = MutatableTraitExports.TraitTypes
const MutationRates = MutatableTraitExports.MutationRates

// let GUPPY_GENE_LIST = []
// let allele
// let gene
// let mutatableTrait



// gene = new Gene("longfin suppressor", "autosomal", [])

// // suppresses longfin
// allele = new Allele('Sup', 100, 0.60, 1, [])
// gene.alleles.push(allele)

// // no suppressant
// allele = new Allele('sup', 0, 0.40, 0, [])
// gene.alleles.push(allele)

// GUPPY_GENE_LIST.push(gene)


const GUPPY_GENE_LIST = [

    new Gene("tail angle", "autosomal", [
        new Allele(undefined, 80, 0.50, 0.90, [
            new MutatableTrait("tailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 100)
        ]),
        new Allele(undefined, 50, 0.30, 0.10, [
            new MutatableTrait("tailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 80)
        ]),
        new Allele(undefined, 30, 0.20, 0.00, [
            new MutatableTrait("tailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 70)
        ])
    ])

]


// gene = new Gene("tail angle", "autosomal", [])

// // 100% (base is a full half circle)
// allele = new Allele(undefined, 80, 0.50, 0.90, [])
// mutatableTrait = new MutatableTrait("tailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 100)
// allele.mutatableTraits.push(mutatableTrait)
// gene.alleles.push(allele)

// // 80%
// allele = new Allele(undefined, 50, 0.30, 0.10, [])
// mutatableTrait = new MutatableTrait("tailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 80)
// allele.mutatableTraits.push(mutatableTrait)
// gene.alleles.push(allele)

// // 70%
// allele = new Allele(undefined, 30, 0.20, 0.00, [])
// mutatableTrait = new MutatableTrait("tailAnglePercent", TraitTypes.BodyValue, MutationRates.Middle, 70)
// allele.mutatableTraits.push(mutatableTrait)
// gene.alleles.push(allele)

// GUPPY_GENE_LIST.push(gene)




// gene = new Gene("black pigment", "autosomal", [])

// // allows black pigment
// allele = new Allele('M', 100, 0.70, 0.90, [])
// gene.alleles.push(allele)

// // doesn't allow black pigment
// allele = new Allele('m', 0, 0.30, 0.10, [])
// gene.alleles.push(allele)

// GUPPY_GENE_LIST.push(gene)




// gene = new Gene("red pigment", "autosomal", [])

// // allows red pigment
// allele = new Allele('E', 100, 0.70, 0.90, [])
// gene.alleles.push(allele)

// // doesn't red black pigment
// allele = new Allele('e', 0, 0.30, 0.10, [])
// gene.alleles.push(allele)

// GUPPY_GENE_LIST.push(gene)



// gene = new Gene("yellow pigment", "autosomal", [])

// // allows yellow pigment
// allele = new Allele('X', 100, 0.70, 0.30, [])
// gene.alleles.push(allele)

// // doesn't allow yellow pigment
// allele = new Allele('x', 0, 0.30, 0.70, [])
// gene.alleles.push(allele)

// GUPPY_GENE_LIST.push(gene)




// gene = new Gene("blue pigment", "autosomal", [])

// // allows blue pigment
// allele = new Allele('G', 100, 0.30, 0.40, [])
// gene.alleles.push(allele)

// // doesn't allow blue pigment
// allele = new Allele('g', 0, 0.70, 0.60, [])
// gene.alleles.push(allele)

// GUPPY_GENE_LIST.push(gene)




module.exports = GUPPY_GENE_LIST