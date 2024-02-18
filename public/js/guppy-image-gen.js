const BASE_COLORS = {
	Red: "#E91C29",
	Black: "#191919",
	Albino: "#FDFCF7",
	Tranparent: "#FAF7EC",
  Yellow: "#E1F56F",
  Brown: "#AA9989"
}
const REGULAR_EYE_COLOR = "#4C4D4D"
const ALBINO_EYE_COLOR = "#E1688D"


let canvasArr = document.querySelectorAll('canvas')

for (let i = 0; i < canvasArr.length; i++){

  let canvas = canvasArr[i];

  canvas.width = 250;   
  canvas.height = 250;


  let sex = canvasArr[i].parentNode.querySelector('.sex').getAttribute("aria-label")
  let finDescription = canvasArr[i].parentNode.querySelector('.fin-description').innerText



  let isMale = sex === "male" ? true : false

  let rose =      finDescription.includes("Rose") ? true : false
  let dumbo =     finDescription.includes("Dumbo") ? true : false
  let ribbon =    finDescription.includes("Ribbon") ? true : false
  let swordTail
  let roundSwordTail
  let lyreTail
  let pinTail
  let scarfTail
  let roundTail
  let spearTail
  let spadeTail

  if (isMale){
    swordTail = finDescription.includes("Swordtail") ? true : false
    roundSwordTail = finDescription.includes("Round Swordtail") ? true : false
    lyreTail =  finDescription.includes("Lyretail") ? true : false
    pinTail =   finDescription.includes("Pintail") ? true : false
    scarfTail = finDescription.includes("Scarftail") ? true : false
    roundTail = finDescription.includes("Roundtail") ? true : false
    spearTail = finDescription.includes("Speartail") ? true : false
    spadeTail = finDescription.includes("Spadetail") ? true : false
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
  let tux = true
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
      
      drawTail(finColor, true)

      if(pattern) {
        drawTail(markingPattern, false)
      }

      if(!isMale){
        drawDorsalFin(finColor)
        if(pattern){
          drawDorsalFin(markingPattern, false)
        }
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
        drawDorsalFin(finColor)
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




