function drawSquareFlock(size){
    cDir = dirs[Math.floor(4*Math.random())].toString()+'bird';
    flockDir = generateDistinctDir(cDir);
    
    if(flockDir){
       cBirdX = generateRand((width/10)*1,(width/10)*6-size*(width/20));
       cBirdY = generateRand((height/10)*1,(height/10)*6-size*(width/20));
       
       generateSquare(size,cDir,flockDir,Math.floor(size*Math.random()),Math.floor(size*Math.random()),cBirdX,cBirdY);
    }
    else{
        drawSquareFlock(size);
    }  
}

function drawHLineFlock(size){
    cDir     = dirs[Math.floor(4*Math.random())].toString()+'bird';
    flockDir = generateDistinctDir(cDir);
    
    if(flockDir){
       cBirdX = generateRand((width/10)*2,(width/10)*(6-size*0.5));    
       cBirdY = generateRand((height/10)*2,(height/10)*(7-size*0.5));
       generateRow(size,cDir,flockDir,Math.floor(size*Math.random()),Math.floor(size*Math.random()),cBirdX,cBirdY);
    }
    else{
        drawHLineFlock(size);
    }
    
}

function drawVLineFlock(size){
    cDir     = dirs[Math.floor(4*Math.random())].toString()+'bird';
    flockDir = generateDistinctDir(cDir);
    
    if(flockDir){
       cBirdX = generateRand((width/10)*3,(width/10)*(6));    
       cBirdY = generateRand((height/10)*0.2,(height/10)*(4-size*0.7));
       generateColumn(size,cDir,flockDir,Math.floor(size*Math.random()),Math.floor(size*Math.random()),cBirdX,cBirdY);
    }
    else{
        drawVLineFlock(size);
    }
    
}

function drawBend(sizeX,sizeY){
    cDir     = dirs[Math.floor(4*Math.random())].toString()+'bird';
    flockDir = generateDistinctDir(cDir);
    
    if(flockDir){
       cBirdX = generateRand((width/10)*1,(width/10)*(6));    
       cBirdY = generateRand((height/10)*0.2,(height/10)*5);
       generateColumn(sizeY,cDir,flockDir,-1,-1,cBirdX,cBirdY);
       generateRow(sizeX,cDir,flockDir,Math.floor(sizeX*Math.random()),Math.floor(sizeX*Math.random()),cBirdX,cBirdY);     
    }
    else{
        drawBend(sizeX,sizeY);
    }
}

function generateDistinctDir(a){
    var b = dirs[Math.floor(4*Math.random())].toString()+'bird';
    if(a === b) generateDistinctDir(a);
    else return(b);
}

function generateSquare(size,oddDir,regDir,oddX,oddY,cX,cY){
    for(var i = 0;i< size; i++){        
        for(var j = 0;j < size; j++){
            if(i==oddX&&j==oddY){ 
                drawBird(oddDir,cX+(60*(i+1)),cY+(60*(j+1)),(width/20),(width/20));
                cBirdX = cX+(60*(i+1));cBirdY = cY+(60*(j+1));
            }
            else  drawBird(regDir,cX+(60*(i+1)),cY+(60*(j+1)),(width/20),(width/20));
        }
    }
}

function generateRow(size,oddDir,regDir,oddX,oddY,cX,cY){
    for(var i = 0;i< size; i++){        
            if(i==oddX){ 
                drawBird(oddDir,cX+(60*(i+1)),cY,(width/20),(width/20));
                cBirdX = cX+(60*(i+1));
            }
            else  drawBird(regDir,cX+(60*(i+1)),cY,(width/20),(width/20));
    }
}

function generateColumn(size,oddDir,regDir,oddX,oddY,cX,cY){
    for(var i = 0;i< size; i++){        
            if(i == oddX){
                drawBird(oddDir,cX,cY+(60*(i+1)),(width/20),(width/20));
                cBirdY = cY+(60*(i+1));
            }
            else  drawBird(regDir,cX,cY+(60*(i+1)),(width/20),(width/20));
    }
}

function drawBird(dir,x,y,dX,dY){
    var img = resources[dir];
    picasso.drawImage(img,x,y,dX,dY);
}

function drawCentralBird(){
     cBirdX = generateRand((width/10)*1.4,(width/10)*6);
     cBirdY = generateRand((height/10)*3,(height/10)*6);
     cDir = dirs[Math.floor(4*Math.random())].toString()+'bird';
     flockDir = generateDistinctDir(cDir);
     
    if(flockDir){
      drawImage(cDir,cBirdX,cBirdY,width/20,width/20,picasso);
      drawFlock(cBirdX,cBirdY,flockDir);
    }
    else drawCentralBird();
}

