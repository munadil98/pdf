$( "#draggable" ).draggable();

   var x1, x2, y1, y2, cx=[], cy=[], cx2, cy2, px=[], py=[], x1_temp, x2_temp, y1_temp, y2_temp;
    var xdeduct, ydeduct;  //to deduct default padding of element
    var i=0;
    var y=1;
    var color='black';
    var area=[];
    var index=0;
    var calibrate=1;
    var calvaluesqr;
    var areafixed;
    var calvalue;
    var totalArea=0;
    var cStepFinalFromcPush;
    var cStepAtArea=[];
    var measurement=0;

  jQuery.ajax({
    type: "POST",
    url: 'calvalue.php',
    success: function(data,status){
        
        console.log('calvalue:: '+calvalue);
        console.log('data:: '+data);
        calvalue=data;
        calvaluesqr=Math.pow(calvalue,2);
        console.log('calvalue:: '+calvalue);
        // if (1) {
          // $("#reCalibrate").hide();
          // $("#calibrate").show();
          // $("#caldiv").show();
          // console.log('if');

          $("#reCalibrate").show();
          $("#calibrate").hide();
          $("#caldiv").hide();
          // calvalue=data;
          // console.log('else');


        // }
        // else{
        //   $("#reCalibrate").show();
        //   $("#calibrate").hide();
        //   $("#caldiv").hide();
        //   calvalue=data;
        //   console.log('else');
        // }

    },
    error: function(data){
    }

  });    

