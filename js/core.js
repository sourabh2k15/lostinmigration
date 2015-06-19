    var keycontrol = 0,mastercontrol=0,chances=0,level = 1,score = 0,start,flipflop,mode='time',timetravelled = 0,pausekey = 0,playerscreen=0,lives=3,khatam = 0,
        width = $('#picasso').width(),
        height = $('#picasso').height(),
        picasso = getCanvasContext('picasso'),
        dirs = ['left','top','right','bottom'],
        userkey = 0,
        cBirdX,cBirdY,cDir,flockDir,demokey=0,
        images = [    
                      'correctleftbird','correctrightbird','correcttopbird','correctbottombird',
                      'wrongrightbird','wrongtopbird','wrongbottombird','wrongleftbird','keyboard',
                      'leftbird','rightbird','topbird','bottombird',
                      'canvasbottom','canvasright','canvasleft','canvastop',
                      'bg1','w1','cloud2','cloud3',
                      'goldcup','silvercup','bronzecup','share',
                      'goldbadge','silverbadge','bronzebadge','game','replay','resume','close'
                 ];
    var resources = {};

    var interrupt,control,userinterrupt;  // if someone by mistake presses multiple keys simultaneously 
    var paintcontrol = 0;
    var d;
    var imagecount = 0;

    function loadAllImages(){
       for(var i = imagecount;i<images.length;i++){
          loadImage(images[i]);
       }
    }

    function loadImage(name){
        var mage = new Image();
        mage.src = 'images/'+name+'.png';
        mage.onload = function(){
            imagecount++;
            updateLoader(2.5,(imagecount/images.length)*5);
            setTimeout(function(){ resources[name] = mage;},100);
            if(imagecount==images.length){
                setTimeout(function(){ $('#picasso').fadeOut(); $('#playerintro').fadeIn(500); },700);
            }
        }

    }

    function initialiseLoader(){
        $('#picasso').show();
            clearCanvas();
            picasso.fillStyle = 'white';
            picasso.fillRect(0,0,width,height);
            var imageObj = new Image();
            imageObj.onload = function(){
            picasso.drawImage(imageObj,(width/10)*4.5,(height/10)*3,(width/10)*1.2,(width/10)*1.2);
             }
            imageObj.src='images/manitlogo.png';
            picasso.fillStyle= '#E91E63';
            updateLoader(2.5,0.2);
    }

    function updateLoader(x1,x2){
        picasso.fillRect((width/10)*x1,(height/10)*6,(width/10)*x2,(width/10)*0.05);
    }
