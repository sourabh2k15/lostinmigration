function initialiseLoader(){
    var context = getCanvasContext('loader');
    context.fillStyle='#84FFFF';
    context.fillRect(0,0,width,height);
    drawImage('manitlogo',width/2-((width/10)*1.3)/2,height/2-((height/5)*1.2)/2,(width/10)*1.3,(height/5)*1.2,context);
    context.fillStyle='#EEFF41';      
}

function loadManit(key,context){
    if(key == 10){
        context.fillRect((width/2)*1.042-(((width/10)*1.3)/2),(height/2)*1.18,(width/10)*0.85,(height/5)*0.1);  
        context.fillRect((width/2)*1.041-(((width/10)*1.3)/2),(height/2)*1.13,(width/10)*0.85,(height/5)*0.1);
    }else if(key==20){
        context.fillRect((width/2)*1.032-(((width/10)*1.3)/2),(height/2)*1.089,(width/10)*0.95,(height/5)*0.1);
        context.fillRect((width/2)*1.021-(((width/10)*1.3)/2),(height/2)*1.049,(width/10)*1.06,(height/5)*0.1);
    }else if(key==30){
        context.fillRect((width/2)*1.012-(((width/10)*1.3)/2),(height/2)*1.02,(width/10)*1.16,(height/5)*0.1);
        context.fillRect((width/2)*1.012-(((width/10)*1.3)/2),(height/2)*1,(width/10)*1.16,(height/5)*0.1);
    }else if(key==40){
        context.fillRect((width/2)*1.01-(((width/10)*1.3)/2),(height/2)*0.96,(width/10)*1.16,(height/5)*0.1);
        context.fillRect((width/2)*1.01-(((width/10)*1.3)/2),(height/2)*0.93,(width/10)*1.16,(height/5)*0.1);
    }else if(key==50){
        context.fillRect((width/2)*1.01-(((width/10)*1.3)/2),(height/2)*0.93,(width/10)*1.16,(height/5)*0.1);
        context.fillRect((width/2)*1.016-(((width/10)*1.3)/2),(height/2)*0.9,(width/10)*1.118,(height/5)*0.1);
    }else if(key==60){
        context.fillRect((width/2)*1.025-(((width/10)*1.3)/2),(height/2)*0.87,(width/10)*1.03,(height/5)*0.1);
    context.fillRect((width/2)*1.034-(((width/10)*1.3)/2),(height/2)*0.85,(width/10)*0.93,(height/5)*0.06);
    }else if(key==70){
        context.fillRect((width/2)*1.043-(((width/10)*1.3)/2),(height/2)*0.83,(width/10)*0.84,(height/5)*0.06);
    context.fillRect((width/2)*1.052-(((width/10)*1.3)/2),(height/2)*0.82,(width/10)*0.7,(height/5)*0.04);
    }else if(key==80){
        context.fillRect((width/2)*1.062-(((width/10)*1.3)/2),(height/2)*0.813,(width/10)*0.69,(height/5)*0.04);
    context.fillRect((width/2)*1.069-(((width/10)*1.3)/2),(height/2)*0.8,(width/10)*0.6,(height/5)*0.04);
    }else if(key==90){
        context.fillRect((width/2)*1.072-(((width/10)*1.3)/2),(height/2)*0.8,(width/10)*0.2,(height/5)*0.02);
        context.fillRect((width/2)*1.075-(((width/10)*1.3)/2),(height/2)*0.792,(width/10)*0.5,(height/5)*0.02);
    }else if(key==100){
        context.fillRect((width/2)*1.09-(((width/10)*1.3)/2),(height/2)*0.787,(width/10)*0.4,(height/5)*0.02);
    }
    
}


// extra code 
//top
if(level == 0 ){
        for(var k = 1 ; k<3;k++){
          drawImage(dir,x+k*1.3*(width/20),y,width/20,width/20,context);
        }
    
        for(var k = 1 ; k<3;k++){
          drawImage(dir,x-k*1.3*(width/20),y,width/20,width/20,context);
        }
    }


//horizontal
if(level==0){
        for(var k = 1 ; k<3;k++){
          drawImage(dir,x,y+k*key*1.3*(width/20),width/20,width/20,context);
        }
        for(var k = -2;k < 0; k++){
         drawImage(dir,x,y-k*1.2*(width/20),width/20,width/20,context);
        }
    }    
    

//bottom

if(level == 0){    
        for(var k = 1 ; k<3;k++){                                                                  //this is to draw the cenral bone /|\
          drawImage(dir,x+k*1.3*(width/20),y,width/20,width/20,context);
        }
    
        for(var k = 1 ; k<3;k++){
          drawImage(dir,x-k*1.3*(width/20),y,width/20,width/20,context);
        }
    }
    
mage.onload = function(){
        imagecount++;
        var context = getCanvasContext('loader');
        loadManit(imagecount*10,context);
        drawImage('manitlogo',width/2-((width/10)*1.3)/2,height/2-((height/5)*1.2)/2,(width/10)*1.3,(height/5)*1.2,context);
    }