//To remind user about re-calibration
  $("#upload").click(function(){
        // $( "#dialog" ).delay( 1800 ).dialog();
        alert("Application stores previous calibration. Click 'Calibrte' button to re-calibrate");
  });

     
    
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();
    }

    PDFJS.disableStream = true;


    var filedir=$("#filedir").val();

    console.log(filedir);

    PDFJS.getDocument(filedir).then(function(pdfFile) {
    
    
      
      // Do something with the PDF file stored in the `pdf` variable
        var pageNumber = 1;
        pdfFile.getPage(pageNumber).then(function(page) {


            // Do something with the page.
             var scale = 1;
            var viewport = page.getViewport(scale);
            // alert("test:"+viewport);

            
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');

            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            page.render(renderContext);


            
        });
    });


    //     Draw Line
    // ===================

    $("#red").click(function(){
        color='red';
    });

    $("#yellow").click(function(){
        color='yellow';
    });

    $("#blue").click(function(){
        color='blue';
    });

    $("#orange").click(function(){
        color='orange';
    });

    $("#green").click(function(){
        color='green';
    });

    $("#grey").click(function(){
        color='grey';
    });

    $("#pink").click(function(){
        color='pink';
    });

    $("#purple").click(function(){
        color='purple';
    });

    // Re-calibration

    $("#reCalibrate").click(function(){
       
        $("#reCalibrate").hide();
        $("#calibrate").show();
        $("#caldiv").show();
        calibrate=1;  //this assinged 1 is used to enter into if block of calibration below
        calvalue=1;
        $("#calibrate").text('Cali-Start');
      
        jQuery.ajax({
          type: "POST",
          url: 'calvalue.php',
          data: {destroy:1},
          success: function(data,status){
                // console.log("Data: " + data + "\nStatus: " + status);
          },
          error: function(data){
            // console.log('destroy: '+data);
          }

        });  
    });


    // Calibration
    
    $("#calibrate").click(function(){

      if (calibrate==1) {
        calibrate=0; //to detect callibration starts
        $("#calibrate").text('Cali-Stop');
      }
      else{
          calibrate=2 //to detect calibration stops
          $("#calibrate").hide();
          $("#caldiv").hide();
          $("#reCalibrate").show();

            d = Math.sqrt( (cx[0]-cx[1])*(cx[0]-cx[1])+(cy[0]-cy[1])*(cy[0]-cy[1]) );
            calvalue=$("#calvalue").val();
            calvalue=calvalue/d;
            calvaluesqr=Math.pow(calvalue,2);
            console.log('d: : '+d);
            console.log('calvaluesqr: '+calvaluesqr);
            // console.log('d(stop): '+d);

            // jQuery.ajax({
            //   type: "POST",
            //   url: 'calvalue.php',
            //   data: {calvalue:calvalue},
            //   success: function(data){
            //     $("#test").text("test");
            //     }              
            // }); 

          // Store new calvalue on calvalue.php file's session variable
          jQuery.ajax({
            type: "POST",
            url: 'calvalue.php',
            data: {calvalue:calvalue},
            success: function(data,status){
                calvalue=data;
                // console.log('calvalue='+calvalue);
                  // console.log("Data: " + data + "\nStatus: " + status);
                },
            error: function(data){
              // console.log(data);
            }

          });    


          // var calvalue=$("#takeValue").delay(100).text();
          
      } //else


    }); //    $("#calibrate").click(function(){




    // console.log('i: '+i);
    //   if (calibrate==0) {
    //     if (i==2) {
    //     d = Math.sqrt( (cx[0]-cx[1])*(cx[0]-cx[1])+(cy[0]-cy[1])*(cy[0]-cy[1]) );
        
    //     console.log('d(start): '+d);
      
    //     x1_temp=x1;
    //     x2_temp=x2;
    //     y1_temp=y1;
    //     y2_temp=y2;
    //     x1=undefined;
    //     x2=undefined;
    //     y1=undefined;
    //     y2=undefined;
    //     i=0;
    //     }

    //   }

    //   if (calibrate==1) {
    //     if (i==0) {
    //     d = Math.sqrt( (cx[0]-cx[1])*(cx[0]-cx[1])+(cy[0]-cy[1])*(cy[0]-cy[1]) );
    //     calvaluesqr=Math.pow(calvalue/d,2);
    //     console.log('calvalue: '+calvalue);
    //     console.log('calvaluesqr: '+calvaluesqr);
    //     console.log('d(stop): '+d);

    //     x1_temp=x1;
    //     x2_temp=x2;
    //     y1_temp=y1;
    //     y2_temp=y2;
    //     x1=undefined;
    //     x2=undefined;
    //     y1=undefined;
    //     y2=undefined;
    //     }

    //   }

    // Get the exact mouse position
    // ===============================
    // function getPosition(el) {
    //   var xPosition = 0;
    //   var yPosition = 0;
     
    //   while (el) {
    //     xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    //     yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    //     el = el.offsetParent;
    //   }
    //   return {
    //     x: xPosition,
    //     y: yPosition
    //   };
    // }  

    // Set mouse position
    // ====================
    // var canvasPos = getPosition(canvasline);
    var mouseX = 0;
    var mouseY = 0;
     
    canvasline.addEventListener("mousemove", setMousePosition, false);
     
    function setMousePosition(e) {
      // mouseX = e.clientX - canvasPos.x;
      // mouseY = e.clientY - canvasPos.y;
      mouseX = e.offsetX;
      mouseY = e.offsetY;

      var canvasline = document.getElementById('canvasline');
      var contextline = canvasline.getContext('2d');
      contextline.clearRect(0, 0, canvasline.width, canvasline.height);

      contextline.beginPath();

      if (i%2==0){
        contextline.moveTo(x2-xdeduct,y2-ydeduct);  
      }

      if (i%2==1){
        contextline.moveTo(x1-xdeduct,y1-ydeduct);  
      }

      // if (i>2) {
      if (false) {  
        x1_temp=x1;
        x2_temp=x2;
        y1_temp=y1;
        y2_temp=y2;
        x1=undefined;
        x2=undefined;
        y1=undefined;
        y2=undefined;
      }
      
  

      contextline.lineTo(mouseX,mouseY);
      contextline.strokeStyle=color;
      contextline.stroke();
      contextline.closePath();

    }



    $("#canvasline").click(function(){

        if (i%2==0) {
            cx[i] = event.clientX;
            cy[i] = event.clientY;
            px[i] = event.pageX;
            py[i] = event.pageY;
            x1 = event.pageX;
            y1 = event.pageY;
            xdeduct=x1-event.offsetX;
            ydeduct=y1-event.offsetY;

            var coords = "X1 : " + x1 + ", Y1 : " + y1;
            drawing(color);
            // document.getElementById("x1").innerHTML = coords;
        }

        if (i%2==1) {
            cx[i] = event.clientX;
            cy[i] = event.clientY;
            px[i] = event.pageX;
            py[i] = event.pageY;
            x2 = event.pageX;
            y2 = event.pageY;
            var coords = "X2 : " + x2 + ", Y2 : " + y2;
            drawing(color);
            // document.getElementById("x2").innerHTML = coords;
        }

      // console.log('i: '+i);
      switch (true)
        {
            case true :
                i++; break;
        }

    });


    function drawing (color){

      var canvas = document.getElementById('canvas');
      var context2 = canvas.getContext('2d');

      context2.beginPath();

      context2.moveTo(x1-xdeduct,y1-ydeduct);
      context2.lineTo(x2-xdeduct,y2-ydeduct);
      context2.strokeStyle=color;
      context2.stroke();
      context2.closePath();

      // this function is called during Undo action
      cPush();

    }


    $("canvas").dblclick(function(){
      
      // This part commented to keep valeus in these variable to draw area
      // cx=[];
      // cy=[];
      // px=[];
      // py=[];
      // cx2=undefined;
      // cy2=undefined;

      x1=undefined;
      y1=undefined;
      x2=undefined;
      y2=undefined;
      i=0;

      // cPushArray.pop();

      // cPush();

    });


    // Calculate area
    // ==================

        // Polygon drawing
    $("#poly").click(function(){

      if (calvaluesqr===undefined) {
          alert("Please calibrate first");    
        }

      // alert('i: '+i);

      // for (var k = 0; k < i; k++) {
        
        // var xPts = [4,  4,  8,  8, -4,-4];
        // var yPts = [6, -4, -4, -8, -8, 6];

        // Double click makes last coordinate two times. So pop() is used to remove last array element
        cx.pop();
        cy.pop();

        // area[index] = Math.sqrt(polygonArea(cx, cy, cx.length)*calvaluesqr);
        area[index] = polygonArea(cx, cy, cx.length)*calvaluesqr;
        area[index]=Math.abs(area[index]);
        console.log('area= '+area[index]);
        // console.log('cx-0= '+cx[0]);
        // console.log('cx-1= '+cx[1]);
        // console.log('cx-2= '+cx[2]);
        // console.log('cx-3= '+cx[3]);
        // console.log('cx-4= '+cx[4]);
        // console.log('cx-5= '+cx[5]);


        // var d1 = Math.sqrt( (cx[0]-cx[1])*(cx[0]-cx[1])+(cy[0]-cy[1])*(cy[0]-cy[1]) );
        // var d2 = Math.sqrt( (cx[1]-cx[2])*(cx[1]-cx[2])+(cy[1]-cy[2])*(cy[1]-cy[2]) );
        // console.log('d1: '+d1);
        // console.log('d2: '+d2);
        // area[index]= d1*d2*calvaluesqr;
        // console.log('area: '+area[index]);

        var x=Math.min(px[0], px[2]); //finding x coordinate of rectangle
        var y=Math.min(py[0], py[2]); //finding y coordinate of rectangle
        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(px[0]-xdeduct, py[0]-ydeduct);

        for (var m = 1; m < px.length-1; m++) {
          
          ctx.lineTo(px[m]-xdeduct, py[m]-ydeduct);

        }

        // ctx.lineTo(px[1]-xdeduct, py[1]-ydeduct);
        // ctx.lineTo(px[2]-xdeduct, py[2]-ydeduct);
        // ctx.lineTo(px[0]+(px[2]-px[1])-xdeduct, py[2]-(py[1]-py[0])-ydeduct);
        ctx.fill(); // connect and fill
        var areafixed=Math.floor(area[index] * 100) / 100;
        // console.log('areafixed='+areafixed);
        // console.log("area[index]  = " + area[index]);
        ctx.fillStyle="#000";
        ctx.fillText(areafixed, px[0]-xdeduct, py[0]-ydeduct); 
        var block='Polygon';
        tableofmeasurement(index, areafixed, block);
        // console.log('x: '+x);
        // console.log('ydeduct: '+xdeduct);
        // console.log('y: '+y);
        // console.log('ydeduct: '+ydeduct);
     
        cPush();
        
        // To record cStep (cStepFinalFromcPush=cStep) value 
        //as soon as area (poly, square, triangle, arc) drawing button is clicked
        cStepAtArea[index]=cStepFinalFromcPush;
        console.log('index: '+index+'cStepAtArea[index]: '+cStepAtArea[index]);



        index++;
       // Reset variables
       // ================
      cx=[];
      cy=[];
      px=[];
      py=[];
      cx2=undefined;
      cy2=undefined;

      x1=undefined;
      y1=undefined;
      x2=undefined;
      y2=undefined;
      i=0; 


      function polygonArea(X, Y, numPoints) { 
        var area = 0;         // Accumulates area in the loop
        b = numPoints-1;  // The last vertex is the 'previous' one to the first

        for (a=0; a<numPoints; a++)
          { area = area +  (X[b]+X[a]) * (Y[b]-Y[a]); 
            b = a;  //b is previous vertex to a
          }
          console.log('area-poly='+area/2);
        return area/2;
      }

    });
    // Polygon drawing



    //Square and Rectangle
    $("#square").click(function(){
      
      if (calvaluesqr===undefined) {
          alert("Please calibrate first");    
        }

        var d1 = Math.sqrt( (cx[0]-cx[1])*(cx[0]-cx[1])+(cy[0]-cy[1])*(cy[0]-cy[1]) );
        var d2 = Math.sqrt( (cx[1]-cx[2])*(cx[1]-cx[2])+(cy[1]-cy[2])*(cy[1]-cy[2]) );
        console.log('d1: '+d1);
        console.log('d2: '+d2);
        area[index]= d1*d2*calvaluesqr;
        console.log('area: '+area[index]);

        var x=Math.min(px[0], px[2]); //finding x coordinate of rectangle
        var y=Math.min(py[0], py[2]); //finding y coordinate of rectangle
        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");
        
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(px[0]-xdeduct, py[0]-ydeduct);
        ctx.lineTo(px[1]-xdeduct, py[1]-ydeduct);
        ctx.lineTo(px[2]-xdeduct, py[2]-ydeduct);
        ctx.lineTo(px[0]+(px[2]-px[1])-xdeduct, py[2]-(py[1]-py[0])-ydeduct);
        ctx.fill(); // connect and fill
        // ctx.fillStyle = '#fff';
        // ctx.fillText(area, cx[0]-x1-xdeduct, cy[0]-ydeduct);
        var areafixed=Math.floor(area[index] * 100) / 100;
        ctx.fillStyle="#000";
        ctx.fillText(areafixed, px[0]-xdeduct, py[0]-ydeduct); 
        var block='Rectangle';
        tableofmeasurement(index, areafixed, block);
        // ctx.fillText(area, 70, 70); 
        console.log('x: '+x);
        console.log('ydeduct: '+xdeduct);
        console.log('y: '+y);
        console.log('ydeduct: '+ydeduct);
        
        cPush();
        
        // To record cStep (cStepFinalFromcPush=cStep) value 
        //as soon as area (poly, square, triangle, arc) drawing button is clicked
        cStepAtArea[index]=cStepFinalFromcPush;
        console.log('index: '+index+'cStepAtArea[index]: '+cStepAtArea[index]);

        index++;
       // Reset variables
       // ================
      cx=[];
      cy=[];
      px=[];
      py=[];
      cx2=undefined;
      cy2=undefined;

      x1=undefined;
      y1=undefined;
      x2=undefined;
      y2=undefined;
      i=0; 


    });


    //Triangle
    $("#triangle").click(function(){
        if (calvaluesqr===undefined) {
          alert("Please calibrate first");    
        }

        var d1 = Math.sqrt( (cx[0]-cx[1])*(cx[0]-cx[1])+(cy[0]-cy[1])*(cy[0]-cy[1]) );
        var d2 = Math.sqrt( (cx[1]-cx[2])*(cx[1]-cx[2])+(cy[1]-cy[2])*(cy[1]-cy[2]) );
        var d3 = Math.sqrt( (cx[2]-cx[0])*(cx[2]-cx[0])+(cy[2]-cy[0])*(cy[2]-cy[0]) );

        console.log('d1: '+d1);
        console.log('d2: '+d2);
        console.log('d3: '+d3);

        var x=Math.min(px[0], px[2]);
        var y=Math.min(py[0], py[2]);

        base=Math.min(d1, d2, d3);

        if(base==d1){

        height=Math.min(d2, d3);
        
        }

        if(base==d2){

        height=Math.min(d1, d3);
        
        }

        if(base==d3){

        height=Math.min(d1, d2);
        
        }
        area[index]= (1/2)*base*height*calvaluesqr;
        console.log('base: '+base);  
        console.log('height: '+height);
        console.log('calvaluesqr: '+calvaluesqr);
        console.log('Triangle area: '+area[index]);

        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");
        
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(px[0]-xdeduct, py[0]-ydeduct); // start at top left corner of canvas
        ctx.lineTo(px[1]-xdeduct, py[1]-ydeduct); // go 200px to right (x), straight line from 0 to 0
        ctx.lineTo(px[2]-xdeduct, py[2]-ydeduct); // go to horizontal 100 (x) and vertical 200 (y)
        ctx.fill(); // connect and fill

        var areafixed=Math.floor(area[index] * 100) / 100;
        ctx.fillStyle="#000";
        ctx.fillText(areafixed, px[0]-xdeduct, py[0]-ydeduct); 
        var block='Triangle';
        tableofmeasurement(index, areafixed, block);
        

        cPush();
        
        // To record cStep (cStepFinalFromcPush=cStep) value 
        //as soon as area (poly, square, triangle, arc) drawing button is clicked
        cStepAtArea[index]=cStepFinalFromcPush;
        console.log('index: '+index+'cStepAtArea[index]: '+cStepAtArea[index]);

        index++;
       // Reset variables
       // ================
      cx=[];
      cy=[];
      px=[];
      py=[];
      cx2=undefined;
      cy2=undefined;

      x1=undefined;
      y1=undefined;
      x2=undefined;
      y2=undefined;
      i=0; 


    });

    //Arc drawing
    // =================
    $("#arc").click(function(){

        if (calvaluesqr===undefined) {
          alert("Please calibrate first");
          
        }

        var d1 = Math.sqrt( (cx[0]-cx[1])*(cx[0]-cx[1])+(cy[0]-cy[1])*(cy[0]-cy[1]) );
        var d2 = Math.sqrt( (cx[1]-cx[2])*(cx[1]-cx[2])+(cy[1]-cy[2])*(cy[1]-cy[2]) );
        // var d3 = Math.sqrt( (cx[2]-cx[0])*(cx[2]-cx[0])+(cy[2]-cy[0])*(cy[2]-cy[0]) );

        console.log('d1: '+d1);


        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");
        
        ctx.beginPath();
        ctx.fillStyle = color;

        height=Math.min(d1, d2);

        // var angle1=Math.abs(Math.atan2(py[1]-py[0], px[1]-px[0]));
        // var angle2=Math.abs(Math.atan2(py[2]-py[1], px[2]-px[1]));
        var angle1=Math.atan2(py[1]-py[0], px[1]-px[0]);
        var angle2=Math.atan2(py[2]-py[1], px[2]-px[1]);
        console.log('angle2-original: '+(angle2 * 180 / Math.PI));
        if ((py[2]-py[1])<0){
          angle2=angle2+2*Math.PI;
        }

        var angleDeg1 = angle1 * 180 / Math.PI;
        var angleDeg2 = angle2 * 180 / Math.PI;

        var theta=Math.abs(angle1-angle2);  //angle in radian
        area[index]= (theta/2)*d1*d1*calvaluesqr;

        console.log('angle1-deg: '+angleDeg1);
        console.log('angle2-deg: '+angleDeg2);
        console.log('area: '+area[index]);

        ctx.moveTo(px[1]-xdeduct, py[1]-ydeduct); //to fill upto center
        
        var minAngle=Math.min(angle1, angle2);

        if(minAngle==angle1)
          ctx.arc(px[1]-xdeduct,py[1]-ydeduct,d1,angle1+Math.PI,angle2, true);
        else
          ctx.arc(px[1]-xdeduct,py[1]-ydeduct,d1,angle2,angle1+Math.PI, true);

        ctx.fill(); // connect and fill
        
        var areafixed=Math.floor(area[index] * 100) / 100;
        ctx.fillStyle="#000";
        ctx.fillText(areafixed, px[0]-xdeduct, py[0]-ydeduct); 
        var block='Arc';
        tableofmeasurement(index, areafixed, block);
        
        cPush();
        
        // To record cStep (cStepFinalFromcPush=cStep) value 
        //as soon as area (poly, square, triangle, arc) drawing button is clicked
        cStepAtArea[index]=cStepFinalFromcPush;
        console.log('index: '+index+'cStepAtArea[index]: '+cStepAtArea[index]);
        
        index++;
       // Reset variables
       // ================
      cx=[];
      cy=[];
      px=[];
      py=[];
      cx2=undefined;
      cy2=undefined;

      x1=undefined;
      y1=undefined;
      x2=undefined;
      y2=undefined;
      i=0; 


    });

    // Line drawing
    $("#line").click(function(){
      
      if (calvaluesqr===undefined) {
          alert("Please calibrate first");    
        }

        var d1 = Math.sqrt( (cx[0]-cx[1])*(cx[0]-cx[1])+(cy[0]-cy[1])*(cy[0]-cy[1]) );
        // var d2 = Math.sqrt( (cx[1]-cx[2])*(cx[1]-cx[2])+(cy[1]-cy[2])*(cy[1]-cy[2]) );
        console.log('d1: '+d1);
        // console.log('d2: '+d2);
        // area[index]= d1*d2*calvaluesqr;
        line=d1*calvalue;
        // console.log('area: '+area[index]);

        // var x=Math.min(px[0], px[2]); //finding 3rd x coordinate of rectangle
        // var y=Math.min(py[0], py[2]); //finding 3rd y coordinate of rectangle
        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");
        
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(px[0]-xdeduct, py[0]-ydeduct);
        ctx.lineTo(px[1]-xdeduct, py[1]-ydeduct);
        // ctx.lineTo(px[2]-xdeduct, py[2]-ydeduct);
        // ctx.lineTo(px[0]+(px[2]-px[1])-xdeduct, py[2]-(py[1]-py[0])-ydeduct);
        ctx.fill(); // connect and fill
        // ctx.fillStyle = '#fff';
        // ctx.fillText(area, cx[0]-x1-xdeduct, cy[0]-ydeduct);
        // var areafixed=Math.floor(area[index] * 100) / 100;



        var linefixed=Math.floor(line * 100) / 100;
        // ctx.fillText(linefixed, px[0]-xdeduct, py[0]-ydeduct); 
        ctx.fillText(linefixed, Math.min(px[0],px[1])-xdeduct+Math.abs(px[0]-px[1])/2, Math.min(py[0],py[1])-ydeduct+Math.abs(py[0]-py[1])/2); 
        // var block='Rectangle';
        // tableofmeasurement(index, areafixed, block);
        // ctx.fillText(area, 70, 70); 
        // console.log('x: '+x);
        // console.log('ydeduct: '+xdeduct);
        // console.log('y: '+y);
        // console.log('ydeduct: '+ydeduct);
        
        cPush();
        
        // To record cStep (cStepFinalFromcPush=cStep) value 
        //as soon as area (poly, square, triangle, arc) drawing button is clicked
        cStepAtArea[index]=cStepFinalFromcPush;
        console.log('index: '+index+'cStepAtArea[index]: '+cStepAtArea[index]);

        // index++;
       // Reset variables
       // ================
      cx=[];
      cy=[];
      px=[];
      py=[];
      cx2=undefined;
      cy2=undefined;

      x1=undefined;
      y1=undefined;
      x2=undefined;
      y2=undefined;
      i=0; 


    }); // Line drawing


    $("#redraw").click(function(){

      cx=[];
      cy=[];
      px=[];
      py=[];
      cx2=undefined;
      cy2=undefined;

      x1=undefined;
      y1=undefined;
      x2=undefined;
      y2=undefined;
      i=0; 

    });

