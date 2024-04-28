/**
 * @deprecated
 */

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


let canvasArr = document.querySelectorAll('canvas')

for (let i = 0; i < canvasArr.length; i++){

  let canvas = canvasArr[i];

  canvas.width = 250;   
  canvas.height = 250;


  let fishDiv = canvasArr[i].parentNode.parentNode
  let sex = fishDiv.querySelector('.sex').getAttribute("aria-label")
  let mainGenome =  JSON.parse(fishDiv.dataset.fishmaingenome)
  console.log(mainGenome)
  //let finDescription = canvasArr[i].parentNode.parentNode.querySelector('.fin-description').innerText



  let isMale = sex === "male" ? true : false

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

      if(tux){
        if(isMale){
          drawBody(BASE_COLORS.Black, false,  35, 20)
        } else {
          drawBody(BASE_COLORS.Black, false,  70, 55)
        }
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


  function createFinGradient(){

    const ctx = canvas.getContext("2d"); 

    // Create a radial gradient
    // The inner circle is at x=110, y=90, with radius=30
    // The outer circle is at x=100, y=100, with radius=70
    const gradient = ctx.createRadialGradient(0, 105, 75, 70, 62, 160);


    gradient.addColorStop(.1, redPigmentColor);
    gradient.addColorStop(.4, yellowPigmentColor);
    gradient.addColorStop(.5, yellowPigmentColor);
    gradient.addColorStop(.8, redPigmentColor);

    return gradient;
  }
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

  function drawTail(fillStyle, stroke = true) {
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        let yMiddleOfTail = canvas.height/2
        // widthOfTail
        //xBaseOfTiangleTail
        let xBaseOfRoundTail = xBaseOfTiangleTail + 38
        let tailRadius = 25
        //lengthOfTail 

        // coordinates for the 3 points in triangular tails: 
        // (point 2 is the base)
        let triPoint1x = xBaseOfTiangleTail + lengthOfTail
        let triPoint1y = yMiddleOfTail-widthOfTail
        let triPoint2x = xBaseOfTiangleTail
        let triPoint2y = yMiddleOfTail
        let triPoint3x = xBaseOfTiangleTail + lengthOfTail
        let triPoint3y = yMiddleOfTail + widthOfTail


        ctx.beginPath();
        if(roundTail){
          ctx.arc(xBaseOfRoundTail, yMiddleOfTail, tailRadius, 0, 2 * Math.PI);
        } else if (spearTail) {
          ctx.arc(xBaseOfRoundTail, yMiddleOfTail, tailRadius,Math.PI / 2, (3 * Math.PI) / 2);
          ctx.moveTo(xBaseOfRoundTail, yMiddleOfTail + tailRadius ) ;
          ctx.lineTo(xBaseOfRoundTail + 40, canvas.height/2);
          ctx.lineTo(xBaseOfRoundTail, yMiddleOfTail - tailRadius ) ;
        } else if (spadeTail){
          ctx.arc(xBaseOfRoundTail, yMiddleOfTail, tailRadius,Math.PI / 2, (3 * Math.PI) / 2);
          ctx.moveTo(xBaseOfRoundTail, yMiddleOfTail + tailRadius ) ;
          ctx.lineTo(xBaseOfRoundTail + 12, yMiddleOfTail + tailRadius);
          ctx.lineTo(xBaseOfRoundTail + 35, canvas.height/2);
          ctx.lineTo(xBaseOfRoundTail + 12, yMiddleOfTail - tailRadius);
          ctx.lineTo(xBaseOfRoundTail, yMiddleOfTail - tailRadius ) ;
        } else if (pinTail){
          
          ctx.arc(xBaseOfRoundTail, yMiddleOfTail, tailRadius,Math.PI / 2, (3 * Math.PI) / 2);
          ctx.moveTo(xBaseOfRoundTail, yMiddleOfTail + tailRadius ) ;
          ctx.lineTo(xBaseOfRoundTail + 18, canvas.height/2 + 5);
          ctx.lineTo(xBaseOfRoundTail + 47, canvas.height/2);
          ctx.lineTo(xBaseOfRoundTail + 18, canvas.height/2 - 5);
          ctx.lineTo(xBaseOfRoundTail, yMiddleOfTail - tailRadius ) ;
        }        
        // tails that have a curve a the end
        else {
          if(scarfTail){
            tailRadius = 30
            ctx.arc(xBaseOfRoundTail + 2, yMiddleOfTail, tailRadius, Math.PI / 2, (3 * Math.PI) / 2);
            ctx.moveTo(xBaseOfRoundTail + 2, yMiddleOfTail + tailRadius ) ;
  
          } else {
            ctx.moveTo(triPoint2x, triPoint2y); //middle
          }
          ctx.lineTo(triPoint3x , triPoint3y); //bottom
          if(swordTail){
            ctx.lineTo(xBaseOfTiangleTail + 30, yMiddleOfTail );
          } else if(lyreTail){
            let widthOfTip = 20
            ctx.lineTo( xBaseOfTiangleTail + lengthOfTail , yMiddleOfTail + widthOfTail - widthOfTip); 
            ctx.lineTo( xBaseOfTiangleTail + 30, yMiddleOfTail );
            ctx.lineTo( xBaseOfTiangleTail + lengthOfTail , yMiddleOfTail-widthOfTail  + widthOfTip); //top
    
          } else {
             makeArchBetweenPoints(triPoint1x,triPoint1y,triPoint2x,triPoint2y,triPoint3x,triPoint3y, ctx)
          } 
  
          ctx.lineTo(triPoint1x, triPoint1y); //top
          if(scarfTail){
            ctx.lineTo(xBaseOfRoundTail + 2, yMiddleOfTail - tailRadius ) ;
          }
        } 
        ctx.closePath()

        if (stroke){
          if(rose){
            defaultStroke(ctx, true)
          } else {
            defaultStroke(ctx)
          }
        }
        

        ctx.fillStyle = fillStyle
        ctx.fill();        
      }
    }

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
    

    function drawBody(color, stroke = true, pushTopX = 0, pushBottomX = 0) {
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        
        ctx.beginPath();
        ctx.moveTo(xbaseOfBody , yMiddleOfBody - thicknessOfbody + 2); //top right
        ctx.lineTo(xbaseOfBody, yMiddleOfBody + thicknessOfbody - 4); //bottom right
        ctx.lineTo(xbaseOfBody - lengthOfBody  + pushBottomX, yMiddleOfBody + thicknessOfbody ); // bottom left
        ctx.lineTo(xbaseOfBody - lengthOfBody - 20 + pushTopX, yMiddleOfBody - thicknessOfbody ); //top left
        ctx.closePath()

        if(stroke){
          defaultStroke(ctx)
        }
        
        ctx.fillStyle = color
        ctx.fill();
      }
    }


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

    function drawEye(color) {
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
    
        ctx.beginPath();
        ctx.arc(xbaseOfBody - 70, canvas.height/2 - 8, 2.3, 0, 2 * Math.PI);
        
          defaultStroke(ctx)

        ctx.fillStyle = color
        ctx.fill();
      }
    }


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




