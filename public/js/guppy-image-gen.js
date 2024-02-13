const baseColors = {
	Red: "#E91C29",
	Black: "#191919",
	Albino: "#FDFCF7",
	Tranparent: "#FAF7EC",
  Yellow: "#E1F56F",
  Brown: "#AA9989"
}
const regularEyeColor = "#4C4D4D"
const albinoEyeColor = "#E1688D"


let canvasArr = document.querySelectorAll('canvas')

for (let i = 0; i < canvasArr.length; i++){

  let sex = canvasArr[i].parentNode.querySelector('.sex').getAttribute("aria-label")
  let finDescription = canvasArr[i].parentNode.querySelector('.fin-description').innerText

  console.log(finDescription)




  let canvas = canvasArr[i];


  let isMale = sex === "male" ? true : false

  let swordTail = finDescription.includes("Swordtail") ? true : false
  let lyreTail = finDescription.includes("Lyretail") ? true : false
  let rose = finDescription.includes("Rose") ? true : false
  let scarfTail = finDescription.includes("Scarftail") ? true : false
  let roundTail = finDescription.includes("Roundtail") ? true : false
  let spearTail = finDescription.includes("Speartail") ? true : false
  let spadeTail = finDescription.includes("Spadetail") ? true : false
  let pinTail = finDescription.includes("Pintail") ? true : false
  let dumbo = finDescription.includes("Dumbo") ? true : false
  let ribbon = finDescription.includes("Ribbon") ? true : false

  let baseColor = baseColors.Red
  let blackPigment = true
  let finColor = baseColor
  let bodyColor
  if (isMale){
    bodyColor = baseColor
  } else {
    if(blackPigment){
      bodyColor = baseColors.Brown
    } else {
      bodyColor = baseColors.Tranparent
    }
  }
  let tux = true
  let eyeColor = baseColor===baseColors.Albino? albinoEyeColor : regularEyeColor


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

  canvas.width = 250;   
  canvas.height = 250;

  let xOffset = 0 
  let yOffset = 0

  let lengthOfTail = 50//80
  let lengthOfBody = 70
  let widthOfTail = 40//70

  if(scarfTail){
    widthOfTail = 30
    lengthOfTail = 90
  }
  let center = ((canvas.width ) - (lengthOfBody + lengthOfTail))

  let xbaseOfBody = center + 5
  let thicknessOfbody = 15
  let yMiddleOfBody = canvas.height/2

  let scale = 1

  if(!pattern){
    drawGuppy(false)
  }else {
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
          drawBody(baseColors.Black, false,  35, 20)
        } else {
          drawBody(baseColors.Black, false,  70, 55)
        }
      }
      
      if(isMale){
        drawDorsalFin(finColor)
        if(pattern){
          drawDorsalFin(markingPattern, false)
        }
      }
      
      if(dumbo){
        let color = blackPigment ? baseColors.Black : baseColors.Tranparent
        drawDumbo(color)
      }

      if(ribbon){
        drawRinbbon(finColor)
      }

      drawEye(eyeColor)

  }

    // if(pattern){
    //   let imageName 
    //   if(leopard){
    //     imageName = '/images/patterns/leo1-best.png'
    //   } else if (mosaic){
    //     imageName = '/images/patterns/mosaic4-best.png'
    //   } else if (grass){
    //     imageName = '/images/patterns/grass1-best.png'
    //   } else {
    //     imageName = '/images/patterns/lace1-best.png'
    //   }
    //   let tailPatternImg = new Image;
    //   tailPatternImg.src = imageName;
    //   tailPatternImg.onload = function() {
        
    //     let tailPattern = canvas.getContext("2d").createPattern(tailPatternImg, 'repeat');
    //     drawTail(tailPattern, false)
    //     drawDorsalFin(tailPattern, false)
      
      
      
      
      
    //   }
    // }






  function drawTail(fillStyle, stroke = true) {
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        let yMiddleOfTail = canvas.height/2
        // widthOfTail
        let xBaseOfTiangleTail = center -10
        let xBaseOfRoundTail = xBaseOfTiangleTail + 38
        let tailRadius = 25
        //lengthOfTail 

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
            ctx.moveTo((xOffset + xBaseOfTiangleTail) * scale, (yOffset + yMiddleOfTail) * scale); //middle
          }
          ctx.lineTo((xOffset + (xBaseOfTiangleTail + lengthOfTail)) * scale, (yOffset + yMiddleOfTail+widthOfTail) * scale); //bottom
          if(swordTail){
            ctx.lineTo((xOffset + xBaseOfTiangleTail + 30) * scale, (yOffset + yMiddleOfTail) * scale);
          } else if(lyreTail){
            let widthOfTip = 20
            ctx.lineTo((xOffset + (xBaseOfTiangleTail + lengthOfTail)) * scale, (yOffset + yMiddleOfTail+widthOfTail - widthOfTip) * scale); 
            ctx.lineTo((xOffset + xBaseOfTiangleTail + 30) * scale, (yOffset + yMiddleOfTail) * scale);
            ctx.lineTo((xOffset + (xBaseOfTiangleTail + lengthOfTail)) * scale, (yOffset + yMiddleOfTail-widthOfTail  + widthOfTip) * scale); //top
    
          } else {
        // https://stackoverflow.com/questions/30624842/draw-arc-on-canvas-from-two-x-y-points-and-a-center-x-y-point
        let startAngle = Math.atan2((yOffset + yMiddleOfTail-widthOfTail) - (yOffset + yMiddleOfTail), (xBaseOfTiangleTail + lengthOfTail) - xBaseOfTiangleTail)
        let endAngle   = Math.atan2((yOffset + yMiddleOfTail+widthOfTail) - (yOffset + yMiddleOfTail), (xBaseOfTiangleTail + lengthOfTail) -  xBaseOfTiangleTail)
        let diffX = (xBaseOfTiangleTail + lengthOfTail)- xBaseOfTiangleTail
        let diffY = ( yMiddleOfTail-widthOfTail) - yMiddleOfTail
        let radius = Math.abs(Math.sqrt(diffX*diffX + diffY*diffY))
        ctx.arc(xBaseOfTiangleTail, yMiddleOfTail, radius, startAngle, endAngle);
  
          } 
  
          ctx.lineTo((xOffset + (xBaseOfTiangleTail + lengthOfTail)) * scale, (yOffset + yMiddleOfTail-widthOfTail) * scale); //top
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
    
        //lengthOfBody
        //thicknessOfbody 
        //xbaseOfBody 
        //yMiddleOfBody

        
        ctx.beginPath();
        ctx.moveTo((xOffset + xbaseOfBody) * scale, (yOffset + yMiddleOfBody - thicknessOfbody + 2) * scale); //top right
        ctx.lineTo((xOffset + xbaseOfBody) * scale, (yOffset + yMiddleOfBody + thicknessOfbody - 4) * scale); //bottom right
        ctx.lineTo((xOffset + xbaseOfBody - lengthOfBody  + pushBottomX) * scale, (yOffset + yMiddleOfBody + thicknessOfbody ) * scale); // bottom left
        ctx.lineTo((xOffset + xbaseOfBody - lengthOfBody - 20 + pushTopX) * scale, (yOffset + yMiddleOfBody - thicknessOfbody ) * scale); //top left
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
    
          // ctx.closePath()
          // ctx.moveTo(xTop+20, yTop)
          // ctx.beginPath()
          // ctx.arc(xTop+20, yTop, 40, 1.6, .8 * Math.PI);
    
      //   ctx.beginPath();
      //   ctx.moveTo(xTop, yTop); 
      //   ctx.lineTo(xTop, yTop + 20);
      //   ctx.lineTo(xTop +2, yTop + 20);
      //   ctx.lineTo(xTop +2, yTop);

      //   ctx.lineTo(xTop, yTop); 

      ctx.lineWidth = 3;
      ctx.strokeStyle = color
      ctx.stroke()

      //   ctx.fillStyle = baseColors.Yellow
      //   ctx.fill();
    }
  }
}




