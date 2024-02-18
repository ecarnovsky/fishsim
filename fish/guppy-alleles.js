  class GuppyAlleles{


   // All alleles are listed in order of dominance
    static GUPPY_FIN_ALLELES = [
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

    static GUPPY_TAIL_SIZE_ALLELES = [
        // smaller tail
        {'abbreviation':'H', 'probability': 0.40},
        // bigger tail
        {'abbreviation':'h', 'probability': 0.60}
    ]

    static GUPPY_SWORD_TYPE_ALLELES = [
        // closer to bad lyre tail
        {'abbreviation':'H', 'probability': 0.40},
        // closer to perfect lyre tail
        {'abbreviation':'h', 'probability': 0.60}
    ]

    static GUPPY_COLOR_ALLELES = [
        [
            // black pigment
            {'abbreviation':'M', 'probability': 0.70},
            // no black pigment
            {'abbreviation':'m', 'probability': 0.30}
        ],
        [
            // allows blue pigment
            {'abbreviation':'G', 'probability': 0.30},
            // no blue pigment
            {'abbreviation':'g', 'probability': 0.70}
        ],
        [
            // red pigment
            {'abbreviation':'E', 'probability': 0.70},
            // no red pigment
            {'abbreviation':'e', 'probability': 0.30}
        ],
        [
            // yellow pigment
            {'abbreviation':'X', 'probability': 0.70},
            // no yellow pigment
            {'abbreviation':'x', 'probability': 0.30}
        ],
        [
            //  no moscow
            {'abbreviation':'O', 'probability': 0.90},
            // moscow
            {'abbreviation':'o', 'probability': 0.10}
        ],
        [
            // no koi
            {'abbreviation':'K', 'probability': 0.98},
            // koi
            {'abbreviation':'k', 'probability': 0.02}
        ],
        [
            // tuxedo
            {'abbreviation':'T', 'probability': 0.30},
            // none
            {'abbreviation':'t', 'probability': 0.70}
        ],
        [
            // none
            {'abbreviation':'N', 'probability': 0.80},
            // half black (including tail)
            {'abbreviation':'nh', 'probability': 0.19},
            // full black
            {'abbreviation':'n', 'probability': 0.01}
        ],
        [
            // tail is black
            {'abbreviation':'A', 'probability': 0.10},
            // none
            {'abbreviation':'a', 'probability': 0.90}
        ],
        [
            // mosaic
            {'abbreviation':'P', 'probability': 0.40},
            // leopard
            {'abbreviation':'pl', 'probability': 0.40},
            // lace
            {'abbreviation':'pa', 'probability': 0.09},
            // grass
            {'abbreviation':'pg', 'probability': 0.04},
            // none
            {'abbreviation':'pn', 'probability': 0.07}
        ],
        [
            // snakeskin
            {'abbreviation':'S', 'probability': 0.15},
            // none
            {'abbreviation':'s', 'probability': 0.85}
        ],
        [
            // normal
            {'abbreviation':'R', 'probability': 0.99},
            // full red
            {'abbreviation':'r', 'probability': 0.01}
        ],
        [
            // normal
            {'abbreviation':'Y', 'probability': 0.95},
            // albino 1
            {'abbreviation':'y', 'probability': 0.05}
        ],
        [
            // normal
            {'abbreviation':'Z', 'probability': 0.95},
            // albino 2
            {'abbreviation':'z', 'probability': 0.05}
        ],
        [
            // normal
            {'abbreviation':'B', 'probability': 0.99},
            // blue, no red, no yellow
            {'abbreviation':'b', 'probability': 0.01}
        ],
        [
            // normal
            {'abbreviation':'U', 'probability': 0.99},
            // blue, reduced red, no yellow
            {'abbreviation':'u', 'probability': 0.01}
        ],
    ]
}

module.exports = GuppyAlleles