<!DOCTYPE html>
<html lang="en" dir="ltr" xmlns:fb="http://ogp.me/ns/fb#">
<head>
    <style>
        
        @-webkit-keyframes wind{
    0%{ -webkit-transform: rotateZ(5deg);}
    50%{ -webkit-transform: rotateZ(-5deg);}
    100%{ -webkit-transform: rotateZ(5deg);}
}

@-webkit-keyframes wind2{
    0%{ margin-left:64%;margin-top:-20%;-webkit-transform: rotateZ(5deg);}
    50%{ margin-left:69%;margin-top:-23%;-webkit-transform: rotateZ(-5deg);}
    100%{ margin-left:64%;margin-top:-20%;-webkit-transform: rotateZ(5deg);}
}


@-webkit-keyframes sea{
    0%{ margin-left:-1%;}
    50%{ margin-left:0%;}
    100%{ margin-left:-1%;}
}

@-webkit-keyframes expandsquare{
    100%{margin-left:-30%;margin-top:-24%;width:100%;height:100%;}
}

@-webkit-keyframes expandsquare2{
    100%{margin-left:-30%;margin-top:-35%;width:100%;height:100%;}
}


body{
    position: absolute;
    width: 100%;
    height:100%;
    font-size:100%;
    font-family:verdana;
    left:0%;
    top:0%;
    margin: 0%;
    overflow-x:hidden;
}

.papercontainer{
    position: relative;
    width:97%;
    margin:0%
    padding:1%;
}

.playerintro{
    margin-left:5%;
    margin-top: 1%;
    border:1px dotted yellow;
    width:90%;
    background-image: url('images/bg1.png');
    background-size:100%;
    overflow:hidden;
    padding: 0%;
}


div#cloud1{
    width:20%;
    margin-left:4%;
    margin-top:-2%;
    -webkit-animation: wind 4s ease-out infinite;
}

div#cloud1 img{
    width:100%;
}

div#sea{
    float:left;
    width:130%;
    margin-left:0%;
    background-image: url('images/w1.png');
    background-size: 60%;
    background-repeat: repeat-x;
    -webkit-animation: sea 2s ease-out infinite;
}

div#sea img{
    width:100%;
}

div#cloud2{
    float:left;
    width:20%;
    margin-top:-20%;
    margin-left:54%;
    -webkit-animation: wind2 3.5s ease-out infinite;
}

div#cloud2 img{
    width:110%;
}

div#manitlogo{
   width:20%;
   margin-left:42%;
   margin-top:-10%;
   z-index:100;
}
.buttcont{
    width:40%;
    margin-left:27%;
    margin-top:-7.7%;
    margin-bottom: 1%;
}
div#manitlogo img{
    width:50%;
}

.button{
    position: relative;
    width:80%;
    padding:1.5% 0%;
    color:#F06292;
    border:2px solid white;
    box-shadow: inset 0px 0px 10px 1px pink;
    text-align:center;
    line-height: 150%;
    font-family: cursive;
    font-size:1.3em;
    cursor:pointer;
    background: white;
    margin:5% 0% 15% 8%
}

div#play{
    margin-bottom: 10%;
}

.button:hover{
    -webkit-animation: colorfade 0.4s ease-out forwards 1;
}

.picasso{
    margin-left:5%;
    margin-top: 1%;
    border:1px dotted yellow;
    cursor: pointer;
}

.animdiv{
    position:absolute;
    z-index:10;
    width:29%;
    display: block;
    background:white;
    height:8.4%;
    border:1px solid white;
    box-shadow: none;
    
}


div#share{
    
}


