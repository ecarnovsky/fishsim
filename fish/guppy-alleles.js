  class GuppyAlleles{


   // All alleles are listed in order of dominance
    static GUPPY_FIN_ALLELES = [
        [
            // suppresses longfin
            {'abbreviation':'F', 'petshopProbability': 0.60},
            // no suppressant
            {'abbreviation':'f', 'petshopProbability': 0.40}
        ],
        [
            // round tail
            {'abbreviation':'R', 'petshopProbability': 0.50},
            // spade/coffer tail
            {'abbreviation':'rc', 'petshopProbability': 0.35},
            // spear tail
            {'abbreviation':'rs', 'petshopProbability': 0.10},
            // pin tail
            {'abbreviation':'rp', 'petshopProbability': 0.05}
        ],
        [
            // sword/lyre tail
            {'abbreviation':'S', 'petshopProbability': 0.01},
            // no sword/lyre tail
            {'abbreviation':'s', 'petshopProbability': 0.99}
        ], 
        [
            // no scarf/flag tail
            {'abbreviation':'A', 'petshopProbability': 0.80},
            // scarf/flag tail
            {'abbreviation':'a', 'petshopProbability': 0.20}
        ],
        [
            // no dumbo
            {'abbreviation':'D', 'petshopProbability': 0.99},
            // dumbo
            {'abbreviation':'d', 'petshopProbability': 0.01}
        ],
        [
            // crowntail 
            {'abbreviation':'C', 'petshopProbability': 0.01},
            // no crowntail
            {'abbreviation':'c', 'petshopProbability': 0.99}
        ],
        [
            // no swallow tail
            {'abbreviation':'W', 'petshopProbability': 0.99},
            // swallow tail
            {'abbreviation':'w', 'petshopProbability': 0.01}
        ],
        [
            // ribbon
            {'abbreviation':'B', 'petshopProbability': 0.01},
            // no ribbon
            {'abbreviation':'b', 'petshopProbability': 0.99}
        ],
        [
            // no rose
            {'abbreviation':'O', 'petshopProbability': 0.99},
            // rose
            {'abbreviation':'o', 'petshopProbability': 0.01}
        ]
    ]

    static GUPPY_TAIL_SIZE_ALLELES = [
        // smaller tail
        {'abbreviation':'H', 'petshopProbability': 0.40},
        // bigger tail
        {'abbreviation':'h', 'petshopProbability': 0.60}
    ]

    static GUPPY_SWORD_TYPE_ALLELES = [
        // closer to bad lyre tail
        {'abbreviation':'H', 'petshopProbability': 0.40},
        // closer to perfect lyre tail
        {'abbreviation':'h', 'petshopProbability': 0.60}
    ]

    static GUPPY_COLOR_ALLELES = [
        [
            // black pigment
            {'abbreviation':'M', 'petshopProbability': 0.70},
            // no black pigment
            {'abbreviation':'m', 'petshopProbability': 0.30}
        ],
        [
            // allows blue pigment
            {'abbreviation':'G', 'petshopProbability': 0.30},
            // no blue pigment
            {'abbreviation':'g', 'petshopProbability': 0.70}
        ],
        [
            // red pigment
            {'abbreviation':'E', 'petshopProbability': 0.70},
            // no red pigment
            {'abbreviation':'e', 'petshopProbability': 0.30}
        ],
        [
            // yellow pigment
            {'abbreviation':'X', 'petshopProbability': 0.70},
            // no yellow pigment
            {'abbreviation':'x', 'petshopProbability': 0.30}
        ],
        [
            //  no moscow
            {'abbreviation':'O', 'petshopProbability': 0.90},
            // moscow
            {'abbreviation':'o', 'petshopProbability': 0.10}
        ],
        [
            // no koi
            {'abbreviation':'K', 'petshopProbability': 0.98},
            // koi
            {'abbreviation':'k', 'petshopProbability': 0.02}
        ],
        [
            // tuxedo
            {'abbreviation':'T', 'petshopProbability': 0.30},
            // none
            {'abbreviation':'t', 'petshopProbability': 0.70}
        ],
        [
            // none
            {'abbreviation':'N', 'petshopProbability': 0.80},
            // half black (including tail)
            {'abbreviation':'nh', 'petshopProbability': 0.19},
            // full black
            {'abbreviation':'n', 'petshopProbability': 0.01}
        ],
        [
            // tail is black
            {'abbreviation':'A', 'petshopProbability': 0.10},
            // none
            {'abbreviation':'a', 'petshopProbability': 0.90}
        ],
        [
            // mosaic
            {'abbreviation':'P', 'petshopProbability': 0.40},
            // leopard
            {'abbreviation':'pl', 'petshopProbability': 0.40},
            // lace
            {'abbreviation':'pa', 'petshopProbability': 0.09},
            // grass
            {'abbreviation':'pg', 'petshopProbability': 0.04},
            // none
            {'abbreviation':'pn', 'petshopProbability': 0.07}
        ],
        [
            // snakeskin
            {'abbreviation':'S', 'petshopProbability': 0.15},
            // none
            {'abbreviation':'s', 'petshopProbability': 0.85}
        ],
        [
            // normal
            {'abbreviation':'R', 'petshopProbability': 0.99},
            // full red
            {'abbreviation':'r', 'petshopProbability': 0.01}
        ],
        [
            // normal
            {'abbreviation':'Y', 'petshopProbability': 0.95},
            // albino 1
            {'abbreviation':'y', 'petshopProbability': 0.05}
        ],
        [
            // normal
            {'abbreviation':'Z', 'petshopProbability': 0.95},
            // albino 2
            {'abbreviation':'z', 'petshopProbability': 0.05}
        ],
        [
            // normal
            {'abbreviation':'B', 'petshopProbability': 0.99},
            // blue, no red, no yellow
            {'abbreviation':'b', 'petshopProbability': 0.01}
        ],
        [
            // normal
            {'abbreviation':'U', 'petshopProbability': 0.99},
            // blue, reduced red, no yellow
            {'abbreviation':'u', 'petshopProbability': 0.01}
        ],
    ]
}

module.exports = GuppyAlleles