function drawFlock(x,y,dir){
    var picasso = getCanvasContext('picasso');
    var flockDir = dir.replace('bird','');
    
        if(flockDir=='top'){
           drawTop(dir,x,y,picasso,level);     
        }
        else if(flockDir=='right'||flockDir=='left'){
            drawHorizontal(dir,x,y,picasso,level); 
        }
        else{
            drawBottom(dir,x,y,picasso,level);
        }
    }

function drawTop(dir,x,y,context,level){
        
    // this is for the formation of arrow
        for(var k = 1 ; k<3;k++){
          drawImage(dir,x+k*1.3*(width/20),y,width/20,width/20,context);
        }
    
        for(var k = 1 ; k<3;k++){
          drawImage(dir,x-k*1.3*(width/20),y,width/20,width/20,context);
        }
        
        for(var k = -1;k < 2; k++){
         drawImage(dir,x+k*1.2*(width/20),y-1.3*(width/20),width/20,width/20,context);
        }
        drawImage(dir,x,y-1.3*(width/20)*2,width/20,width/20,context);
        
        for(var k = -1;k < 2; k++){
          if(k!==0)drawImage(dir,x+k*1.2*(width/20),y+1.3*(width/20),width/20,width/20,context);
        }
}
var birdCounter = 0;
var birdArr = [drawCentralBird,drawSquareFlock,drawHLineFlock,drawVLineFlock,drawCentralBird];
var randbird;

function drawBirdsRand(){
    user_name = user_name||'';
    if(birdCounter < 30){
        birdCounter++;
        var func = birdArr[Math.floor(Math.random()*5)];
        randbird = setTimeout(function(){
            if(func==drawCentralBird) func();
            else if(func==drawSquareFlock||func==drawHLineFlock||func==drawVLineFlock){ 
                params=3; 
                func(params);
            }
            drawBirdsRand();
        },100);
    }
    else if(birdCounter==30){
        console.log(birdCounter);
        triggerBirdEnd();
    }
}


function drawHorizontal(dir,x,y,context,level){
    var key = dir=='right'?1:-1;
    
        for(var k = 1 ; k<3 ;k++){
          drawImage(dir,x+k*key*1.3*(width/20),y,width/20,width/20,context);
        }
    
   
        for(var k = -1;k < 2; k++){
         drawImage(dir,x+k*1.2*(width/20),y-1.3*(width/20),width/20,width/20,context);
        }
        
        drawImage(dir,x,y-1.3*(width/20)*2,width/20,width/20,context);
        
        for(var k = -1;k < 2; k++){
          drawImage(dir,x+k*1.2*(width/20),y+1.3*(width/20),width/20,width/20,context);
        }
    
        drawImage(dir,x,y+1.3*2*(width/20),width/20,width/20,context);
}

function drawBottom(dir,x,y,context){
    
        for(var k = 1 ; k<3;k++){                                                                  //this is to draw the cenral bone /|\
          drawImage(dir,x+k*1.3*(width/20),y,width/20,width/20,context);
        }
    
        for(var k = 1 ; k<3;k++){
          drawImage(dir,x-k*1.3*(width/20),y,width/20,width/20,context);
        }
        
        for(var k = -1;k < 2; k++){                                                                // this is for the formation of arrow
          if(k!==0)drawImage(dir,x+k*1.2*(width/20),y-1.3*(width/20),width/20,width/20,context);
        }
        drawImage(dir,x,y+1.3*(width/20)*2,width/20,width/20,context);
        
        for(var k = -1;k < 2; k++){
          drawImage(dir,x+k*1.2*(width/20),y+1.3*(width/20),width/20,width/20,context);
        }
}

function drawImage(dir,x,y,w,h,context){
    
    if(resources.hasOwnProperty(dir)){
        context.drawImage(resources[dir],x,y,w,h);
    }
    else{
        console.log(dir);
        loadImage(dir);
    }
    
            if(dir=='bg1') {   writeScore(); }
            else if(dir=='cloud2'){ 
                if(demokey==1){  drawBackButton(); }  // for the demo view draw the back buttons
                if(playkey==1) drawPauseB();
            }  
    
    
}

function drawKeyBoard(){                        
                                                                  // this will draw the rect backgrounds for W,A,S,D
        drawImage('keyboard',(width/20)*10.5,(width/20)*4.2,(width/10)*2.5,(height/10)*3,picasso);
                                                                           // this is to draw the W,A,S,D
       }

function drawControls(){
        if(demoscreencount==1){
            drawElement('canvasleft',0.4+2,7.5-2);                      //drawElement(imgsrc,dX,dY); for small images only 
            drawElement('canvasbottom',1.05+2,7.5-2);                   // for demo scren it is to the left
            drawElement('canvasright',1.7+2,7.5-2);
            drawElement('canvastop',1.05+2,6.3-2);
        }
        else{
            drawElement('canvasleft',0.4+7,7.5);                      //drawElement(imgsrc,dX,dY); for small images only 
            drawElement('canvasbottom',1.05+7,7.5);                   // for demo scren it is to the right
            drawElement('canvasright',1.7+7,7.5);
            drawElement('canvastop',1.05+7,6.3);
        }
}