var touchlock = 0;
    $(document).ready(function(){
        initialiseLoader();        
        loadAllImages();
        $('#picasso').click(function(evt){
                var rect = _('picasso').getBoundingClientRect();
                var x = evt.clientX - rect.left;
                var y = evt.clientY - rect.top;
                touchlock = 0;
            
            if(demokey==1){                                                             // this is to detect the back button
                attachListener(x,y,(width/10)-(width/30),((width/10)-(width/30)),(width/30)*2,(width/30)*2,backHandler,null);

                if(demoscreencount<2){
                    attachListener(x,y,(width/10)*9-(width/30),((width/10)-(width/30)),(width/30)*2,(width/30)*2,forwardHandler,null);
                }
                else if(demoscreencount==2){
                    attachListener(x,y,(width/10)*(1.05+7),(height/10)*6.3,width/20,width/20,controlkey,'top');      // top key
                    attachListener(x,y,(width/10)*(0.4+7),(height/10)*7.5,width/20,width/20,controlkey,'left');      // left key
                    attachListener(x,y,(width/10)*(1.7+7),(height/10)*7.5,width/20,width/20,controlkey,'right');     // right key
                    attachListener(x,y,(width/10)*(1.05+7),(height/10)*7.5,width/20,width/20,controlkey,'bottom');   // bottom key
                }                               
            }
            else{
                
                if(pausekey==1){
                    
                    attachListener(x,y,(width/10)*3.6,(width/10)*1.5,width/20,width/20,replayMode,null);
                    if(khatam!==1)attachListener(x,y,(width/10)*4.8,(width/10)*1.5,width/20,width/20,buttonPause,null);
                    else  attachListener(x,y,(width/10)*4.8,(width/10)*1.5,width/20,width/20,share,null);
                    attachListener(x,y,(width/10)*6,(width/10)*1.5,width/20,width/20,endGame,null);

                    
                    attachListener(x,y,(width/10)-(width/30),((width/10)-(width/30)),(width/30)*2,(width/30)*2,buttonPause,null);
                }
                else{
                    attachListener(x,y,(width/10)-(width/30),((width/10)-(width/30)),(width/30)*2,(width/30)*2,buttonPause,null);
                }

                if(playkey==1){
                    attachListener(x,y,(width/10)*(1.05+7),(height/10)*6.3,width/20,width/20,controlkey,'top');      // top key                    
                    attachListener(x,y,(width/10)*(0.4+7),(height/10)*7.5,width/20,width/20,controlkey,'left');      // left key
                    attachListener(x,y,(width/10)*(1.7+7),(height/10)*7.5,width/20,width/20,controlkey,'right');     // right key
                    attachListener(x,y,(width/10)*(1.05+7),(height/10)*7.5,width/20,width/20,controlkey,'bottom');   // bottom key
                }
                
            }
            
            
            
        });
        
    });

    function attachListener(x,y,sX,sY,dX,dY,func,params){
               if(touchlock==0){
                   if(x >= sX && x <= sX+dX && y >= dX && y<= sY+dY) {
                       func(params);
                       console.log("key detected at X:"+ x+" and Y:"+y);
                   }
               }
    }

    function share(){
        console.log("user wants to share achievement");
        fbshare(prize);
    }

    function buttonPause(){
        if(pausekey==0){  pause(); }
        else{ 
            console.log("play called");  
            pausekey = 0; 
            playkey = 1; 
            mastercontrol=0;
            clearTimeout(levelrenderT); 
            levelrenderer(level);
        }
    }

    function initialiseplay(mod){
        mode = mod;
        demokey = 0;
        delay = 2000;
        khatam = 0;
        console.log("mode entered "+mode);
        $('#playerintro').fadeOut(1000);
        setTimeout(function(){ $('#picasso').fadeIn();},1000);
        play();    
    }

    function endGame(){
        $('#picasso').fadeOut(1200);
        varPause();
        khatam = 0;
        showModes();
    }
    function replayMode(){
        console.log("replay called!!");
        khatam = 0;
        $('#picasso').fadeOut(400);
        setTimeout(function(){ 
             $('#picasso').show();
             timetravelled = 0;
             lives =3;pausekey = 0;playkey = 1;
             initialiseplay(mode); 
        },450);
        
    }

    function backHandler(){
        if(demoscreencount>=0)demoscreencount--;
        renderview(demoscreencount);
        if(demoscreencount==-1)demoscreencount = 0;
    }

    function forwardHandler(){
        if(demoscreencount<2){
            demoscreencount++;
            renderview(demoscreencount);
            mastercontrol = 1;
        }
    }

    function play(){
        score = 0 ;mastercontrol = 0;keycontrol = 1;level = 0;playkey = 1;pausekey = 0;lives = 3;timetravelled=0;playcounter = 0;
        initialiseCanvas();
        drawVLineFlock(5);
        drawControls();
        drawPauseB();
        if(mode==='time') {
            picasso.globalAlpha = 0.2;
            picasso.fillStyle='#E91E63';
            picasso.fillRect((width/10)*3.5,(width/10)*1.3,(width/10)*4,(width/10)*0.4);
            picasso.globalAlpha = 1;
            drawText('score 30 in the least possible time',4,3,'1.1em cursive','white',picasso);
        }
        else if(mode==='endurance'){  
            picasso.globalAlpha = 0.2;
            picasso.fillStyle='#E91E63';
            picasso.fillRect((width/10)*3.5,(width/10)*1.3,(width/10)*4,(width/10)*0.4);
            picasso.globalAlpha = 1;
            drawText('get 3 birds wrong and u r gone :)',4,3,'1.1em cursive','white',picasso);
        }

    }


    function pause(){
        varPause();
        setTimeout(function(){ drawCloseB(); },300);
        drawPausePanel();        
        
    }

   function varPause(){
       console.log("var pause called");
        clearTimeout(levelrenderT);
        clearTimeout(userinterrupt);
        pausekey = 1;
        mastercontrol = 1;
    }

   function inviteFriends(){
    console.log("invite friends called!!");
    var options = {
        method:'apprequests',
        message:'lost in migration is a wonderful game jst try it out :) !!!'
    }
    
    FB.ui(options,function(response){
        console.log(response);
    });
  }
    
