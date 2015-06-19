// typekey = 0 normal system paint if paintkey = 0 initialise time params typekey = 1 something is wrong reset everything typekey = 2 userinterrupt
var delay = 2500;
var levelrenderT;
var playkey =0;

function repaint(){
    console.log("->repaint");
    paint(delay);
}

function userInt(){
    userinterrupt = setTimeout(function(){
        demopaint();
    },800);
}

function paint(delay){
           console.log("->paint");
           clearTimeout(userinterrupt);
           setTimeout(function(){levelrenderer(level,delay);},1000);
           drawControls();
}

function demopaint(){
        level = chances;
        justpaint(level);
        if(chances>4){ 
             mastercontrol = 1;
             playActivity();
        }
        chances++; 
}

function justpaint(level){
    mastercontrol = 0;
    console.log("justpaint called!!");
    initialiseCanvas();
    switch(level){
                case 0: drawVLineFlock(5);    break;
                case 1: drawBend(2,3);        break;
                case 2 : drawSquareFlock(2);  break;
                case 3 : drawHLineFlock(4);   break;
                case 4 : drawSquareFlock(4);  break;
                case 5 : drawCentralBird();   break;
                default: break;
    }
    if(playkey==0)drawArc(cBirdX+width/40,cBirdY+width/40,width/30,0,360,'red');
    drawControls();    
}

function levelrenderer(level){
    console.log("level called on "+level);
    
    if(pausekey==1){
      console.log("game is paused!!");    
    }
    else if(playkey==1){
         console.log("game is playing");
        initialiseCanvas();
        mastercontrol = 0;
        userkey = 0;
        justpaint(level);
        timetravelled+=delay;
        
        if(mode === 'time'){
                    if(score == 30) {
                        khatam = 1;
                        varPause();
                        mastercontrol = 1;
                        console.log("level completed in " + timetravelled); 
                        playkey = 0;
                        initialiseCanvas(); 
                        writeScore(); 
                        clearTimeout(levelrenderT);
                        endActivity();
                    }
                    else {
                        if(score >=25)      level = 5;
                        else if(score >=20) level = 4;
                        else if(score >=15) level = 3;
                        else if(score >=10) level = 2;
                        else if(score >=5)  level = 1;
                        else level = 0;
                        setTimeout(function(){ levelrenderT = levelrenderer(level); },delay);
                    }
            if(delay>1300) delay-=5;
        }
        else if(mode==='endurance'){
            if(lives>0){ 
                        if(score>=10) level = Math.floor(Math.random()*6);
                        else if(score >=5) level = 5;
                        else if(score >=4) level = 4;
                        else if(score >=3) level = 3;
                        else if(score >=2) level = 2;
                        else if(score >=1) level = 1;
                        else level = 0;
                        setTimeout(function(){ levelrenderT = levelrenderer(level); },delay);
            }
            else{
                        khatam = 1;
                        varPause();
                        mastercontrol = 1;
                        console.log("level completed in " + timetravelled); 
                        playkey = 0;
                        initialiseCanvas(); 
                        writeScore(); 
                        clearTimeout(levelrenderT);
                        endActivity();
            } 
        }
        
        if(delay>1300) delay-=(score/10);
        
      }
}

var name = '';

function endActivity(){
    drawBirdsRand();
}

var prize = '';

function triggerBirdEnd(){
        prize = '';
        console.log(timetravelled);
        level = 0;
        drawPausePanel();
            if(mode === 'time'){
                if(timetravelled <= 60000) prize ='gold';
                else if(timetravelled<=75000) prize='silver';
                else if(timetravelled<=90000) prize='bronze';
                
                if(timetravelled < 90000){    
                    drawText('Congratulations '+user_name+' !!',3.5,1,'1.3em cursive','white',picasso);
                    console.log(prize+'cup earned!!');
                    drawText('you earned a '+prize+' cup!!',3,7.5,'1.3em cursive','white',picasso);
                    drawImage(prize+'cup',(width/20)*12,(width/20)*6.5,(width/10),(width/10),picasso);
                    prize+='cup';
                }
                else{
                    drawText('Seems you need to practice more !!',3,7.5,'1.3em cursive','white',picasso);
                }
                
        }
          else if(mode==='endurance'){
                if(score>=40) prize = 'gold'
                else if(score>=30) prize = 'silver'
                else if(score>=15) prize = 'bronze'

                if(score>=15){
                        drawText('Congratulations '+user_name+' !!',3.5,1,'1.3em cursive','white',picasso);
                        console.log(prize +" badge earned :) ");
                        drawText('you earned a '+prize+' badge!!',3,7.5,'1.3em cursive','white',picasso);
                        drawImage(prize+'badge',(width/20)*12,(width/20)*7,(width/20),(width/15),picasso);
                        prize+='badge';
                }
                else{
                        drawText('Seems you need to practice more !!',3,7.5,'1.3em cursive','white',picasso);
                }
               
            }
}