function drawElement(imgsrc,dX,dY){
    drawImage(imgsrc,(width/10)*dX,(height/10)*dY,width/20,width/20,picasso);
}

function drawRect(dX,dY){
    picasso.fillRect((width/10)*dX,(height/10)*dY,width/20,width/20);
}

function drawText(txt,dX,dY,font,color){
                 picasso.font = font?font:'1.4em cursive';
                 picasso.fillStyle = color?color:'white';
                 picasso.fillText(txt,(width/10)*dX,(height/10)*dY);
}

function strokeText(txt,dX,dY,font,color){
                 picasso.font = font?font:'2em blackadder ITC';
                 picasso.strokeStyle = color?color:'white';
                 picasso.strokeText(txt,(width/10)*dX,(height/10)*dY);
}

function drawArc(cX,cY,rad,start,stop,color){
    picasso.beginPath();
    picasso.strokeStyle = color;
    picasso.arc(cX,cY,rad,start,stop);
    picasso.closePath();
    picasso.stroke();
}

function fill(ctx,color){
    ctx.fillStyle = color;
    ctx.fill();
}

function strokeLine(sX,sY,eX,eY,color){
        picasso.strokeStyle = color?color:'red';
        picasso.beginPath();
        picasso.moveTo((width/10)*sX,(width/10)*sY);
        picasso.lineTo((width/10)*eX,(width/10)*eY);
        picasso.stroke();
}

function drawExample(){
     cBirdX = (width/10)*3;
     cBirdY = (height/10)*4;
     cDir   = 'rightbird';
     flockDir = 'topbird';
     
     drawImage(cDir,cBirdX,cBirdY,width/20,width/20,picasso);
     drawFlock(cBirdX,cBirdY,flockDir);
    
    setTimeout(function(){
        drawArc(cBirdX+width/40,cBirdY+width/40,width/30,0,360,'red');
        drawBackButton();
        drawControls();
    },200);
    mastercontrol = 0;
}

function drawPausePanel(){
    console.log(khatam);
    if(khatam!==1){
        picasso.globalAlpha = 0.7;
        picasso.fillStyle = 'pink';
        picasso.fillRect(0,0,width,height);
        picasso.globalAlpha = 1;
    }else{
        picasso.globalAlpha = 0.4;
        picasso.fillStyle = '#F44336';
        picasso.fillRect(0,0,width,height);
        picasso.globalAlpha = 1;
    }
    
    picasso.fillStyle = 'white';
    picasso.fillRect((width/10)*3,(width/10),(width/10)*4,(width/10)*2);
    
    if(khatam!==1){
        drawImage('resume',(width/10)*4.8,(width/10)*1.5,width/20,width/20,picasso);
        drawText('resume',4.8,4.5,'1em cursive','#F06292');
    }
    else{
         drawImage('share',(width/10)*4.8,(width/10)*1.5,width/20,width/20,picasso);
         drawText('share',4.8,4.5,'1em cursive','#F06292');
    }
    
    drawImage('replay',(width/10)*3.6,(width/10)*1.5,width/20,width/20,picasso);
    drawImage('close',(width/10)*6,(width/10)*1.5,width/20,width/20,picasso);    
    drawText('replay',3.6,4.5,'1em cursive','#F06292');
    drawText('exit',6.1,4.5,'1em cursive','#F06292');
}


function drawBackButton(){
        drawArc(width/10,width/10,width/30,0,360,'red');
        fill(picasso,'white');
        strokeLine(0.9,1,1,0.9,'red');
        strokeLine(0.9,1,1.2,1,'red');
        strokeLine(0.9,1,1,1.1,'red');
}

function drawFButton(){
        drawArc((width/10)*9,width/10,width/30,0,360,'red');
        fill(picasso,'white');
        strokeLine(9.16,1,9,0.89,'red');
        strokeLine(8.86,1,9.16,1,'red');
        strokeLine(9.16,1,9,1.12,'red');
}

function drawPauseB(){
        drawArc(width/10,width/10,width/30,0,360,'red');
        fill(picasso,'white');
        strokeLine(1-0.1,1.1+0.05,1-0.1,0.7+0.1,'red');
        strokeLine(1.2-0.1,1.1+0.05,1.2-0.1,0.7+0.1,'red');
}

function drawCloseB(){
    drawArc(width/10,width/10,width/30,0,360,'red');
        fill(picasso,'white');
        strokeLine(1.3-0.5+0.05,1.3-0.5+0.01,1.6-0.5+0.05,1.6-0.5+0.01,'red');
        strokeLine(1.3-0.5+0.05,1.3-0.5+0.3+0.01,1.6-0.5+0.05,1.6-0.5-0.3+0.01,'red');

}