$(document).keydown(function(evt){
        if(keycontrol==1){
          switch(evt.which){
                case 37 : controlkey('left'); break;
                case 38 : controlkey('top');  break;
                case 39 : controlkey('right'); break;
                case 40 : controlkey('bottom');  break;  
                default: break;
          }
            evt.preventDefault();
        }
    });


    function playActivity(){   
        initialiseCanvas();    
        drawText('time to play the real game',4,1,'1.2em cursive','#EC407A');
        setTimeout(function(){
            $('#picasso').fadeOut(1000);
            $('#playerintro').fadeIn(1000);
            $('#animdiv2').hide();
            $('#animdiv1').hide();
         score = 0;
         timetravelled = 0;
         lives = 3;
         demokey = 0;
         level = 0;
         mastercontrol = 1;
         keycontrol = 0;
        },1000);
    }

    
    var hardness = ['easy','medium','hard'];

    function writeScore(){     // writes the score
         drawText('score    '+score,8.4,1,'1em cursive','white');
         if(mode==='time'){ 
             var scoreText = Math.floor(timetravelled/1000)+'.'+(Math.floor(10*(timetravelled/1000)-Math.floor(timetravelled/1000)))+' s';     
             drawText('time    '+scoreText,7,1,'1em cursive','white');}
         else if(mode === 'endurance')
             drawText('lives    '+lives,7,1,'1em cursive','white');
    }


    function generateRand(a,b){
        return Math.floor(a+(b-a)*Math.random());
    }

    function getCanvasContext(el){
        if(_(el).getContext('2d')) return _(el).getContext('2d');
    }

    function _(el){
        return document.getElementById(el);
    }

    var playcounter = 0;

    function controlkey(keypressed){
        console.log(keypressed);

        if(mastercontrol==0){
                 var status = keypressed+'bird'===cDir?'correct':'wrong';
                 if(status == 'correct') score++;
                else { if(mode==='endurance') lives--;console.log(lives);}

             if(demokey==0){
                 if(playcounter==0){ repaint(); playcounter++;} 
                 getCenterBird(status);
             }
             else if(demokey==1){ getCenterBird(status); userInt();}        
             mastercontrol = 1;
        }
    }

    function getCenterBird(key){
        var context = getCanvasContext('picasso');
        drawImage(key+cDir,cBirdX,cBirdY,width/20,width/20,context);
    }

    var demoscreencount = 0;

    function demo(){
        demokey =1;mastercontrol = 1,chances=0;keycontrol=1;mode='demo';
        $('#playerintro').fadeOut(1000);
        $('#animdiv1').show();
        setTimeout(function(){
            $('#picasso').show();
        },1000);
        $('#controls').fadeIn(1500);
        initialiseCanvas();
        renderview(demoscreencount);
    }

    function initialiseCanvas(){
        picasso.fillStyle='white';
        picasso.fillRect(0,0,width,height);                          //drawing the background

        drawImage('bg1',0,0,width,height,picasso);
        drawImage('cloud3',(width/10)*8.7,-50,150,200,picasso);
        drawImage('cloud2',(width/10)*0.3,-50,200,200,picasso);      // drawing the clouds

        drawImage('w1',-10,(height/10)*8,width*2,height/5,picasso);  // drawing the sea
        }

    function clearCanvas(){
        picasso.clearRect(0,0,width,height);
    }

        function renderview(key){
        clearCanvas();
        switch(key){
                case -1: defaultview(); break;
                case 0: zeroview();break;
                case 1: firstview();break;
                case 2: finalview();break;
                default : break;
        }
    }

    function showModes(id){
        $('#playerintro').fadeOut(800);
        $('#animdiv2').show();
        setTimeout(function(){
            $('#demo').hide();
            $('#play').hide();
            $('#time').show();
            $('#backarrow').show();
            $('#endurance').show();
            $('#animdiv2').hide();
            $('#playerintro').fadeIn();
        },700);
    }

    function returnHome(){
        $('#playerintro').fadeOut(800);
        setTimeout(function(){
            $('#demo').show();
            $('#play').show();
            $('#time').hide();
            $('#backarrow').hide();
            $('#endurance').hide();
            $('#playerintro').fadeIn();
        },1000);
    }

    function defaultview(){
        playActivity();
    }

    function zeroview(){
        console.log("zero view rendered");
        initialiseCanvas();
        example();
        drawFButton();
        
        picasso.globalAlpha = 0.1;
            picasso.fillStyle = '#EC407A';
            picasso.fillRect((width/10)*4,(width/10)*2,(width/10)*5,(width/10)*2);
            picasso.globalAlpha = 1;
        
        strokeLine(3+1,1.9,7,1.9,'#EC407A');
        drawText('Story',4,3,null,'#EC407A');

        drawText('one  bird  in each flock is lost  migrating in a ',3+1.3,5.5-1,'1.1em cursive','white');
        drawText('different  direction your task is to spot  them',3+1.3,6.3-1,'1.1em cursive','white');
        drawText('be alert !! the birds migrate real quick ',3+1.3,7.7-1,'1.1em cursive','white');
    }

    function firstview(){
        mastercontrol = 1;
        initialiseCanvas();
        console.log("first view rendered");
        drawFButton();
        drawText('Controls',4.5,2.5,null,'white');
        strokeLine(3,1.5,7,1.5,'#EC407A');
        drawControls();
        drawKeyBoard();
        
        picasso.globalAlpha = 0.1;
            picasso.fillStyle = '#EC407A';
            picasso.fillRect((width/10)*2.8,(width/10)*1.8,(width/10)*1,(width/10)*0.4);
            picasso.fillRect((width/10)*5.8,(width/10)*1.8,(width/10)*1.2,(width/10)*0.4);

            picasso.globalAlpha = 1;
        
        drawText('touch',3,3.9,'1.1em cursive','white');
        drawText('keyboard',5.9,3.9,'1.1em cursive','white');
        drawText('Use  the on screen arrows or the keyboard arrowkeys',2.5,7.5,'1.2em cursive','white');    
    }

    function example(){
         cBirdX = (width/10)*2;
         cBirdY = (height/10)*4.7;
         level=1;
         cDir   = 'topbird';
         flockDir = 'leftbird';
         drawImage(cDir,cBirdX,cBirdY,width/20,width/20,picasso);
         drawFlock(cBirdX,cBirdY,flockDir);
         level = 0 ;
    }

    function finalview(){
        setTimeout(function(){ mastercontrol = 0 ;},500);
        playkey = 0;
        initialiseCanvas();
        drawText('you get 5 attempts!',4.5,2.5,'1.2em cursive','white');
        drawExample();
        console.log("final view rendered");
    }

    function timeout(func,time){
        setTimeout(function(){ func();},time);
    }