div#animdiv1{ display:none;margin:-8.9% 10% 0% 2.7% ; -webkit-animation: expandsquare 1s ease-in-out forwards 1;}
div#animdiv2{ display:none;margin:-7% 10% 0% 4.5% ; -webkit-animation: expandsquare2 1s ease-in-out forwards 1;}
        
    </style>
      <title>Lost In Migration</title>
   <meta http-equiv="Cache-control" content="no-cache">
    <!-- facebook open graph tags-->
     <meta property="og:title" content="Lost In Migration" />
    <meta property="og:url" content="https://apps.facebook.com/lost_in_migration/" />
    <meta property="og:description" content="happiness is living the present moment ,this game checks your presence of mind and helps improve your attention levels. Beware of the illusions the birds create.
                                             
                                             (: Made with &#9829; in MANIT:)" />
    <meta property="og:image" content="http://www.ieeenitb.org/facebook/images/game.png" />
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

</head>
<body>
    <div id="fb-root"></div>
    
            <script>
                
                window.fbAsyncInit = function() {
                        FB.init({
                          appId      : '1602764393271696',
                          xfbml      : true,
                          status     : true,    
                          version    : 'v2.2',
                          frictionlessRequests : true    
                        });

                        FB.Event.subscribe('auth.authResponseChange',onAuthResponseChange);
                        FB.Event.subscribe('auth.statusChange', onStatusChange);
                        // ADD ADDITIONAL FACEBOOK CODE HERE
                      };
                
                (function(d, s, id){
                     var js, fjs = d.getElementsByTagName(s)[0];
                     if (d.getElementById(id)) {return;}
                     js = d.createElement(s); js.id = id;
                     js.src = "//connect.facebook.net/en_US/sdk.js";
                     fjs.parentNode.insertBefore(js, fjs);
                   }(document, 'script', 'facebook-jssdk'));
                
            </script>
    <script type="text/javascript" src="js/fb.js"></script>
      <canvas id='loader' style='display:none;' width="950" height="500" class="picasso"></canvas>
      <div class='papercontainer'>
          <div id='fb-root'></div>
          <div id='playerintro' style='display:none;' height="500" class="playerintro">
              <div id='cloud1'><img src='images/cloud2.png'></div>
              <div id='cloud2'><img src='images/cloud1.png'></div>
                            
              <div id='manitlogo' style='width:25%;'><img style='opacity:0;' src="images/emptylogo.png"/></div>
              <div class="buttcont">
                  <div class="button"  id='demo' onclick="demo();" >demo</div>
                  <div id='animdiv1' class="animdiv"></div>
                  <div class="button"  id='play' onclick="showModes();">play</div>
                  <div class="button" style='display:none;' id='time'  onclick="initialiseplay(this.id)">time</div>
                  <div class="button" style='display:none;' id='endurance' onclick="initialiseplay(this.id)">endurance</div>

                  <div id='animdiv2' class="animdiv"></div>
                  
              </div>
              <div id='backarrow' onclick='returnHome()' style='width:10%;display:none;border:!px solid black;cursor:pointer;margin-left:7%;'>
                  <img src="images/backarrow.png">
              </div>

              <div id='sea'><img src='images/w1.png'></div>
          </div>
          <canvas id='picasso' width="950" height="500" class="picasso" style='display:none'></canvas>
        
      </div>
      <div id='fblove' style="width:84%;
    padding:1%;
    font-family: SEGOE UI;
    text-align: center;
    margin-left:5%;
    margin-top:2%;
    border:1px dotted lightblue;">Show some <span style='color:red'>&#9829;</span>&nbsp&nbsp
          <span  class="fb-share-button" data-href="http://ieeenitb.org/facebook" data-layout="button" style='margin-left:3%;
    margin-right:5%;'></span>
&nbsp or 
              <span id='fbinvite' onclick="inviteFriends()" style="    margin-left:5%;
    color:red;
    cursor:pointer;
    padding:0.2%;
    font-size:0.9em;
    border-radius:2px;
    border: 1px solid red;
">Invite Friends</span>
          </div>
    
    <script type="text/javascript" src="js/core.js"></script>
    <script type="text/javascript" src="js/draw.js"></script>
    <script type="text/javascript" src="js/repaint.js"></script> 
    
</body>
</html>