//  How it is done ?
// To implement undo/redo feature for the canvas I decided to store a snapshot from the canvas (using the canvas’s toDataURL method) to an array "cPushArray", so each time the user draw or add something to the canvas the function cPush is called.
// If cPush is called and the current position is not the last one, the array will be resized and all the following records will be deleted 

  var cPushArray = new Array();
  var cStep = -1;
  var ctx;
  ctx = document.getElementById('canvas').getContext("2d");
    
  function cPush() {
      cStep++;
      cStepFinalFromcPush=cStep;
      if (cStep < cPushArray.length) { cPushArray.length = cStep; }
      cPushArray.push(document.getElementById('canvas').toDataURL());
      console.log('cPush:cStep: '+cStep);

  }

// When the user clicks the Undo button, the function cUndo will load and display the previous state using the drawImage method :
  function cUndo() {
      if (cStep > 0) {
        
          
          if(cStep==0){  
            x1=x1_temp;
            y1=y1_temp;
          }
          if(cStep==1){
          console.log('x2');  
            x2=x2_temp;
            y2=y2_temp; 
          }

          if (cStep==cStepFinalFromcPush){
            cStep--;
            cStep--;
          }
          else
          cStep--;

          var canvasPic = new Image();
          canvasPic.src = cPushArray[cStep];
          canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); 

          console.log('Undo:cStep: '+cStep);
          

          // cx[i];
          // cy[i];
          // px[i];
          // py[i];

          // Commented this part to avoid clicking redraw after undo
          // ===========================================================
          // console.log('i: '+i);
          // i--;
          // cx[i]=undefined;
          // cy[i]=undefined;
          // px[i]=undefined;
          // py[i]=undefined;
          }
      }
  }


