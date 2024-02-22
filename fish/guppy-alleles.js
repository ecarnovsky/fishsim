  class GuppyAlleles{


   // All alleles are listed in order of dominance
    static GUPPY_FIN_ALLELES = [
        [
            // suppresses longfin
            {'abbreviation':'F', 'petshopProbability': 0.60, 'pondProbability': 1},
            // no suppressant
            {'abbreviation':'f', 'petshopProbability': 0.40, 'pondProbability': 0}
        ],
        [
            // round tail
            {'abbreviation':'R', 'petshopProbability': 0.50, 'pondProbability': 0.59},
            // spade/coffer tail
            {'abbreviation':'rc', 'petshopProbability': 0.35, 'pondProbability': 0},
            // spear tail
            {'abbreviation':'rs', 'petshopProbability': 0.10, 'pondProbability': 0.40},
            // pin tail
            {'abbreviation':'rp', 'petshopProbability': 0.05, 'pondProbability': 0.01}
        ],
        [
            // sword/lyre tail
            {'abbreviation':'S', 'petshopProbability': 0.01, 'pondProbability': 0.65},
            // no sword/lyre tail
            {'abbreviation':'s', 'petshopProbability': 0.99, 'pondProbability': 0.35}
        ], 
        [
            // no scarf/flag tail
            {'abbreviation':'A', 'petshopProbability': 0.80, 'pondProbability': 0.30},
            // scarf/flag tail
            {'abbreviation':'a', 'petshopProbability': 0.20, 'pondProbability': 0.70}
        ],
        [
            // no dumbo
            {'abbreviation':'D', 'petshopProbability': 0.99, 'pondProbability': 1},
            // dumbo
            {'abbreviation':'d', 'petshopProbability': 0.01, 'pondProbability': 0}
        ],
        [
            // crowntail 
            {'abbreviation':'C', 'petshopProbability': 0.01, 'pondProbability': 0},
            // no crowntail
            {'abbreviation':'c', 'petshopProbability': 0.99, 'pondProbability': 1}
        ],
        [
            // no swallow tail
            {'abbreviation':'W', 'petshopProbability': 0.99, 'pondProbability': 1},
            // swallow tail
            {'abbreviation':'w', 'petshopProbability': 0.01, 'pondProbability': 0}
        ],
        [
            // ribbon
            {'abbreviation':'B', 'petshopProbability': 0.01, 'pondProbability': 0},
            // no ribbon
            {'abbreviation':'b', 'petshopProbability': 0.99, 'pondProbability': 1}
        ],
        [
            // no rose
            {'abbreviation':'O', 'petshopProbability': 0.99, 'pondProbability': 1},
            // rose
            {'abbreviation':'o', 'petshopProbability': 0.01, 'pondProbability': 0}
        ]
    ]

    static GUPPY_TAIL_SIZE_ALLELES = [
        // smaller tail
        {'abbreviation':'H', 'petshopProbability': 0.40, 'pondProbability': 0.85},
        // bigger tail
        {'abbreviation':'h', 'petshopProbability': 0.60, 'pondProbability': 0.15}
    ]

    static GUPPY_SWORD_TYPE_ALLELES = [
        // closer to bad lyre tail
        {'abbreviation':'H', 'petshopProbability': 0.40, 'pondProbability': 0.20},
        // closer to perfect lyre tail
        {'abbreviation':'h', 'petshopProbability': 0.60, 'pondProbability': 0.80}
    ]

    static GUPPY_COLOR_ALLELES = [
        [
            // black pigment
            {'abbreviation':'M', 'petshopProbability': 0.70, 'pondProbability': 0.90},
            // no black pigment
            {'abbreviation':'m', 'petshopProbability': 0.30, 'pondProbability': 0.10}
        ],
        [
            // allows blue pigment
            {'abbreviation':'G', 'petshopProbability': 0.30, 'pondProbability': 0.40},
            // no blue pigment
            {'abbreviation':'g', 'petshopProbability': 0.70, 'pondProbability': 0.60}
        ],
        [
            // red pigment
            {'abbreviation':'E', 'petshopProbability': 0.70, 'pondProbability': 0.90},
            // no red pigment
            {'abbreviation':'e', 'petshopProbability': 0.30, 'pondProbability': 0.10}
        ],
        [
            // yellow pigment
            {'abbreviation':'X', 'petshopProbability': 0.70, 'pondProbability': 0.30},
            // no yellow pigment
            {'abbreviation':'x', 'petshopProbability': 0.30, 'pondProbability': 0.70}
        ],
        [
            //  no moscow
            {'abbreviation':'O', 'petshopProbability': 0.90, 'pondProbability': 1},
            // moscow
            {'abbreviation':'o', 'petshopProbability': 0.1, 'pondProbability': 0}
        ],
        [
            // no koi
            {'abbreviation':'K', 'petshopProbability': 0.98, 'pondProbability': 1},
            // koi
            {'abbreviation':'k', 'petshopProbability': 0.02, 'pondProbability': 0}
        ],
        [
            // tuxedo
            {'abbreviation':'T', 'petshopProbability': 0.30, 'pondProbability': 0},
            // none
            {'abbreviation':'t', 'petshopProbability': 0.70, 'pondProbability': 1}
        ],
        [
            // none
            {'abbreviation':'N', 'petshopProbability': 0.80, 'pondProbability': 1},
            // half black (including tail)
            {'abbreviation':'nh', 'petshopProbability': 0.19, 'pondProbability': 0},
            // full black
            {'abbreviation':'n', 'petshopProbability': 0.01, 'pondProbability': 0}
        ],
        [
            // tail is black
            {'abbreviation':'A', 'petshopProbability': 0.10, 'pondProbability': 0},
            // none
            {'abbreviation':'a', 'petshopProbability': 0.90, 'pondProbability': 1}
        ],
        [
            // mosaic
            {'abbreviation':'P', 'petshopProbability': 0.40, 'pondProbability': 0},
            // leopard
            {'abbreviation':'pl', 'petshopProbability': 0.40, 'pondProbability': 0.10},
            // lace
            {'abbreviation':'pa', 'petshopProbability': 0.09, 'pondProbability': 0},
            // grass
            {'abbreviation':'pg', 'petshopProbability': 0.04, 'pondProbability': 0},
            // none
            {'abbreviation':'pn', 'petshopProbability': 0.07, 'pondProbability': 0.90}
        ],
        [
            // snakeskin
            {'abbreviation':'S', 'petshopProbability': 0.15, 'pondProbability': 0.10},
            // none
            {'abbreviation':'s', 'petshopProbability': 0.85, 'pondProbability': 0.90}
        ],
        [
            // normal
            {'abbreviation':'R', 'petshopProbability': 0.99, 'pondProbability': 1},
            // full red
            {'abbreviation':'r', 'petshopProbability': 0.01, 'pondProbability': 0}
        ],
        [
            // normal
            {'abbreviation':'Y', 'petshopProbability': 0.95, 'pondProbability': 1},
            // albino 1
            {'abbreviation':'y', 'petshopProbability': 0.05, 'pondProbability': 0}
        ],
        [
            // normal
            {'abbreviation':'Z', 'petshopProbability': 0.95, 'pondProbability': 1},
            // albino 2
            {'abbreviation':'z', 'petshopProbability': 0.05, 'pondProbability': 0}
        ],
        [
            // normal
            {'abbreviation':'B', 'petshopProbability': 0.99, 'pondProbability': 1},
            // blue, no red, no yellow
            {'abbreviation':'b', 'petshopProbability': 0.01, 'pondProbability': 0}
        ],
        [
            // normal
            {'abbreviation':'U', 'petshopProbability': 0.99, 'pondProbability': 1},
            // blue, reduced red, no yellow
            {'abbreviation':'u', 'petshopProbability': 0.01, 'pondProbability': 0}
        ],
    ]
}

module.exports = GuppyAlleles