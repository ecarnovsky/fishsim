const BASE_COLORS = {
	Red: "rgb(233,28,41)",
	Black: "rgb(25,25,25)",
	Albino: "rgb(253,252,247)",
	Tranparent: "rgb(250,247,236)",
  Yellow: "rgb(225,245,111)",
  Brown: "rgb(170,153,137)",
  Blue: "#3399FF"
}
const REGULAR_EYE_COLOR = "rgb(76,77,77)"
const ALBINO_EYE_COLOR = "rgb(225,104,141)"

////////////////////////////////////////////////

class Point {
  constructor(x, y){
    this.x = x
    this.y = y
  }
}

const canvasArr = document.querySelectorAll('canvas')

for (let i = 0; i < canvasArr.length; i++){

  const canvas = canvasArr[i];

  canvas.width = 250;   
  canvas.height = 250;
 


  // Gets the sex and the mainGenome from the DOM.
  const fishDiv = canvasArr[i].parentNode.parentNode
  const sex = fishDiv.querySelector('.sex').getAttribute("aria-label")
  const mainGenome =  JSON.parse(fishDiv.dataset.fishmaingenome)
  // Log for testing
  console.log(mainGenome)


  let tempGeneHolder

  const isMale = (sex === "male") ? true : false

  const varInBodyLength = 0
  const varInBodyThickness = 0
  const varInTailLength = 20
  const varInTailRadius = 0
  const varInTailAngle = -10
  const varInTuxTopLength = 0
  const varInTuxLowLength = 0

  // The below code sets variables to true
  // or false depending of if the fish has
  // the genetics for the trait.
  tempGeneHolder =  mainGenome.filter(el => el.name === "longfin suppressor")[0]
  const longfinSuppressant = tempGeneHolder.alleles.length >= 1 && tempGeneHolder.alleles[0].abbreviation === "Sup" ? true : false

  tempGeneHolder = mainGenome.filter(el => el.name === "tuxedo")[0]
  const tuxedo = tempGeneHolder.alleles.length >= 1 && tempGeneHolder.alleles[0].abbreviation === "Ni2" ? true : false


  tempGeneHolder = mainGenome.filter(el => el.name === "black pigment")[0]
  const blackPigPossible = tempGeneHolder.alleles[0].abbreviation === "M" ? true : false

  tempGeneHolder = mainGenome.filter(el => el.name === "red pigment")[0]
  const redPigPossible = tempGeneHolder.alleles[0].abbreviation === "E" ? true : false

  tempGeneHolder = mainGenome.filter(el => el.name === "yellow pigment")[0]
  const yellowPigPossible = tempGeneHolder.alleles[0].abbreviation === "X" ? true : false

  tempGeneHolder = mainGenome.filter(el => el.name === "blue pigment")[0]
  const bluePigPossible = tempGeneHolder.alleles[0].abbreviation === "G" ? true : false


  tempGeneHolder = mainGenome.filter(el => el.name === "albino 1")[0]
  let albino = tempGeneHolder.alleles[0].abbreviation === "a1" ? true : false
  if(!albino){
    tempGeneHolder = mainGenome.filter(el => el.name === "albino 2")[0]
    albino = tempGeneHolder.alleles[0].abbreviation === "a2" ? true : false
  }


  //NOTE TO SELF: DEFAULT_ variables need to be moved to the top of the file
  const DEFAULT_GUPPY_BODY_LENGTH = 90
  const DEFAULT_GUPPY_BODY_THICKNESS = 25
  const DEFAULT_GUPPY_TAIL_LENGTH = 0
  const DEFAULT_GUPPY_TAIL_RADIUS = 25
  // 100% of pi
  const DEFAULT_GUPPY_TAIL_ANGLE = 100
  const DEFAULT_TUX_TOP_LENGTH = 55
  const DEFAULT_TUX_LOW_LENGTH = -10
 
  let bodyLength = DEFAULT_GUPPY_BODY_LENGTH + varInBodyLength
  let bodyThickness = DEFAULT_GUPPY_BODY_THICKNESS + varInBodyThickness
  let tailLength = isMale? DEFAULT_GUPPY_TAIL_LENGTH + varInTailLength : 0
  let tailRadius = DEFAULT_GUPPY_TAIL_RADIUS + varInTailRadius
  let tailAngle = DEFAULT_GUPPY_TAIL_ANGLE + varInTailAngle
  let tuxTopLength = DEFAULT_TUX_TOP_LENGTH + varInTuxTopLength
  let tuxLowLength = DEFAULT_TUX_LOW_LENGTH + varInTuxLowLength

  if(!isMale){
    bodyLength += 10
    tuxTopLength -= 15
  }

  const totalFishLength = bodyLength + tailRadius + tailLength

  let headPoint = new Point((canvas.width/2) - (totalFishLength/2), (canvas.height/2) - (bodyThickness/2))
  let tailBaseBottomPoint = new Point(headPoint.x + bodyLength, headPoint.y + bodyThickness)
  let tailBaseTopPoint = new Point(headPoint.x + bodyLength, headPoint.y)
  let stomachPoint1 = new Point(headPoint.x + (bodyLength / 5), tailBaseBottomPoint.y + 6)
  let stomachPoint2
  let stomachPoint3
  if (!isMale){
    stomachPoint1.y += 4
    stomachPoint2 = new Point(stomachPoint1.x + (bodyLength / 3), stomachPoint1.y)
    stomachPoint3 = new Point(stomachPoint2.x + (bodyLength / 8), headPoint.y + bodyThickness)
  }
  let eyePoint = new Point(headPoint.x + 14, headPoint.y + 6)

  function createFinGradient(){

    const ctx = canvas.getContext("2d"); 

    const gradient = ctx.createRadialGradient(0, 105, 75, 70, 62, 160);

    let step1Num = 0.1 
    let step1Pig = 'red'
    let step2Num = 0.4
    let step2Pig = 'yellow'
    let step3Num = 0.5
    let step3Pig = 'yellow'
    let step4Num = 0.8
    let step4Pig = 'red'

    if(step1Pig === 'red' && redPigPossible){
      gradient.addColorStop(step1Num, redPigmentColor);
    } else if (step1Pig === 'yellow' && yellowPigPossible) {
      gradient.addColorStop(step1Num, yellowPigmentColor)
    } else if (step1Pig === 'blue' && bluePigPossible){
      gradient.addColorStop(step1Num, yellowPigmentColor)
    }
    if(step2Pig === 'red' && redPigPossible){
      gradient.addColorStop(step2Num, redPigmentColor);
    } else if (step2Pig === 'yellow' && yellowPigPossible) {
      gradient.addColorStop(step2Num, yellowPigmentColor)
    } else if (step2Pig === 'blue' && bluePigPossible){
      gradient.addColorStop(step2Num, yellowPigmentColor)
    }
    if(step3Pig === 'red' && redPigPossible){
      gradient.addColorStop(step3Num, redPigmentColor);
    } else if (step3Pig === 'yellow' && yellowPigPossible) {
      gradient.addColorStop(step3Num, yellowPigmentColor)
    } else if (step3Pig === 'blue' && bluePigPossible){
      gradient.addColorStop(step3Num, yellowPigmentColor)
    }
    if(step4Pig === 'red' && redPigPossible){
      gradient.addColorStop(step4Num, redPigmentColor);
    } else if (step4Pig === 'yellow' && yellowPigPossible) {
      gradient.addColorStop(step4Num, yellowPigmentColor)
    } else if (step4Pig === 'blue' && bluePigPossible){
      gradient.addColorStop(step4Num, yellowPigmentColor)
    }

    return gradient;
  }

/**
 * Given two points and a x-coordinate, this 
 * function will find the y-coordinate that 
 * corresponds to the x-coordinate on the line
 * that connects the two points.
 * @param {number} x - The x-coordinate whose corresponding y-coordinate you are looking for.
 * @param {Point} point1 - The first point.
 * @param {Point} point2  - The second point.
 * @returns {number} The y-coordinate.
 */
  function getYCoorBetweenTwoPoints(x, point1, point2){
    const slope = (point2.y - point1.y) / (point2.x - point1.x)
    const yIntercept = point1.y - (slope * point1.x)
    return slope * x + yIntercept
  }


  function drawTux(){

    const ctx = canvas.getContext("2d");

    if (tuxTopLength > 100){
      tuxTopLength = 100
    } else if (tuxTopLength < 0){
      tuxTopLength = 0
    }

    let frontTopPointOfTux = new Point(
      tailBaseTopPoint.x - ((tailBaseTopPoint.x  - headPoint.x) * (tuxTopLength * 0.01)),
      tailBaseTopPoint.y
    )
    let frontBottomPointOfTux = new Point()

    if (!isMale){
      // Female
      frontBottomPointOfTux.x = frontTopPointOfTux.x - tuxLowLength
      frontBottomPointOfTux.y = tailBaseBottomPoint.y

      // Stops the lines from going out of bounds
      frontBottomPointOfTux.x < stomachPoint3.x ? frontBottomPointOfTux.x = stomachPoint3.x : null
      frontBottomPointOfTux.x > tailBaseBottomPoint.x ? frontBottomPointOfTux.x = tailBaseBottomPoint.x : null
    } else {
      // Male
      frontBottomPointOfTux.x = (frontTopPointOfTux.x - tuxLowLength) < stomachPoint1.x ? stomachPoint1.x : (frontTopPointOfTux.x - tuxLowLength)
      frontBottomPointOfTux.y = getYCoorBetweenTwoPoints(frontBottomPointOfTux.x, tailBaseBottomPoint, stomachPoint1)
    }

    ctx.beginPath()
    // top left
    ctx.moveTo(frontTopPointOfTux.x, frontTopPointOfTux.y)
    // top right
    ctx.lineTo(tailBaseTopPoint.x, tailBaseTopPoint.y)
    // arch drawn to bottom right
    makeArchBetweenPoints(tailBaseTopPoint.x, tailBaseTopPoint.y, (tailBaseBottomPoint.x - 7), ((tailBaseTopPoint.y + tailBaseBottomPoint.y) / 2) , tailBaseBottomPoint.x, tailBaseBottomPoint.y, ctx)
    // Bottom left
    ctx.lineTo(frontBottomPointOfTux.x, frontBottomPointOfTux.y)
    ctx.closePath()

    ctx.fillStyle = "#202020"
    ctx.fill()
  }


  function drawBody(color, stroke = true) {
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(headPoint.x, headPoint.y);
      ctx.lineTo(stomachPoint1.x, stomachPoint1.y); 
      if (!isMale){
        ctx.lineTo(stomachPoint2.x, stomachPoint2.y); 
        ctx.lineTo(stomachPoint3.x, stomachPoint3.y); 
      }
      ctx.lineTo(tailBaseBottomPoint.x, tailBaseBottomPoint.y);
      makeArchBetweenPoints(tailBaseTopPoint.x, tailBaseTopPoint.y, (tailBaseBottomPoint.x - 7), ((tailBaseTopPoint.y + tailBaseBottomPoint.y) / 2) , tailBaseBottomPoint.x, tailBaseBottomPoint.y, ctx)
      ctx.lineTo(tailBaseTopPoint.x, tailBaseTopPoint.y); 
      ctx.closePath()

      if(stroke){
        defaultStroke(ctx)
      }
      ctx.fillStyle = color
      ctx.fill();
    }
  }

  function drawTail(fillStyle, stroke = true) {
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");


      // Picks the point at the ends of the fish's body
      // that the tail radiates out from.
      let centerPointOfTail = new Point(
        (tailBaseTopPoint.x - 10) + tailRadius,
        (tailBaseBottomPoint.y + tailBaseTopPoint.y) / 2
      )

      // Draws the the arch that the tails forms as it very
      // first leaves the body. The point where the arch
      // stops is also returned.
      let topEndOfTailBaseCurve = drawAndGetTailBaseCurve(ctx, true, centerPointOfTail)
      let bottomEndOfTailBaseCurve = drawAndGetTailBaseCurve(ctx, false, centerPointOfTail)

      // Gets the points of the outer top and bottom edge 
      // of the tail.
      let topFarEndOfTail = getFarEndOfTail(ctx, true, topEndOfTailBaseCurve, centerPointOfTail)
      let bottomFarEndOfTail = getFarEndOfTail(ctx, false, bottomEndOfTailBaseCurve, centerPointOfTail)

      // Starting from the end of the top arch, the tail is drawn top to
      // bottom.
      ctx.moveTo(topEndOfTailBaseCurve.x, topEndOfTailBaseCurve.y)
      ctx.lineTo(topFarEndOfTail.x, topFarEndOfTail.y)
      makeArchBetweenPoints(topFarEndOfTail.x, topFarEndOfTail.y, centerPointOfTail.x, centerPointOfTail.y, bottomFarEndOfTail.x, bottomFarEndOfTail.y, ctx)
      ctx.lineTo(bottomFarEndOfTail.x, bottomFarEndOfTail.y)
      ctx.lineTo(bottomEndOfTailBaseCurve.x, bottomEndOfTailBaseCurve.y)
      ctx.lineTo(centerPointOfTail.x, centerPointOfTail.y)

 
      ctx.closePath()

      if (stroke){
        if(rose){
          defaultStroke(ctx, true)
        } else {
          defaultStroke(ctx)
        }
      }

      ctx.fillStyle = fillStyle
      ctx.fill()       
    }
  }

  /**
   * Finds out what outermost points of the tail are. Works
   * for both top and bottom points.
   * @param ctx 
   * @param {boolean} topOfTail - True if top of tail, false if bottom.
   * @param {Point} endTailAnglePoint - This is where the tail arch going out from the body ends. 
   * @param {Point} centerPointOfTail - The point on the fish's body where the tail radiates out from.
   * @returns {Point} - The outermost point.
   */
  function getFarEndOfTail(ctx, topOfTail, endTailAnglePoint, centerPointOfTail){

    let endAngleOfTailBase

    if(topOfTail){
      endAngleOfTailBase =  Math.PI + ( (Math.PI / 2) * (tailAngle * 0.01))  
    } else {
      let fullQuarterEndingAngle = ((Math.PI) / 2)
      endAngleOfTailBase = fullQuarterEndingAngle - ((fullQuarterEndingAngle * (tailAngle * 0.01)) - fullQuarterEndingAngle)
    }

      ctx.moveTo(endTailAnglePoint.x, endTailAnglePoint.y)

      // This is a point right next to endTailAnglePoint used just for calculating the slope.
      let justBeforeEndPoint =  new Point (
        centerPointOfTail.x + tailRadius * Math.cos( endAngleOfTailBase - 0.01), centerPointOfTail.y + tailRadius * Math.sin( endAngleOfTailBase - 0.01)
      )

      let slope  = (endTailAnglePoint.y - justBeforeEndPoint.y) / (endTailAnglePoint.x - justBeforeEndPoint.x)
      let changeInX = (tailLength) / Math.sqrt( (Math.pow(slope, 2) + 1) )
      let changeInY = Math.sqrt(Math.pow(tailLength, 2) - Math.pow(changeInX, 2))
      
      let endOfTailPoint = new Point(
        endTailAnglePoint.x + changeInX, endTailAnglePoint.y - changeInY * (topOfTail? 1 : -1)
      )

      return endOfTailPoint
  }

  /**
   * Draws either the upper or lower portion of the tail fin.
   * @param ctx
   * @param {boolean} topOfTail - True if drawing upper portion, false if drawing lower portion.
   * @param {Point} centerPointOfTail - The point that is the center of the circle that forms the partial arch around the base of the tail.
   */
  function drawAndGetTailBaseCurve(ctx, topOfTail, centerPointOfTail){

    let counterClockwise
    let endAngleOfTailBase
    
    if (topOfTail){
      counterClockwise = false
      fullQuarterEndingAngle = ((3 * Math.PI) / 2)
      endAngleOfTailBase =  Math.PI + ( (Math.PI / 2) * (tailAngle * 0.01)) //fullQuarterEndingAngle * (tailAngle * 0.01 ) 
    } else {
      counterClockwise = true
      let fullQuarterEndingAngle = ((Math.PI) / 2)
      endAngleOfTailBase = fullQuarterEndingAngle - ((fullQuarterEndingAngle * (tailAngle * 0.01)) - fullQuarterEndingAngle)
    } 

      ctx.moveTo(centerPointOfTail.x, centerPointOfTail.y)

      ctx.arc(centerPointOfTail.x, centerPointOfTail.y, tailRadius, Math.PI, endAngleOfTailBase, counterClockwise);

      let endTailAnglePoint = new Point(
        centerPointOfTail.x + tailRadius * Math.cos( endAngleOfTailBase), centerPointOfTail.y + tailRadius * Math.sin( endAngleOfTailBase)
      )

      return endTailAnglePoint

  }

  function drawEye(color) {
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
  
      ctx.beginPath();
      ctx.arc(eyePoint.x, eyePoint.y, 2.3, 0, 2 * Math.PI);
      
      defaultStroke(ctx)
      ctx.fillStyle = color
      ctx.fill();
    }
  }

  



  /////////////////////////////////////////////

  let rose = false  //    finDescription.includes("Rose") ? true : false
  let dumbo =     false  //  finDescription.includes("Dumbo") ? true : false
  let ribbon =   false  //   finDescription.includes("Ribbon") ? true : false
  let swordTail
  let roundSwordTail
  let lyreTail
  let pinTail
  let scarfTail
  let roundTail
  let spearTail
  let spadeTail

  if (isMale){
    swordTail =  false  // finDescription.includes("Swordtail") ? true : false
    roundSwordTail =  false  // finDescription.includes("Round Swordtail") ? true : false
    lyreTail =   false  // finDescription.includes("Lyretail") ? true : false
    pinTail =   false  //  finDescription.includes("Pintail") ? true : false
    scarfTail = false  //  finDescription.includes("Scarftail") ? true : false
    roundTail =  false  // finDescription.includes("Roundtail") ? true : false
    spearTail =  false  // finDescription.includes("Speartail") ? true : false
    spadeTail =  false  // finDescription.includes("Spadetail") ? true : false
  }


  let baseColor = BASE_COLORS.Red
  let blackPigment = true
  let finColor = baseColor
  let bodyColor
  if (isMale){
    bodyColor = baseColor
  } else {
    if(blackPigment){
      bodyColor = BASE_COLORS.Brown
    } else {
      bodyColor = BASE_COLORS.Tranparent
    }
  }
  let tux = false
  let eyeColor = baseColor===BASE_COLORS.Albino? ALBINO_EYE_COLOR : REGULAR_EYE_COLOR


  let leopard = false
  let mosaic = true
  let grass = false
  let lace = false 
  let pattern 
  if(leopard || mosaic || grass || lace){
    pattern = true
  } else {
    pattern = false
  }
  // contains the actual canvas pattern
  let markingPattern



  let lengthOfTail = 50//80
  let lengthOfBody = 70
  let widthOfTail = 40 //70

  let bluePigmentPresent = true
  let blackPigmentPresent = true
  let redPigmentPresent = true
  let yellowPigmentPresent = true
  let bluePigmentColor = BASE_COLORS.Blue
  let blackPigmentColor = BASE_COLORS.Black
  let redPigmentColor = BASE_COLORS.Red
  let yellowPigmentColor = BASE_COLORS.Yellow

  if(!isMale){
    lengthOfTail = 50
    widthOfTail = 25
  }
  if(roundSwordTail){
    lengthOfTail = 40
    widthOfTail = 30
  }
  if(scarfTail){
    widthOfTail = 30
    lengthOfTail = 90
  }
  let center = ((canvas.width ) - (lengthOfBody + lengthOfTail))
  let xBaseOfTiangleTail = center -10

  if(!isMale){
    xBaseOfTiangleTail = center - 25
  }

  let xbaseOfBody = center + 5 
  let thicknessOfbody = 15
  let yMiddleOfBody = canvas.height/2 



  if(!pattern){
    drawGuppy(false)
  } else {
    let imageName 
    if(leopard){
      imageName = '/images/patterns/leo1-best.png'
    } else if (mosaic){
      imageName = '/images/patterns/mosaic4-best.png'
    } else if (grass){
      imageName = '/images/patterns/grass1-best.png'
    } else {
      imageName = '/images/patterns/lace1-best.png'
    }
    let markingPatternImg = new Image;
    markingPatternImg.src = imageName;
    markingPatternImg.onload = function() {
      
      markingPattern = canvas.getContext("2d").createPattern(markingPatternImg, 'repeat');

      drawGuppy(true)

    }
  }
    


    function drawGuppy(pattern){
      
      drawTail(createFinGradient(), true)

      if(pattern) {
        drawTail(markingPattern, false)
      }

      if(!isMale){
        drawDorsalFin(createFinGradient())
        if(pattern){
          drawDorsalFin(markingPattern, false)
        }
      }

      let bodyColor
      if (isMale){
        bodyColor = createBodyGradient()
      } else {
        bodyColor = BASE_COLORS.Brown
      }
      drawBody(bodyColor, true)

      // if(tuxedo){
      //   if(isMale){
      //     drawBody(BASE_COLORS.Black, false )
      //   } else {
      //     drawBody(BASE_COLORS.Black, false)
      //   }
      // }
      if(tuxedo){
        drawTux()
      }

      if(isMale){
        drawDorsalFin(createFinGradient())
        if(pattern){
          drawDorsalFin(markingPattern, false)
        }
      }
      
      if(dumbo){
        let color = blackPigment ? BASE_COLORS.Black : BASE_COLORS.Tranparent
        drawDumbo(color)
      }

      if(ribbon){
        drawRinbbon(finColor)
      }

      drawEye(eyeColor)

  }


  // function createFinGradient(){

  //   const ctx = canvas.getContext("2d"); 

  //   // Create a radial gradient
  //   // The inner circle is at x=110, y=90, with radius=30
  //   // The outer circle is at x=100, y=100, with radius=70
  //   const gradient = ctx.createRadialGradient(0, 105, 75, 70, 62, 160);


  //   gradient.addColorStop(.1, redPigmentColor);
  //   gradient.addColorStop(.4, yellowPigmentColor);
  //   gradient.addColorStop(.5, yellowPigmentColor);
  //   gradient.addColorStop(.8, redPigmentColor);

  //   return gradient;
  // }
  function createBodyGradient(){

    const ctx = canvas.getContext("2d"); 

    // Create a radial gradient
    // The inner circle is at x=110, y=90, with radius=30
    // The outer circle is at x=100, y=100, with radius=70
    const gradient = ctx.createLinearGradient(20, 0, 220, 0);

    // Add three color stops
    
    gradient.addColorStop(.13, BASE_COLORS.Brown);
    gradient.addColorStop(.35, yellowPigmentColor);
    gradient.addColorStop(.7, redPigmentColor);
    gradient.addColorStop(.8, yellowPigmentColor);
    gradient.addColorStop(.9, blackPigmentColor);

    return gradient;
  }

  // function drawTail(fillStyle, stroke = true) {
  //     if (canvas.getContext) {
  //       const ctx = canvas.getContext("2d");

  //       let yMiddleOfTail = canvas.height/2
  //       // widthOfTail
  //       //xBaseOfTiangleTail
  //       let xBaseOfRoundTail = xBaseOfTiangleTail + 38
  //       let tailRadius = 25
  //       //lengthOfTail 

  //       // coordinates for the 3 points in triangular tails: 
  //       // (point 2 is the base)
  //       let triPoint1x = xBaseOfTiangleTail + lengthOfTail
  //       let triPoint1y = yMiddleOfTail-widthOfTail
  //       let triPoint2x = xBaseOfTiangleTail
  //       let triPoint2y = yMiddleOfTail
  //       let triPoint3x = xBaseOfTiangleTail + lengthOfTail
  //       let triPoint3y = yMiddleOfTail + widthOfTail


  //       ctx.beginPath();
  //       if(roundTail){
  //         ctx.arc(xBaseOfRoundTail, yMiddleOfTail, tailRadius, 0, 2 * Math.PI);
  //       } else if (spearTail) {
  //         ctx.arc(xBaseOfRoundTail, yMiddleOfTail, tailRadius,Math.PI / 2, (3 * Math.PI) / 2);
  //         ctx.moveTo(xBaseOfRoundTail, yMiddleOfTail + tailRadius ) ;
  //         ctx.lineTo(xBaseOfRoundTail + 40, canvas.height/2);
  //         ctx.lineTo(xBaseOfRoundTail, yMiddleOfTail - tailRadius ) ;
  //       } else if (spadeTail){
  //         ctx.arc(xBaseOfRoundTail, yMiddleOfTail, tailRadius,Math.PI / 2, (3 * Math.PI) / 2);
  //         ctx.moveTo(xBaseOfRoundTail, yMiddleOfTail + tailRadius ) ;
  //         ctx.lineTo(xBaseOfRoundTail + 12, yMiddleOfTail + tailRadius);
  //         ctx.lineTo(xBaseOfRoundTail + 35, canvas.height/2);
  //         ctx.lineTo(xBaseOfRoundTail + 12, yMiddleOfTail - tailRadius);
  //         ctx.lineTo(xBaseOfRoundTail, yMiddleOfTail - tailRadius ) ;
  //       } else if (pinTail){
          
  //         ctx.arc(xBaseOfRoundTail, yMiddleOfTail, tailRadius,Math.PI / 2, (3 * Math.PI) / 2);
  //         ctx.moveTo(xBaseOfRoundTail, yMiddleOfTail + tailRadius ) ;
  //         ctx.lineTo(xBaseOfRoundTail + 18, canvas.height/2 + 5);
  //         ctx.lineTo(xBaseOfRoundTail + 47, canvas.height/2);
  //         ctx.lineTo(xBaseOfRoundTail + 18, canvas.height/2 - 5);
  //         ctx.lineTo(xBaseOfRoundTail, yMiddleOfTail - tailRadius ) ;
  //       }        
  //       // tails that have a curve a the end
  //       else {
  //         if(scarfTail){
  //           tailRadius = 30
  //           ctx.arc(xBaseOfRoundTail + 2, yMiddleOfTail, tailRadius, Math.PI / 2, (3 * Math.PI) / 2);
  //           ctx.moveTo(xBaseOfRoundTail + 2, yMiddleOfTail + tailRadius ) ;
  
  //         } else {
  //           ctx.moveTo(triPoint2x, triPoint2y); //middle
  //         }
  //         ctx.lineTo(triPoint3x , triPoint3y); //bottom
  //         if(swordTail){
  //           ctx.lineTo(xBaseOfTiangleTail + 30, yMiddleOfTail );
  //         } else if(lyreTail){
  //           let widthOfTip = 20
  //           ctx.lineTo( xBaseOfTiangleTail + lengthOfTail , yMiddleOfTail + widthOfTail - widthOfTip); 
  //           ctx.lineTo( xBaseOfTiangleTail + 30, yMiddleOfTail );
  //           ctx.lineTo( xBaseOfTiangleTail + lengthOfTail , yMiddleOfTail-widthOfTail  + widthOfTip); //top
    
  //         } else {
  //            makeArchBetweenPoints(triPoint1x,triPoint1y,triPoint2x,triPoint2y,triPoint3x,triPoint3y, ctx)
  //         } 
  
  //         ctx.lineTo(triPoint1x, triPoint1y); //top
  //         if(scarfTail){
  //           ctx.lineTo(xBaseOfRoundTail + 2, yMiddleOfTail - tailRadius ) ;
  //         }
  //       } 
  //       ctx.closePath()

  //       if (stroke){
  //         if(rose){
  //           defaultStroke(ctx, true)
  //         } else {
  //           defaultStroke(ctx)
  //         }
  //       }
        

  //       ctx.fillStyle = fillStyle
  //       ctx.fill();        
  //     }
  //   }

    // points 1 and 3 are the end points. point 2 is the base
    // please refer to the link below:
    // https://stackoverflow.com/questions/30624842/draw-arc-on-canvas-from-two-x-y-points-and-a-center-x-y-point
    function makeArchBetweenPoints(p1x, p1y, p2x, p2y, p3x, p3y, ctx){

      let startAngle = Math.atan2(p1y - p2y, p1x - p2x)
      let endAngle   = Math.atan2(p3y - p2y, p3x - p2x)

      let diffX = p1x - p2x
      let diffY = p1y - p2y
      let radius = Math.abs(Math.sqrt(diffX * diffX + diffY * diffY));

      ctx.arc(p2x, p2y, radius, startAngle, endAngle);
    }


    function defaultStroke(ctx, rose = false){
      if(rose){
        ctx.lineWidth = 7;
      } else{
        ctx.lineWidth = 3;
      }
      
      ctx.strokeStyle = "black"
      ctx.stroke()
    }
    

    // function drawBody(color, stroke = true, pushTopX = 0, pushBottomX = 0) {
    //   if (canvas.getContext) {
    //     const ctx = canvas.getContext("2d");

        
    //     ctx.beginPath();
    //     ctx.moveTo(xbaseOfBody , yMiddleOfBody - thicknessOfbody + 2); //top right
    //     ctx.lineTo(xbaseOfBody, yMiddleOfBody + thicknessOfbody - 4); //bottom right
    //     ctx.lineTo(xbaseOfBody - lengthOfBody  + pushBottomX, yMiddleOfBody + thicknessOfbody ); // bottom left
    //     ctx.lineTo(xbaseOfBody - lengthOfBody - 20 + pushTopX, yMiddleOfBody - thicknessOfbody ); //top left
    //     ctx.closePath()

    //     if(stroke){
    //       defaultStroke(ctx)
    //     }
        
    //     ctx.fillStyle = color
    //     ctx.fill();
    //   }
    // }


    function drawDorsalFin(color, stroke = true) {
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        let xFront = xbaseOfBody - 50
        let yTop = canvas.height/2 - 25
    
        ctx.beginPath();
        ctx.moveTo(xFront, yTop + 10); 
        ctx.lineTo(xFront + 20, yTop);
        ctx.lineTo(xFront + 40, yTop + 30);
        ctx.closePath()

        if (stroke){
          if(rose){
            defaultStroke(ctx, true)
          } else {
            defaultStroke(ctx)
          }
        }

        ctx.fillStyle = color
        ctx.fill();
      }
    }

    // function drawEye(color) {
    //   if (canvas.getContext) {
    //     const ctx = canvas.getContext("2d");
    
    //     ctx.beginPath();
    //     ctx.arc(xbaseOfBody - 70, canvas.height/2 - 8, 2.3, 0, 2 * Math.PI);
        
    //       defaultStroke(ctx)

    //     ctx.fillStyle = color
    //     ctx.fill();
    //   }
    // }


  function drawDumbo(color) {
      if (canvas.getContext) {
          const ctx = canvas.getContext("2d");
    
          ctx.beginPath();
          ctx.arc(xbaseOfBody - 61, canvas.height/2 + 15, 12, 0, 5 * Math.PI);
        
          defaultStroke(ctx)

          ctx.fillStyle = color


          ctx.fill();

      }
  }



  function drawRinbbon(color) {
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        let xTop = xbaseOfBody - 50
        let yTop = canvas.height/2
        let length = 30

        
          ctx.beginPath();    
          ctx.arc(xTop + 59, yTop, 49, 1.6, .9 * Math.PI);
    
      ctx.lineWidth = 3;
      ctx.strokeStyle = color
      ctx.stroke()

    }
  }
}