// When the user clicks the Redo button, the function cRedo will load and display the next available state in the cPushArray using the drawImage method :
function cRedo() {
    if (cStep < cPushArray.length-1) {
      console.log('cRedo');
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

// Draggable Table of Measurement Div
// ========================================

// Write Measurement info on draggable table at right

function tableofmeasurement(index, areafixed, block){
  
  measurement++;
  $("#area").append('<tr id="'+measurement+'"><td>'+(index+1)+'</td><td>'+block+'</td><td>'+areafixed+'</td></tr>');
  console.log(totalArea+':');
  totalArea=totalArea+areafixed;
  totalArea=Math.floor(totalArea * 100) / 100;
  
  $("#totalArea").html(totalArea);
}


// Convert draggable div into dowmloadable PDF

// jsPDF, HTML Element to PDF
var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

$('#dowmload').click(function () {
    doc.fromHTML($('#content').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('Measurement.pdf');
});



// Clear button
// =================
$("#clear").click(function(){
      
          var canvasPic = new Image();
          if (index>=2) {
            canvasPic.src = cPushArray[cStepAtArea[index-2]];
            // alert('if: '+(cStepAtArea[index-2]));
            var cStepDiff=cStep-cStepAtArea[index-2]
            // cStepAtArea[index-1]=cStepAtArea[index-2];
           
            area[index-1]=Math.floor(area[index-1] * 10) / 10;
            totalArea=totalArea-area[index-1];
            totalArea=Math.floor(totalArea * 100) / 100;
           
            $("#totalArea").html(totalArea);
            $("#area tr").last().remove();
            index--;
          }
          else if(index==1){
           canvasPic.src = cPushArray[0];
           // alert('elseif: '+index);
           var cStepDiff=cStep-cStepAtArea[0];

           // area[index-1]=Math.floor(area[index-1] * 10) / 10;
           // totalArea=totalArea-area[index-1];
           // totalArea=Math.floor(totalArea * 100) / 100;
           totalArea=0;
           $("#totalArea").html(totalArea);   
           $("#area tr").last().remove();
           index=0;
           // index--;
          }
            
          canvasPic.onload = function () { 

            ctx.drawImage(canvasPic, 0, 0); 

            console.log('Undo:cStep: '+cStep);
            

            // cx[i];
            // cy[i];
            // px[i];
            // py[i];
            // console.log('i be-for: '+i);
            // for (var z = 0; z < cStepDiff; z++) {
            //   i--;
            //   cx[i]=undefined;
            //   cy[i]=undefined;
            //   px[i]=undefined;
            //   py[i]=undefined;
            // }
            // console.log('i be-for: '+i);
          }

       

});


// Clear all

$("#clearAll").click(function(){
      
          var canvasPic = new Image();

           canvasPic.src = cPushArray[0];
           // alert('elseif: '+index);
           var cStepDiff=cStep-cStepAtArea[0];

           console.log('cStep: '+cStep);
           console.log('cStepAtArea[0]: '+cStepAtArea[0]);
           console.log('cStepDiff: '+cStepDiff);
           // area[index-1]=Math.floor(area[index-1] * 10) / 10;
           // totalArea=totalArea-area[index-1];
           // totalArea=Math.floor(totalArea * 100) / 100;
           totalArea=0;
           $("#totalArea").html(totalArea);   
           // $("#area tr").last().remove();
           index=0;
          
          canvasPic.onload = function () { 

            ctx.drawImage(canvasPic, 0, 0); 

            console.log('Undo:cStep: '+cStep);
            

            // cx[i];
            // cy[i];
            // px[i];
            // py[i];

            // console.log('i be-for: '+i);
            // for (var z = 0; z < cStepDiff; z++) {
            //   i--;
            //   cx[i]=undefined;
            //   cy[i]=undefined;
            //   px[i]=undefined;
            //   py[i]=undefined;
            // }
            console.log('measurement : '+measurement);

            var measurementCount=measurement;

            for (var z = 0; z < measurementCount; z++) {
                
                // $("#area").append('<tr><td>'+(index+1)+'</td><td>'+block+'</td><td>'+areafixed+'</td></tr>');
                $("#"+measurement+"").remove();
                measurement--;
            console.log('inside');

            }
                
              $("#totalArea").html('');

          }

       

});